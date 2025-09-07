const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// TODO: Set these values with your actual credentials
const stripe = Stripe(""); // <-- Use your Stripe secret key

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "GuardianANGEL",
  password: "Asom*01postgres",
  port: 5432,
});

// Create orders/payments/order_items table if it doesn't exist
async function createOrdersTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        payment_intent_id VARCHAR(255) UNIQUE,
        total_amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        shipping_address JSONB,
        order_status VARCHAR(50) DEFAULT 'paid'
      )
    `);
    console.log("Orders table created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'zar',
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Payments table created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);
    console.log("Order items table created or already exists.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createOrdersTable();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    res.json({
      success: true,
      message: "Database connection successful",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }
});

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, customerEmail } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Stripe expects amount in cents
      currency: "zar",
      receipt_email: customerEmail,
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/save-order", async (req, res) => {
  console.log("Received order save request:", req.body);
  const {
    customerName,
    customerEmail,
    paymentIntentId,
    cart,
    total,
    shippingAddress,
    paymentStatus = "succeeded",
  } = req.body;

  try {
    // Start a transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insert order
      const orderQuery = `
        INSERT INTO orders (customer_name, customer_email, payment_intent_id, total_amount, shipping_address, order_status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const orderValues = [
        customerName,
        customerEmail,
        paymentIntentId,
        total,
        shippingAddress ? JSON.stringify(shippingAddress) : address,
        "paid",
      ];
      const orderResult = await client.query(orderQuery, orderValues);
      const orderId = orderResult.rows[0].id;
      console.log("Order saved with ID:", orderId);

      // Insert payment
      const paymentQuery = `
        INSERT INTO payments (order_id, payment_intent_id, amount, currency, status)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const paymentValues = [
        orderId,
        paymentIntentId,
        total,
        "zar",
        paymentStatus,
      ];
      await client.query(paymentQuery, paymentValues);
      console.log("Payment saved for order ID:", orderId);

      // Insert order items
      for (const item of cart) {
        const itemQuery = `
          INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const itemValues = [
          orderId,
          item.id,
          item.name,
          item.quantity,
          item.price,
        ];
        await client.query(itemQuery, itemValues);
      }

      await client.query("COMMIT");
      res.json({ success: true, orderId, paymentId: paymentIntentId });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Endpoint to get payment history
app.get("/api/payment-history/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const query = `
      SELECT 
        o.id as order_id,
        o.customer_name,
        o.customer_email,
        o.total_amount,
        o.order_status,
        o.created_at,
        o.shipping_address,
        p.payment_intent_id,
        p.amount as payment_amount,
        p.status as payment_status,
        p.created_at as payment_date,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items
      FROM orders o
      JOIN payments p ON o.id = p.order_id
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.customer_email = $1
      GROUP BY o.id, p.id
      ORDER BY o.created_at DESC
    `;

    const result = await pool.query(query, [email]);
    res.json({ payments: result.rows });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

// Get all orders (for admin purposes)
app.get("/api/orders", async (req, res) => {
  try {
    const query = `
      SELECT 
        o.*,
        p.payment_intent_id,
        p.status as payment_status,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items
      FROM orders o
      JOIN payments p ON o.id = p.order_id
      JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id, p.id
      ORDER BY o.created_at DESC
    `;

    const result = await pool.query(query);
    res.json({ orders: result.rows });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
