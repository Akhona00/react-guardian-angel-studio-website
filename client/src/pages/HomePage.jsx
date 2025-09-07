import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const clientLogos = [
  { src: "/images/4044_LOOGOO_012256.png", alt: "Client 1" },
  { src: "/images/afribond.jpeg", alt: "Client 2" },
  { src: "/images/bible.jpeg", alt: "Client 3" },
  { src: "/images/glory.jpeg", alt: "Client 4" },
  { src: "/images/lion.jpeg", alt: "Client 5" },
  { src: "/images/magx.jpeg", alt: "Client 6" },
  { src: "/images/mphemba.jpeg", alt: "Client 7" },
  { src: "/images/novesi.jpeg", alt: "Client 8" },
  { src: "/images/tabula.jpeg", alt: "Client 9" },
  { src: "/images/valley.jpeg", alt: "Client 10" },
  { src: "/images/hacko.jpg", alt: "Client 11" },
  { src: "/images/duma.jpg", alt: "Client 12" },
];

const serviceItems = [
  {
    title: "Design",
    desc: "Our talented designers create visually stunning and user-friendly interfaces.",
  },
  {
    title: "Professional Sound Hire",
    desc: "We provide high-quality sound equipment and expertise for events of all sizes.",
  },
  {
    title: "AI & Machine Learning",
    desc: "We leverage AI and machine learning to deliver innovative solutions and insights.",
  },
  {
    title: "Cyber Security",
    desc: "We protect your digital assets with robust cyber security measures.",
  },
  {
    title: "Photography",
    desc: "We capture your special moments with stunning photography services.",
  },
  {
    title: "Placement & Project Management",
    desc: "We ensure the right talent is in the right place at the right time, managing projects with precision.",
  },
  {
    title: "Technical support services",
    desc: "We provide expert technical support to keep your systems running smoothly.",
  },
  {
    title: "Videography",
    desc: "We create engaging videos that tell your story and connect with your audience.",
  },
];

const HomePage = () => {
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
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
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

  return (
    <div>
      {/* Floating particles background */}
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
                About
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
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="content-row">
            <div className="logo">
              <div className="logo-placeholder">
                <img src="/PHOTO-2025-07-28-13-29-45.jpg" alt="Logo" />
              </div>
            </div>
            <div className="hero-text">
              <h1>
                <span className="highlight">Welcome</span> to GUARDIAN{" "}
                <span className="highlight">ANGEL</span> STUDIO
              </h1>
              <p>
                <span className="different-font">
                  "We leave an <span className="highlight">unforgettable</span>{" "}
                  mark"
                </span>
              </p>
            </div>
          </div>
          <div className="button-container">
            <Link to="/service" className="btn">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-item">
            <h3>People Focus</h3>
            <p>
              Our people are our strength. Their happiness, fulfillment, and
              success matter.
            </p>
          </div>
          <div className="value-item">
            <h3>Continuous improvement</h3>
            <p>
              We are committed to learning new skills and continuously look at
              ways of improving efficiency and productivity.
            </p>
          </div>
          <div className="value-item">
            <h3>Industry Expertise</h3>
            <p>
              We offer a competitive edge to our clients that targets various
              industry domains.
            </p>
          </div>
          <div className="value-item">
            <h3>Work-life Balance</h3>
            <p>
              Latest infrastructure and flexible working hours keeps our
              work-life balance in loop.
            </p>
          </div>
          <div className="value-item">
            <h3>Quick Turnaround</h3>
            <p>
              We believe in fast execution to stay a step ahead of our
              competitors.
            </p>
          </div>
          <div className="value-item">
            <h3>Quality Assurance</h3>
            <p>
              We do value speed, and efficiency, and we approach projects with a
              “lean” methodology, but we thoroughly detail every step and we’re
              stringent about our product testing.
            </p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Our Services and Products</h2>
        <div className="service-container">
          {/* Mobile: scrollable list, Desktop: animated sliding carousel */}
          <div className="service-slider">
            {serviceItems.map((item, idx) => (
              <div className="service-item" key={idx}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="our-clients">
        <h2>Our Clients</h2>
        <div className="clients">
          <div className="client-logos">
            {clientLogos.map((logo, idx) => (
              <div key={idx}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
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
              <li>
                <Link to="/shop">shop</Link>
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

export default HomePage;
