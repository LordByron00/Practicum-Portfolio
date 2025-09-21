// App.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { reactIcon, profile, html, css, js, Firebase, Supabase, PostgreSQL, MySQL, SQLite, php, flutter, java, python, dart, ts, godot, express, laravel, watchmate, heisenburger, gardenbay, iPhoneHub, HTMLCSS, database, } from "./assets";
// import { motion } from "motion/react"



function App() {
  const techRefs = useRef([]);
  const techSectionRef = useRef(null);
  const heroRef = useRef(null);
  const certiRef = useRef(null);
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
    { name: "WatchMate", desc: "A media-based matchmaking application built with Flutter and Firebase. WatchMate is a cross-platform mobile application that pairs users based on shared media preferences. Built using Flutter and Firebase, it leverages real-time database services for user interactions, authentication, and profile matching. The system integrates a personalized media catalog, swipe-based interaction logic, and secure cloud data handling, offering a smooth and engaging user experience.", image: watchmate, url: "https://github.com/LordByron00/WatchMate"},
    { name: "Garden Bay Integrated System", desc: "The Garden Bay Integrated System is a comprehensive restaurant management solution designed to enhance customer convenience and operational efficiency. It features a React Native kiosk application for tablet-based self-ordering, a React-powered admin panel for inventory control and sales analytics, and a real-time kitchen display for order tracking. Backed by a Laravel MVC backend and SQLite database, the system enables seamless communication between customer, staff, and kitchen workflows.", image: gardenbay, url: "https://github.com/LordByron00/Garden-Bay-Intergrated-System" },
    { name: "iPhoneHub", desc: "iPhoneHub is a full-stack web-based e-commerce platform dedicated to selling both brand-new and second-hand iPhones. It aims to provide a convenient, trustworthy, and user-friendly marketplace that caters to a wide range of customers—from tech enthusiasts chasing the latest Apple models to budget-conscious users exploring affordable, pre-owned options.By bridging premium and sustainable shopping choices, iPhoneHub promotes accessibility and eco-conscious consumerism.", image: iPhoneHub, url: "https://github.com/samanthagwynetha/IphoneHubStore" },
    { name: "Heisenburger", desc: "A desktop-based point-of-sale system using Java, MySQL, and JavaFX. Heisenburger is a standalone Java application designed for efficient restaurant order and inventory management. Developed with JavaFX for a modern UI and MySQL for persistent data storage, the system supports features real-time order processin, user authentication and receipt printing. It offers a reliable and fast solution for small to mid-sized food establishments.", image: heisenburger, url: "https://github.com/LordByron00/Heisenburger" },
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
  let touchStartY = 0;

  const handleWheel = (e) => {
    if (!inView || isScrolling) return;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    const atLastProject = projectIndex === projects.length - 1;
    const atFirstProject = projectIndex === 0;

    if ((scrollingDown && atLastProject) || (scrollingUp && atFirstProject)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (scrollingDown && !atLastProject) {
      setProjectIndex((prev) => prev + 1);
      isScrolling = true;
    } else if (scrollingUp && !atFirstProject) {
      setProjectIndex((prev) => prev - 1);
      isScrolling = true;
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
  if (!inView || isScrolling) return;

  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  const scrollingDown = deltaY > 30;
  const scrollingUp = deltaY < -30;

  const atLastProject = projectIndex === projects.length - 1;
  const atFirstProject = projectIndex === 0;

  if ((scrollingDown && atLastProject) || (scrollingUp && atFirstProject)) {
    Lenis.start(); // let Lenis allow normal scroll
    return;        // don’t block it
  }

  // Block native scroll only if custom scrolling
  Lenis.stop(); // prevent Lenis default scroll if custom logic is applied

  if (scrollingDown && !atLastProject) {
    setProjectIndex((prev) => prev + 1);
    isScrolling = true;
  } else if (scrollingUp && !atFirstProject) {
    setProjectIndex((prev) => prev - 1);
    isScrolling = true;
  }

  setTimeout(() => {
    isScrolling = false;
    Lenis.start(); // resume Lenis scroll after timeout
  }, 800);
};

  if (wrapper) {
    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  return () => {
    if (wrapper) {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    }
  };
}, [projectIndex, inView, projects.length]);

useEffect(() => {
  const wrapper = projectWrapperRef.current;
  if (!wrapper) return;

  const atFirst = projectIndex === 0;
  const atLast = projectIndex === projects.length - 1;

  if (atFirst || atLast) {
    wrapper.style.overscrollBehavior = 'auto'; // allow native bounce scroll
    wrapper.style.touchAction = 'auto';         // allow browser gestures
  } else {
    wrapper.style.overscrollBehavior = 'none'; // trap scroll during in-between projects
    wrapper.style.touchAction = 'none';        // block gestures like pull-to-refresh
  }
}, [projectIndex, projects.length]);




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

  const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 1.2 } },
};

  return (
    <div className="app">
      <nav className="navbar">
        {/* <button onClick={() => scrollToRef(heroRef)}>Home</button> */}
        <button onClick={() => scrollToRef(aboutRef)}>About</button>
        <button onClick={() => scrollToRef(techSectionRef)}>Tech</button>
        <button onClick={() => scrollToRef(projectSectionRef)}>Projects</button>
        <button onClick={() => scrollToRef(certiRef)}>Certification</button>
        <button onClick={() => scrollToRef(contactRef)}>Contact</button>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="hero full-section"
        ref={heroRef}
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div className="hero-text" variants={textVariants}>
          <motion.p className="turn" variants={textVariants}>
            “Turning vision into code.”
          </motion.p>
          <motion.div variants={textVariants}>
            <h1>JUSTINE BAYRON</h1>
            <p>Aspiring full-stack developer | Driven by code, design, and purpose.</p>
          </motion.div>
        </motion.div>

        <motion.div className="hero-photo" variants={imageVariants}>
          <img src={profile} alt="Justine Bayron" />
        </motion.div>
      </motion.section>


      {/* About Section */}
      <section className="about full-section" ref={aboutRef}>
        <h2>———ABOUT ME———</h2>
        <p>
          I am a 4th Computer Science student at the University of Mindanao with a strong interest in full-stack development. My focus is on building responsive, efficient, and user-centered applications.
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
        <p className="swipe-hint">← swipe to view →</p>
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
                  <a href={project.url} className="project-link" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="project-icon"/>
                    <h3 className="project-title">{project.name}</h3>
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

      <section className="certificate" ref={certiRef}>
          <h2>CERTIFICATION</h2>
        <div className="certiport">
          <img src={HTMLCSS} alt="HTMLCSS" />
          <img src={database} alt="database"/>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact full-section" ref={contactRef}>
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-items">
          <a href="mailto:j.bayron.538021@umindanao.edu.ph" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="contact-icon" />
            j.bayron.538021@umindanao.edu.ph
          </a>
          <a href="https://github.com/LordByron00" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaGithub className="contact-icon" />
            LordByron00
          </a>
          <a href="https://www.linkedin.com/in/justine-bayron-274821315/" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="contact-icon" />
            Justine Bayron
          </a>
          <a href="https://www.instagram.com/01x369" className="contact-link" target="_blank" rel="noopener noreferrer">
            <FaInstagram  className="contact-icon" />
            0x7qz9vrx2p1yk6violrd
          </a>
        </div>
      </section>

    </div>
  );
}

export default App;