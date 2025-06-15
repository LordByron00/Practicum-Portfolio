// App.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const techRefs = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const projectWrapperRef = useRef(null);
  const projectSectionRef = useRef(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const projects = [
    { name: "WatchMate", desc: "Media-based Dating App" },
    { name: "Heisenburger", desc: "Java POS System" },
    { name: "iPhoneHub", desc: "E-commerce site" },
    { name: "Messenger Mimic", desc: "Realtime Chat App" },
  ];

  useEffect(() => {
    const observers = techRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndex(index);
          }
        },
        { threshold: 0.5 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

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
    const wrapper = projectWrapperRef.current;
    let isScrolling = false;

    const handleWheel = (e) => {
      if (!inView || isScrolling) return;

      e.preventDefault();

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

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero full-section">
        <div className="hero-text">
          <h1>"Turning Vision into Code."</h1>
        </div>
        <div className="hero-photo">
          <img src="/your-photo.jpg" alt="Your" />
        </div>
      </section>

      {/* About Section */}
      <section className="about full-section">
        <h2>Luciferous Grandeur</h2>
        <p>
          I'm a developer focused on crafting responsive, interactive, and elegant
          digital experiences.
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="tech full-section">
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
            animate={{
              x: visibleIndex === i ? 0 : i % 2 === 0 ? -100 : 100,
              opacity: visibleIndex === i ? 1 : 0,
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
      </section>

      {/* Projects Section */}
      <section className="projects full-section" ref={projectSectionRef}>
        <div className="scroll-wrapper" ref={projectWrapperRef}>
          {projects.map((project, i) => (
            <div className="project" key={i}>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
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
      <section className="contact full-section">
        <h2>Contact Me</h2>
        <p>Email: Luciferous@gmail.com</p>
        <p>GitHub: github.com/Lordxxx00</p>
        <p>LinkedIn: linkedin.com/in/luciferous</p>
      </section>
    </div>
  );
}

export default App;
