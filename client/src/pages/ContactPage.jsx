import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 4 + 6 + "s";
      document.querySelector(".particles")?.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 12000);
    }
    const interval = setInterval(createParticle, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("https://formspree.io/f/mzzgvakl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Message sent! Thank you for contacting us.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("Server error: " + err.message);
    }
  }

  return (
    <div>
      {/* Particles */}
      <div className="particles">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: `${(i + 1) * 10}%`, animationDelay: `${i % 8}s` }}
          ></div>
        ))}
      </div>

      {/* Hamburger for mobile */}
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

      {/* Desktop nav */}
      <nav className="desktop-nav">
        <div className="company-name">
          <h1>
            GUARDIAN <span className="highlight">ANGEL</span> STUDIO
            <span className="dot"></span>
          </h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/service">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu overlay */}
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                about
              </Link>
            </li>
            <li>
              <Link to="/service" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <section className="contact-section">
        <h1>Contact Us</h1>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <i className="fas fa-phone"></i>
              <a href="tel:+27753369201">+27 (75) 336-9201</a>
            </li>
            <li>
              <i className="fab fa-whatsapp"></i>
              <a href="tel:+27753369201">+27 (75) 336-9201</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:info@guardian-angelstudios.co.za">
                info@guardian-angelstudios.co.za
              </a>
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
          {status && (
            <div style={{ marginTop: "1rem", color: "#0eada8" }}>{status}</div>
          )}
        </form>
      </section>
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
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link to="/service">service</Link>
              </li>
              <li>
                <Link to="/contact">contact</Link>
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
};

export default ContactPage;
