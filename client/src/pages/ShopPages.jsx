import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./shop.css";

function PaymentHistory({ email }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      fetchPaymentHistory();
    }
  }, [email]);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4242/api/payment-history/${encodeURIComponent(email)}`
      );
      const data = await response.json();
      if (data.payments) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading payment history...</div>;

  return (
    <div className="payment-history">
      <h3>Your Payment History</h3>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        payments.map((payment) => (
          <div key={payment.order_id} className="payment-item">
            <h4>Order #{payment.order_id}</h4>
            <p>Date: {new Date(payment.payment_date).toLocaleDateString()}</p>
            <p>Amount: R{payment.payment_amount}</p>
            <p>Status: {payment.payment_status}</p>
            <p>Shipping Address: {payment.shipping_address}</p>
            <div className="payment-items">
              <h5>Items:</h5>
              {payment.items &&
                payment.items.map((item) => (
                  <div
                    key={`${payment.order_id}-${item.product_id}`}
                    className="payment-item-product"
                  >
                    <span>{item.product_name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>R{item.price} each</span>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const STRIPE_PUBLIC_KEY = ""; // <-- Use your Stripe public key
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PRODUCTS = [
  // Laptops
  {
    id: 1,
    name: "Dell XPS 13 (New)",
    description: "Ultra-slim, high performance laptop for professionals.",
    price: 18500.0,
    category: "laptop",
    brand: "Dell",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Apple MacBook Pro 14 (Refurbished)",
    description: "Refurbished MacBook Pro, M1 Pro chip, 16GB RAM.",
    price: 22000.0,
    category: "laptop",
    brand: "Apple",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "HP EliteBook 840 G7 (Refurbished)",
    description: "Reliable business laptop, 8GB RAM, 256GB SSD.",
    price: 9500.0,
    category: "laptop",
    brand: "HP",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon (New)",
    description: "Premium lightweight laptop, 16GB RAM, 512GB SSD.",
    price: 19500.0,
    category: "laptop",
    brand: "Lenovo",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop&crop=center",
  },
  // Phones
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra (New)",
    description: "Flagship Android phone, 12GB RAM, 256GB storage.",
    price: 18999.0,
    category: "phone",
    brand: "Samsung",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 6,
    name: "Apple iPhone 14 Pro (Refurbished)",
    description: "Refurbished iPhone 14 Pro, 128GB, excellent condition.",
    price: 14500.0,
    category: "phone",
    brand: "Apple",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 7,
    name: "Xiaomi Redmi Note 12 (New)",
    description: "Affordable new Android phone, 8GB RAM, 128GB storage.",
    price: 4200.0,
    category: "phone",
    brand: "Xiaomi",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 8,
    name: "Google Pixel 7 (Refurbished)",
    description: "Refurbished Pixel 7, great camera, 128GB.",
    price: 7999.0,
    category: "phone",
    brand: "Google",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=300&fit=crop&crop=center",
  },
  // Monitors
  {
    id: 9,
    name: 'Samsung 27" Curved Monitor (New)',
    description: "Full HD Curved LED monitor, 75Hz.",
    price: 3400.0,
    category: "monitor",
    brand: "Samsung",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 10,
    name: 'Dell UltraSharp 24" (Refurbished)',
    description: "Refurbished IPS monitor, 1080p, great color.",
    price: 2100.0,
    category: "monitor",
    brand: "Dell",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 11,
    name: 'LG 32" 4K Monitor (New)',
    description: "Large 4K UHD monitor, HDR10 support.",
    price: 5800.0,
    category: "monitor",
    brand: "LG",
    status: "new",
    image:
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 12,
    name: 'AOC 24" Gaming Monitor (Refurbished)',
    description: "144Hz, 1ms, refurbished for esports.",
    price: 2800.0,
    category: "monitor",
    brand: "AOC",
    status: "refurbished",
    image:
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=300&fit=crop&crop=center",
  },
];

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

function ParticleBackground() {
  return (
    <div className="particles">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
        <div
          key={idx}
          className="particle"
          style={{
            left: `${10 * (idx + 1)}%`,
            animationDelay: `${idx === 8 ? 0.5 : idx}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

function StripeCheckoutForm({ cart, total, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements) return;

    if (!customerName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Please enter your shipping address.");
      return;
    }

    setProcessing(true);

    let clientSecret = null;
    try {
      // POST request to backend to create PaymentIntent
      const res = await fetch(
        "http://localhost:4242/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart,
            amount: Math.round(total * 100), // cents
            customerEmail,
          }),
        }
      );
      const data = await res.json();
      clientSecret = data.clientSecret;

      if (!clientSecret) throw new Error("Could not get payment intent.");
    } catch (err) {
      setErrorMsg("Error creating payment intent. Please try again.");
      setProcessing(false);
      return;
    }

    // Stripe.js confirm card payment
    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerName,
          email: customerEmail,
        },
      },
    });

    if (paymentResult.error) {
      setErrorMsg(paymentResult.error.message);
      setProcessing(false);
      return;
    }

    if (
      paymentResult.paymentIntent &&
      paymentResult.paymentIntent.status === "succeeded"
    ) {
      // Save order to backend
      try {
        const saveOrderRes = await fetch(
          "http://localhost:4242/api/save-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerName,
              customerEmail,
              paymentIntentId: paymentResult.paymentIntent.id,
              cart,
              total,
              shippingAddress: address,
              paymentStatus: paymentResult.paymentIntent.status,
            }),
          }
        );
        const saveOrderData = await saveOrderRes.json();

        if (!saveOrderData.success) {
          setErrorMsg("Order could not be saved. Please contact support.");
          setProcessing(false);
          return;
        }

        setProcessing(false);
        onSuccess({
          name: customerName,
          email: customerEmail,
          cart,
          amount: total,
          paymentIntentId: paymentResult.paymentIntent.id,
        });
      } catch (err) {
        setErrorMsg("Order saving failed. Please contact support.");
        setProcessing(false);
      }
    } else {
      setErrorMsg("Payment could not be completed. Try again.");
      setProcessing(false);
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Checkout</h3>
      <div className="form-group">
        <label htmlFor="customer-name">Full Name:</label>
        <input
          type="text"
          id="customer-name"
          required
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="customer-email">Email Address:</label>
        <input
          type="email"
          id="customer-email"
          required
          placeholder="your@email.com"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="customer-address">Shipping Address:</label>
        <input
          type="text"
          id="customer-address"
          required
          placeholder="123 Main St, City, Country"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Card Details:</label>
        <div className="card-input">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  fontFamily: "'Poppins', sans-serif",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#fa755a", iconColor: "#fa755a" },
              },
            }}
          />
        </div>
        <div className="card-errors" role="alert">
          {errorMsg}
        </div>
      </div>
      <button
        type="submit"
        className="checkout-button-stripe"
        disabled={processing}
      >
        {processing ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i> Processing...
          </span>
        ) : (
          <span>
            <i className="fas fa-lock"></i> Complete Payment
          </span>
        )}
      </button>
    </form>
  );
}

export default function ShopGuardianAngel() {
  const [cart, setCart] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Handle mobile menu body scroll
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification({ type: "success", message: "Item added to cart!" });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleOrderSuccess = (order) => {
    setOrderConfirmation(order);
    setCart([]);
    setShowCheckout(false);
    setCartModalOpen(false);
    setNotification({
      type: "success",
      message: "Payment successful! Thank you for your order.",
    });
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <ParticleBackground />

      {/* Mobile Menu Toggle */}
      <div
        className={`mobile-menu-toggle${isMobileMenuOpen ? " open" : ""}`}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label="Open menu"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            setIsMobileMenuOpen((prev) => !prev);
        }}
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay${isMobileMenuOpen ? " show" : ""}`}>
        <div className="mobile-menu-content">
          <div className="company-name">
            <h1>
              GUARDIAN <span className="highlight">ANGEL</span> STUDIO
              <span className="dot"></span>
            </h1>
          </div>
          <ul>
            <li>
              <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="/service" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <a href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cart-button"
                onClick={(e) => {
                  e.preventDefault();
                  setCartModalOpen(true);
                  setShowCheckout(false);
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                <span
                  className="cart-count"
                  style={{ display: cart.length > 0 ? "inline" : "none" }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav>
        <div className="company-name">
          <h1>
            GUARDIAN <span className="highlight">ANGEL</span> STUDIO
            <span className="dot"></span>
          </h1>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/service">Service</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a
              href="#"
              className="cart-button"
              onClick={(e) => {
                e.preventDefault();
                setCartModalOpen(true);
                setShowCheckout(false);
              }}
            >
              <i className="fas fa-shopping-cart"></i>
              <span
                className="cart-count"
                style={{ display: cart.length > 0 ? "inline" : "none" }}
              >
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Shop Section */}
      <section className="shop-section">
        <h1>Shop Our Products</h1>
        <div className="product-list" id="productList">
          {PRODUCTS.map((product) => (
            <div
              className="product-item"
              data-product-id={product.id}
              key={product.id}
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = "/placeholder-product.jpg";
                  }}
                />
              </div>
              <h2>{escapeHtml(product.name)}</h2>
              <p className="product-description">
                {escapeHtml(product.description)}
              </p>
              <p className="product-price">
                R{parseFloat(product.price).toFixed(2)}
              </p>
              <span
                style={{
                  padding: "4px 10px",
                  background: product.status === "new" ? "#0eada8" : "#f7890c",
                  color: "#fff",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  marginBottom: "8px",
                  display: "inline-block",
                }}
              >
                {product.status.charAt(0).toUpperCase() +
                  product.status.slice(1)}
              </span>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Modal */}
        <div
          className={`cart-modal${cartModalOpen ? " active" : ""}`}
          style={{
            display: cartModalOpen ? "flex" : "none",
          }}
          onClick={(e) => {
            if (e.target.classList.contains("cart-modal")) {
              setCartModalOpen(false);
              setShowCheckout(false);
            }
          }}
        >
          <div className="cart-content">
            <span
              className="close-cart"
              onClick={() => {
                setCartModalOpen(false);
                setShowCheckout(false);
              }}
            >
              &times;
            </span>
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
              {cart.length === 0 && <div>No items in cart.</div>}
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>R{item.price.toFixed(2)} each</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p>Subtotal: R{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <strong>Total: R{totalPrice.toFixed(2)}</strong>
            </div>
            {cart.length > 0 && !showCheckout && (
              <button
                className="checkout-button-stripe"
                onClick={() => setShowCheckout(true)}
              >
                <i className="fas fa-lock"></i> Proceed to Checkout
              </button>
            )}
            {showCheckout && (
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm
                  cart={cart}
                  total={totalPrice}
                  onSuccess={handleOrderSuccess}
                />
              </Elements>
            )}
          </div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <img
              src="/PHOTO-2025-07-28-13-29-45.jpg"
              alt="Guardian Angel Studio Logo"
            />
          </div>

          <div className="footer-info">
            <h4>Let's Talk About</h4>
            <p>
              We specialize in developing innovative technological solutions for
              businesses of all sizes, and our team of experienced professionals
              is committed to providing you with the best possible service and
              products.
            </p>
          </div>

          <div className="footer-about">
            <h4>Pages</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/service">Service</a>
              </li>
              <li>
                <a href="/contact">Contacts</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/search">Search</a>
              </li>
            </ul>
          </div>

          <div className="social-icons">
            <h4>Connect</h4>
            <div className="social-links">
              <a
                href="https://wa.me/message/GND3LQDQJL22I1"
                className="whatsapp"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="mailto:info@guardian-angelstudios.co.za"
                className="email"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


