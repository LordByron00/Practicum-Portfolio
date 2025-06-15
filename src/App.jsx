// App.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import justine from './assets/Bayron.jpg';


function App() {
  const techRefs = useRef([]);
  const techSectionRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [scrollDir, setScrollDir] = useState("down");
  const [visibleRows, setVisibleRows] = useState([]);
  const projectWrapperRef = useRef(null);
  const projectSectionRef = useRef(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const projects = [
    { name: "WatchMate", desc: "Media-based Dating App", image: "/watchmate.png" },
    { name: "Heisenburger", desc: "Java POS System", image: "/heisenburger.png" },
    { name: "iPhoneHub", desc: "E-commerce site", image: "/iphonehub.png" },
    { name: "Messenger Mimic", desc: "Realtime Chat App", image: "/messenger.png" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateDirection = () => {
      const direction = window.scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDir) {
        setScrollDir(direction);
      }
      lastScrollY = window.scrollY > 0 ? window.scrollY : 0;
    };
    window.addEventListener("scroll", updateDirection);
    return () => window.removeEventListener("scroll", updateDirection);
  }, [scrollDir]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.9 }
    );
    if (projectSectionRef.current) {
      sectionObserver.observe(projectSectionRef.current);
    }
    return () => {
      if (projectSectionRef.current) {
        sectionObserver.unobserve(projectSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const rowObservers = techRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleRows((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          } else {
            setVisibleRows((prev) => prev.filter((i) => i !== index));
          }
        },
        { threshold: 0.5 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });
    return () => rowObservers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    const wrapper = projectWrapperRef.current;
    let isScrolling = false;

    const handleWheel = (e) => {
      if (!inView || isScrolling) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0 && projectIndex < projects.length - 1) {
        setProjectIndex((prev) => prev + 1);
        isScrolling = true;
      } else if (e.deltaY < 0 && projectIndex > 0) {
        setProjectIndex((prev) => prev - 1);
        isScrolling = true;
      }

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    if (wrapper) wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, [projectIndex, inView]);

  useEffect(() => {
    if (projectWrapperRef.current) {
      projectWrapperRef.current.scrollTo({
        left: projectIndex * window.innerWidth,
        behavior: "smooth",
      });
    }
  }, [projectIndex]);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={() => scrollToRef(heroRef)}>Home</button>
        <button onClick={() => scrollToRef(aboutRef)}>About</button>
        <button onClick={() => scrollToRef(techSectionRef)}>Tech</button>
        <button onClick={() => scrollToRef(projectSectionRef)}>Projects</button>
        <button onClick={() => scrollToRef(contactRef)}>Contact</button>
      </nav>

      {/* Hero Section */}
      <section className="hero full-section" ref={heroRef}>
        <div className="hero-text">
          <h1>"Turning Vision into Code."</h1>
        </div>
        <div className="hero-photo">
          <img src={justine} alt="Justine Bayron" />
          {/* <img src="../assets/Bayron.jpg" alt="Justine Bayron" /> */}
        </div>
      </section>

      {/* About Section */}
      <section className="about full-section" ref={aboutRef}>
        <h2>Luciferous Grandeur</h2>
        <p>
          I'm a developer focused on crafting responsive, interactive, and elegant
          digital experiences.
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="tech full-section" ref={techSectionRef}>
        <div className="tech-fade-mask">
          {[
            ["React", "Vue", "Next.js"],
            ["Laravel", "Django", "Express.js"],
            ["Tailwind", "Framer Motion", "Bootstrap"],
            ["MySQL", "PostgreSQL", "Firebase"],
          ].map((row, i) => (
            <motion.div
              className="tech-row"
              key={i}
              ref={(el) => (techRefs.current[i] = el)}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={visibleRows.includes(i)
                ? {
                    x: 0,
                    opacity: 1,
                  }
                : {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                  }}
              transition={{ duration: 0.6 }}
            >
              {row.map((tech, j) => (
                <span className="bubble" key={j}>
                  {tech}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects full-section" ref={projectSectionRef}>
        <div className="scroll-wrapper" ref={projectWrapperRef}>
          {projects.map((project, i) => (
            <div className="project" key={i}>

              <div className="projectheader">
                <img src={project.image} alt={project.name} className="project-image" />
                <h3 className="project-title">{project.name}</h3>
              </div>

              <div className="project-details">
                <p className="project-desc">{project.desc}</p>
              </div>
              
            </div>
          ))}
        </div>
        <div className="scroll-indicator">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`dot ${projectIndex === i ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact full-section" ref={contactRef}>
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-items">
          <a href="mailto:Luciferous@gmail.com" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="contact-icon" />
            Luciferous@gmail.com
          </a>
          <a href="https://github.com/Lordxxx00" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaGithub className="contact-icon" />
            github.com/Lordxxx00
          </a>
          <a href="https://linkedin.com/in/luciferous" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="contact-icon" />
            linkedin.com/in/luciferous
          </a>
        </div>
      </section>

    </div>
  );
}

export default App;