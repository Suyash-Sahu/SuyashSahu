import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import codynImage from '../assets/projects/codyn.png';

/* -------------------------
   === CONFIG / LINKS ===
   Update these if needed
   ------------------------- */
const ALL_PROJECTS_LINK = "https://suyashsahu-projects.netlify.app/"; // your dedicated website with all projects
const GITHUB_LINK = "https://github.com/Suyash-Sahu"; // your GitHub profile or repos page

/* -------------------------
   === TOP 3 PROJECTS (show only these) ===
   Replaced with the project descriptions you provided
   ------------------------- */
const projects = [
  {
    id: 1,
    name: "Secure Chat Network",
    tags: [
      { name: "nodejs", color: "text-green-400" },
      { name: "express", color: "text-gray-300" },
      { name: "socket.io", color: "text-orange-400" },
      { name: "mongodb", color: "text-emerald-400" },
      { name: "security", color: "text-red-400" },
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    source_code_link: "https://securechat-ksse.onrender.com/",
    live_demo_link: "",
    featured: true,
   
    category: "Web App",
  },
  {
    id: 2,
    name: "VibeCode Editor – AI-Powered Web IDE",
    tags: [
      { name: "react", color: "text-blue-400" },
      { name: "nodejs", color: "text-green-400" },
      { name: "ai", color: "text-pink-400" },
      { name: "web-ide", color: "text-purple-400" },
    ],
    image: codynImage,
    source_code_link: "https://github.com/Suyash-Sahu/code-editor",
    live_demo_link: "",
   
    category: "Web App",
  },
  {
    id: 3,
    name: "Stay Fit – Fitness Tracker",
    tags: [
      { name: "java", color: "text-cyan-400" },
      { name: "firebase", color: "text-orange-400" },
      { name: "android", color: "text-green-400" },
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    source_code_link: "https://github.com/Suyash-Sahu/StayFit",
    live_demo_link: "https://github.com/Suyash-Sahu/StayFit",
    
    category: "Mobile App",
  },
];

/* -------------------------
   === Particle background ===
   (kept as before)
   ------------------------- */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 94, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/* -------------------------
   === Small UI pieces ===
   ------------------------- */
const GlowingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const ProjectCard = ({ project, index, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mainLink = project.live_demo_link || project.source_code_link || ALL_PROJECTS_LINK;

  return (
    <motion.div
      key={project.id}
      onClick={() => {
        if (mainLink) window.open(mainLink, "_blank", "noopener noreferrer");
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer group"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`
        relative overflow-hidden rounded-3xl h-full min-h-[320px]
        ${isDark ? 'bg-gray-900/50' : 'bg-white/50'}
        backdrop-blur-sm border border-purple-500/20
        ${isHovered ? 'shadow-2xl shadow-purple-500/20' : 'shadow-lg'}
        transition-all duration-300
      `}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          {project.featured && (
            <motion.span
              className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Featured ✨
            </motion.span>
          )}

          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            {project.name}
          </h3>

          <p className="text-gray-200 mb-4 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {(project.bullets || []).map((b, i) => (
              <div key={i} className="text-xs text-gray-300">• {b}</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag, tagIndex) => (
              <motion.span
                key={tag.name}
                className={`px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${tag.color}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.08 }}
                whileHover={{ scale: 1.05 }}
              >
                #{tag.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};

/* -------------------------
   === Works component (main) ===
   ------------------------- */
const Works = () => {
  // keep simple: show only the top projects array (no search/filter)
  const topProjects = projects.slice(0, 3); // explicitly top 3
  const [isDark] = useState(true);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />

      {/* Glowing Orbs */}
      <GlowingOrb className="top-20 left-10 w-64 h-64 bg-purple-500" delay={0} />
      <GlowingOrb className="top-40 right-20 w-48 h-48 bg-pink-500" delay={1} />
      <GlowingOrb className="bottom-20 left-1/3 w-56 h-56 bg-blue-500" delay={2} />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-lg mb-4 text-gray-400 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Selected Work
          </motion.p>

          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Top Projects<span className="text-purple-500">.</span>
          </motion.h2>

          <motion.p
            className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Highlighting three flagship projects — for the full list visit my dedicated projects site.
          </motion.p>
        </motion.div>

        {/* Projects Grid (top 3 only) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr mb-12"
          layout
        >
          <AnimatePresence>
            {topProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProjectCard project={project} index={index} isDark={isDark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA buttons to full site / GitHub */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <a
            href={ALL_PROJECTS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            View All Projects
          </a>

          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white/90 bg-black/30 backdrop-blur-sm hover:scale-105 transition-transform"
          >
            Explore GitHub
          </a>
        </div>

        {/* small note */}
        <p className="text-center text-sm text-gray-400 mt-6 max-w-2xl mx-auto">
          If you'd like a demo or deeper walkthrough of any project, hit the GitHub repo links or visit my full portfolio.
        </p>
      </div>
    </section>
  );
};

export default Works;
