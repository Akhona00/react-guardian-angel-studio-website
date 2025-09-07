import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./about.css";

const AboutPage = () => {
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
      <div className="particles">
        {/* ...particles divs as before... */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: `${(i + 1) * 10}%`, animationDelay: `${i % 8}s` }}
          ></div>
        ))}
      </div>
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
            <Link to="/service">Service</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/search">
              <i className="fas fa-search"></i>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
        </ul>
      </nav>

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
                Shop
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <section className="about">
        <div className="about-content">
          <h1>
            About <span className="highlight">Guardian </span>Angel Studios
          </h1>
          <p>
            Guardian Angel Studios has been growing brands and businesses since
            2017. It was built on a desire to support ambitious founders,
            leaders, and teams in using technology to create a better tomorrow.
          </p>
          <p>
            Our mission is to empower brilliant ideas that have the potential to
            make a tangible difference in the world. We believe that our legacy
            will be defined by the positive difference we help bring to peoples'
            lives.
          </p>
          <p>
            Collectively, we are designers, developers, strategists, writers,
            shapers, and technologists. We hold each other accountable to create
            beautiful, progressive, bold, and purposeful work that reflects our
            commitment to excellence.
          </p>
          <p>
            Together with our clients, we are designing for the future, tackling
            the most pressing issues and interests of our time.
          </p>
        </div>
      </section>

      <section className="about-image">
        <h1>VERSION</h1>
        <div className="about-image-container">
          <img src="/images/version.png" alt="About Us Version" />
          <p>
            We leave an unforgettable mark to our clients and customers. Our
            goal is to help businesses quickly adopt new technologies, tackle
            complex challenges that come with digital progress, and drive
            continuous innovation. Whether it's a customer-focused app or a
            cutting-edge enterprise solution, we manage the whole process from
            start to finish, offering ongoing support every step of the way.
          </p>
        </div>
        <h1>MISSION</h1>
        <div className="about-image-container">
          <img src="/images/mission.png" alt="About Us Mission" />
          <p>
            To partner with clients to fuel their growth story. We are committed
            to ensuring customer success and delighting our clients with our
            service offerings. To provide dignified employment by creating a
            culture that recognizes the uniqueness of every individual and
            values their expertise and contribution. A culture that encourages
            everyone to bring their authentic selves to work. To create value by
            delivering solutions that impact society and create a better world.
          </p>
        </div>
      </section>

      <section className="team-section">
        <h1>Meet Our Team</h1>
        <div className="team">
          <div className="team-member">
            <img src="/images/manager.jpeg" alt="Vicent Mashinini" />
            <h3>Vincent Mashinini</h3>
            <p>Business Development Manager</p>
          </div>
          <div className="team-member">
            <img src="/images/analyst.jpeg" alt="Mzwandile Mazwiya" />
            <h3>Mzwandile Mazwiya</h3>
            <p>Business Analyst</p>
          </div>
        </div>
      </section>

      <section className="timeline">
        <h1>GUARDIAN ANGEL STUDIOS TIMELINE</h1>
        <div className="timeline-container">
          <div className="timeline-item">
            <h2>2017/19</h2>
            <p>Graphic Design And Branding</p>
          </div>
          <div className="timeline-item">
            <h2>2020/21</h2>
            <p>Digital Marketing</p>
          </div>
          <div className="timeline-item">
            <h2>2022/23</h2>
            <p>Web Design</p>
            <p>Laptop Repair</p>
            <p>Cyber Security</p>
            <p>SEO Services</p>
          </div>
          <div className="timeline-item">
            <h2>2024/25</h2>
            <p>Web Applications</p>
            <p>Mobile Applications</p>
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
                <Link to="/service">services</Link>
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

export default AboutPage;
