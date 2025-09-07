import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./service.css";

const ServicePage = () => {
  const particlesRef = useRef(null);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const timeRunningRef = useRef(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  // Services data
  const services = [
    {
      image: "/images/domain_hosting.png",
      title: "DOMAIN",
      name: "& HOSTING",
      services: [
        "Domain name registration",
        "Transfer Domain Name",
        "Corporate Services",
        "Wordpress NVMe Hosting",
        "VPS Hosting",
        "Windows .Net Core Hosting",
        "Windows NVMe Web Hosting",
        "Dedicated Hosting",
        "Cloud Hosting",
      ],
    },
    {
      image: "/images/development.png",
      title: "DEVELOPMENT",
      name: "",
      services: [
        "Web Applications",
        "Mobile Applications",
        "Software Development",
        "Enterprise Software Development",
        "UX/UI Designing",
        "Hire Software Developers",
        "Offshore Outsourcing",
        "On-Demand App Development",
        "Cryptocurrency App Development",
      ],
    },
    {
      image: "/images/advertising.png",
      title: "MARKETING",
      name: "CROW",
      services: [
        "Digital Marketing",
        "SEO Services",
        "Social Media Marketing",
        "Google Ads",
        "Facebook Ads",
      ],
    },
    {
      image: "/images/email.png",
      title: "EMAIL",
      name: "",
      services: [
        "Business Email Hosting",
        "Email Only Hosting",
        "Bulk SMTP Services",
        "Prepared Bulk SMTP",
        "Microsoft Office 365",
        "Microsoft Teams Integration",
      ],
    },
    {
      image: "/images/design.png",
      title: "DESIGN",
      name: "OWL",
      services: [
        "Website Designing",
        "Branding Services",
        "E-commerce store Design",
        "Explainer Video",
        "Web Support & Maintenance",
      ],
    },
    {
      image: "/images/cybersecurity.png",
      title: "CYBER",
      name: "SECURITY",
      services: [
        "Managed Security Services (MSS)",
        "Email & Web Security",
        "Incident Response & Recovery",
        "Security Awareness Training",
        "Network Security",
        "Security Consulting",
        "Endpoint Security",
        "Cyber Insurance",
      ],
    },
    {
      image: "/images/sound.png",
      title: "PROFESSIONAL",
      name: "SOUND HIRE",
      services: [
        "Corporate event sound",
        "Wedding & Private Events",
        "Party Events",
        "Funeral Services",
        "Churches & Conferences",
        "Birthday parties",
        "Outdoor Gatherings",
        "Umembeso and Unveiling",
        "Schools functions Meeting",
      ],
    },
    {
      image: "/images/Human_and_Robot.png",
      title: "AI",
      name: "MACHINE LEARNING",
      services: [
        "AI Model Development",
        "Machine Learning Solutions",
        "Chatbot Development",
        "Data Analysis & Prediction",
        "Computer Vision & NLP",
      ],
    },
    {
      image: "/images/photographer.png",
      title: "PHOTOGRAPHER",
      name: "",
      services: [
        "Event Photography",
        "Portrait Photography",
        "Commercial Photography",
        "Fashion Photography",
        "Editorial Photography",
        "Lifestyle Photography",
        "Aerial Photography",
      ],
    },
    {
      image: "/images/job_placement.png",
      title: "PLACEMENT & PROJECT",
      name: "MANAGEMENT",
      services: [
        "Job Placement Assistance",
        "Project Planning & Execution",
        "Resource Allocation",
        "Freelance Project Management",
        "Development of business plans",
      ],
    },
    {
      image: "/images/technical_support.png",
      title: "TECHNICAL SUPPORT",
      name: "SERVICES",
      services: [
        "Device Management",
        "IT Support and Helpdesk",
        "Data Backup & Recovery",
        "Broken Glass and LCD",
        "Custom Build PC",
        "Complete Computer Setup",
        "Operating System Issues",
        "Software Installation & Troubleshooting",
        "Virus Removal & Security Help",
      ],
    },
    {
      image: "/images/videography.png",
      title: "VIDEOGRAPHY",
      name: "SERVICES",
      services: [
        "Event Videography",
        "Document Videography",
        "Studio & Outdoor Shoots",
        "Live Streaming",
        "Video Editing & Post-Production",
        "Corporate Videos",
        "Marketing & Promo Videos",
        "Social Media Content",
        "Real Estate Videography",
      ],
    },
  ];

  // Desktop carousel effect
  useEffect(() => {
    if (window.innerWidth < 900) return; // Don't run desktop carousel on mobile

    const timeRunning = 3000;
    const timeAutoNext = 7000;
    let runTimeOut, runNextAuto, particleInterval;
    let startX = 0,
      isDragging = false,
      deltaX = 0;

    function createParticle() {
      if (!particlesRef.current) return;
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 4 + 6 + "s";
      particlesRef.current.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 12000);
    }
    particleInterval = setInterval(createParticle, 1000);

    function resetTimeAnimation() {
      if (timeRunningRef.current) {
        timeRunningRef.current.style.animation = "none";
        void timeRunningRef.current.offsetHeight;
        timeRunningRef.current.style.animation =
          "runningTime 7s linear 1 forwards";
      }
    }

    function showSlider(type) {
      if (!listRef.current || !carouselRef.current) return;
      const sliderItemsDom = listRef.current.querySelectorAll(".item");
      if (sliderItemsDom.length < 2) return;
      if (type === "next") {
        listRef.current.appendChild(sliderItemsDom[0]);
        carouselRef.current.classList.add("next");
      } else {
        listRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carouselRef.current.classList.add("prev");
      }
      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.classList.remove("next");
          carouselRef.current.classList.remove("prev");
        }
      }, timeRunning);
      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        showSlider("next");
      }, timeAutoNext);
      resetTimeAnimation();
    }

    // Mouse/touch event handlers
    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      deltaX = 0;
      if (listRef.current) {
        listRef.current.style.cursor = "grabbing";
      }
    };
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      deltaX = e.pageX - startX;
    };
    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (listRef.current) {
        listRef.current.style.cursor = "grab";
      }
      if (deltaX > 70) showSlider("prev");
      else if (deltaX < -70) showSlider("next");
      deltaX = 0;
    };
    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      deltaX = 0;
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      deltaX = e.touches[0].pageX - startX;
    };
    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (deltaX > 70) showSlider("prev");
      else if (deltaX < -70) showSlider("next");
      deltaX = 0;
    };

    // Add listeners
    if (listRef.current) {
      listRef.current.style.cursor = "grab";
      listRef.current.addEventListener("mousedown", handleMouseDown);
      listRef.current.addEventListener("touchstart", handleTouchStart);
      listRef.current.addEventListener("touchmove", handleTouchMove);
      listRef.current.addEventListener("touchend", handleTouchEnd);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    resetTimeAnimation();
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    // Cleanup
    return () => {
      clearInterval(particleInterval);
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (listRef.current) {
        listRef.current.removeEventListener("mousedown", handleMouseDown);
        listRef.current.removeEventListener("touchstart", handleTouchStart);
        listRef.current.removeEventListener("touchmove", handleTouchMove);
        listRef.current.removeEventListener("touchend", handleTouchEnd);
        listRef.current.style.cursor = "";
      }
    };
  }, []);

  // Mobile carousel effect
  useEffect(() => {
    if (window.innerWidth >= 900) return; // Only run on mobile
    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % services.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [services.length]);

  // Next/Prev for mobile
  const goPrev = () => {
    setCurrentMobileIndex((prev) =>
      prev === 0 ? services.length - 1 : prev - 1
    );
  };
  const goNext = () => {
    setCurrentMobileIndex((prev) =>
      prev === services.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <div className="particles" ref={particlesRef}>
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="particle"
            style={{
              left: `${(idx + 1) * 10}%`,
              animationDelay: `${idx % 8}s`,
            }}
          ></div>
        ))}
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
            <Link to="/service">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/shop">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile carousel */}
      <div className="mobile-carousel">
        <div className="mobile-carousel-inner">
          <div className="mobile-carousel-image">
            <img
              src={services[currentMobileIndex].image}
              alt={services[currentMobileIndex].title}
            />
          </div>
          <div className="mobile-carousel-content">
            <div className="mobile-carousel-title">
              {services[currentMobileIndex].title}
            </div>
            <div className="mobile-carousel-name">
              {services[currentMobileIndex].name}
            </div>
            <ul className="mobile-carousel-list">
              {services[currentMobileIndex].services.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="mobile-carousel-nav">
              <button onClick={goPrev} aria-label="Previous">
                &#8592;
              </button>
              <span>
                {currentMobileIndex + 1} / {services.length}
              </span>
              <button onClick={goNext} aria-label="Next">
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop carousel */}
      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className="item"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              <div className="content">
                <div className="title">{service.title}</div>
                <div className="name">{service.name}</div>
                <div className="des">
                  {service.services.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="timeRunning" ref={timeRunningRef}></div>
      </div>

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

export default ServicePage;
