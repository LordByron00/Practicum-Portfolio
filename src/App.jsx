// App.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import { FaEnvelope, FaGithub, FaLinkedin,  } from "react-icons/fa";
import { reactIcon, profile, html, css, js, Firebase, Supabase, PostgreSQL, MySQL, SQLite, php, flutter, java, python, dart, ts, godot, express, laravel, watchmate, heisenburger, gardenbay, iPhoneHub, } from "./assets";
import { a } from "motion/react-client";



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
  const [projectsVisible, setProjectsVisible] = useState(false);

  const projects = [
    { name: "WatchMate", desc: "WatchMate is a media-based dating app built with Flutter and Firebase. It connects people through shared interests in movies, shows, and other media content — because sometimes, the best matches start with what you watch. ", image: watchmate, url: "https://github.com/LordByron00/WatchMate"},
    { name: "Heisenburger", desc: "My simple Java project as a first year college student. Heisenburger is a desktop Point of Sale (POS) system built using Java, and JavaFX, designed for small food businesses, burger joints, or fast food outlets. Inspired by Breaking Bad, the system combines simplicity with functionality to streamline customer transactions and order management.", image: heisenburger, url: "https://github.com/LordByron00/Heisenburger" },
    { name: "iPhoneHub", desc: "iPhoneHub is a full-stack web-based e-commerce platform dedicated to selling both brand-new and second-hand iPhones. It aims to provide a convenient, trustworthy, and user-friendly marketplace that caters to a wide range of customers—from tech enthusiasts chasing the latest Apple models to budget-conscious users exploring affordable, pre-owned options.", image: iPhoneHub, url: "https://github.com/samanthagwynetha/IphoneHubStore" },
    { name: "Garden Bay Integrated System", desc: "A React Native-based kiosk ordering application for customers to browse the menu and place orders directly from a tablet. A React-based Inventory management system, product management and sales analytics. A Laravel MVC backend to handle business logic, data storage, and API services.", image: gardenbay, url: "https://github.com/LordByron00/Garden-Bay-Intergrated-System" },
  ];

  const techStack = [
            [["HTML", html], ["CSS", css], ["Javascript", js], ["PHP", php]],
            [["React", reactIcon], ["Flutter", flutter], ["Express", express], ["laravel", laravel]],
            [["Java", java], ["Python ", python], ["Dart", dart], ["TypeScript", ts]],
            [["Godot", godot], ["Firebase ", Firebase], ["Supabase", Supabase]],
            [["PostgreSQL", PostgreSQL], ["MySQL ", MySQL], ["SQLite", SQLite]],
          ];

  useEffect(() => {
      const sectionObserver = new IntersectionObserver(
        ([entry]) => setProjectsVisible(entry.isIntersecting),
        { threshold: 0.5 }
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
    const wrapperWidth = projectWrapperRef.current.offsetWidth;
    projectWrapperRef.current.scrollTo({
      left: projectIndex * wrapperWidth,
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
          <p className="turn">“Turning vison into code.”</p>
          <div>
          <h1>JUSTINE BAYRON</h1>
          <p>Aspiring full-stack developer | Driven by code, design, and purpose.</p>
          </div>
          {/* <p>Turning vision into code — aspiring full-stack developer.</p> */}
          {/* <h4>“Turning vision into code — aspiring full-stack developer.”</h4> */}
        </div>
        <div className="hero-photo">
          <img src={profile} alt="Justine Bayron" />
          {/* <img src="../assets/Bayron.jpg" alt="Justine Bayron" /> */}
        </div>
      </section>

      {/* About Section */}
      <section className="about full-section" ref={aboutRef}>
        <h2>———ABOUT ME———</h2>
        <p>
          I am a third-year Computer Science student at the University of Mindanao with a strong interest in full-stack development. My focus is on building responsive, efficient, and user-centered applications.
          I work with modern technologies such as React, Flutter, Laravel, and PostgreSQL, and enjoy bridging the gap between design and functionality. I value clarity, structure, and precision in both code and interface. 
          I thrive in silence, work well independently, and carry a presence that speaks through the quality of what I build. 
          Currently, I am refining my skills through hands-on projects that explore real-world solutions, while continuously learning to stay aligned with evolving industry standards.
          Beyond development, I have a deep appreciation for music and a constant drive to learn new things both technical and personal. 
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="tech full-section" ref={techSectionRef}>
        <h2>TECH STACK</h2>
        <div className="tech-fade-mask">
          {techStack.map((row, i) => (
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
                <div className="bubble" key={j}>
                  <img src={tech[1]} alt="React" />
                  <p>{tech[0]}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects full-section" ref={projectSectionRef}>
        <h2>PROJECTS</h2>
        <div className="scroll-wrapper" ref={projectWrapperRef}>
          {projects.map((project, i) => (
          
              <motion.div
                className="project"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.5, delay: i * 0.5 }}
              >
             
                <div className="projectheader">
                  <img src={project.image} alt={project.name} className="project-image" />
                  <h3 className="project-title">{project.name}</h3>
                  <a href={project.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                </div>

                <div className="project-details">
                  <p className="project-desc">{project.desc}</p>
                
                </div>
              </motion.div>
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
            j.bayron.538021@umindanao.edu.ph
          </a>
          <a href="https://github.com/LordByron00" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaGithub className="contact-icon" />
            LordByron00
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