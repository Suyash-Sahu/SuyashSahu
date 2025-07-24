import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data - replace with your actual projects
const projects = [
  // {
  //   id: 1,
  //   name: "AI Chat Application",
  //   description: "A real-time chat application powered by AI with natural language processing capabilities and smart responses.",
  //   tags: [
  //     { name: "react", color: "text-blue-400" },
  //     { name: "nodejs", color: "text-green-400" },
  //     { name: "ai", color: "text-purple-400" }
  //   ],
  //   image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
  //   source_code_link: "https://github.com",
  //   live_demo_link: "https://demo.com",
  //   category: "AI/ML",
  //   featured: true
  // },
  // {
  //   id: 2,
  //   name: "E-Commerce Platform",
  //   description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
  //   tags: [
  //     { name: "nextjs", color: "text-gray-400" },
  //     { name: "stripe", color: "text-blue-400" },
  //     { name: "mongodb", color: "text-green-400" }
  //   ],
  //   image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  //   source_code_link: "https://github.com",
  //   live_demo_link: "https://demo.com",
  //   category: "Web App"
  // },
  {
    id: 3,
    name: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with workout plans, progress analytics, and social features.",
    tags: [
      { name: "java", color: "text-cyan-400" },
      { name: "firebase", color: "text-orange-400" },
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    source_code_link: "https://github.com/Suyash-Sahu/StayFit",
    live_demo_link: "https://github.com/Suyash-Sahu/StayFit",
    category: "Mobile App"
  },
  {
    id: 4,
    name: "E-Sports Management System",
    description: "Web platform for managing e-sports tournaments with player registration, tiered progression, and sponsorship options.",
    tags: [
      { name: "php", color: "text-blue-400" },
      { name: "mysql", color: "text-yellow-400" },
      { name: "html", color: "text-red-400" },
      { name: "css", color: "text-indigo-400" }
    ],
    image: "https://images.unsplash.com/photo-1611562027215-9407c5a850bc?w=400&h=300&fit=crop",
    source_code_link: "https://github.com/Suyash-Sahu/E-Sports-Management",
    live_demo_link: "https://github.com/Suyash-Sahu/E-Sports-Management",
    category: "Web App"
  },
  {
    id: 5,
    name: "IRCTC Clone App",
    description: "A train ticket booking app mimicking core features of IRCTC including seat availability, PNR check, and payment simulation.",
    tags: [
      { name: "react-native", color: "text-purple-400" },
      { name: "firebase", color: "text-orange-400" },
      { name: "node.js", color: "text-green-400" }
    ],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?w=400&h=300&fit=crop",
    source_code_link: "https://github.com/Suyash-Sahu/IRCTC-Clone",
    live_demo_link: "https://github.com/Suyash-Sahu/IRCTC-Clone",
    category: "Mobile App"
  },
  
  
  // {
  //   id: 4,
  //   name: "Data Visualization Dashboard",
  //   description: "Interactive dashboard for business analytics with real-time data processing and beautiful visualizations.",
  //   tags: [
  //     { name: "d3js", color: "text-orange-400" },
  //     { name: "python", color: "text-yellow-400" },
  //     { name: "api", color: "text-red-400" }
  //   ],
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  //   source_code_link: "https://github.com",
  //   live_demo_link: "https://demo.com",
  //   category: "Data Science"
  // },
  // {
  //   id: 5,
  //   name: "Blockchain Wallet",
  //   description: "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and portfolio tracking.",
  //   tags: [
  //     { name: "web3", color: "text-purple-400" },
  //     { name: "solidity", color: "text-gray-400" },
  //     { name: "ethereum", color: "text-blue-400" }
  //   ],
  //   image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
  //   source_code_link: "https://github.com",
  //   live_demo_link: "https://demo.com",
  //   category: "Blockchain"
  // },
  {
    id: 6,
    name: "3D Portfolio Website",
    description: "Interactive 3D portfolio website with Three.js animations, particle systems, and immersive experiences.",
    // tags: [
    //   { name: "threejs", color: "text-white" },
    //   { name: "webgl", color: "text-red-400" },
    //   { name: "gsap", color: "text-green-400" }
    // ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    source_code_link: "hhttps://suyashsahu.netlify.app/",
    live_demo_link: "https://suyashsahu.netlify.app/",
    category: "3D/Graphics"
  }
];

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0]
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

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

const ProjectCard = ({ project, index, isDark, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onClick(project)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative cursor-pointer group ${
        isActive ? 'col-span-2 row-span-2' : ''
      }`}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`
        relative overflow-hidden rounded-3xl h-full min-h-[300px]
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

        {/* Floating Elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.source_code_link && (
            <FloatingElement delay={0.1}>
              <motion.button
                className="p-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/20"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(145, 94, 255, 0.3)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.source_code_link, '_blank');
                }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </FloatingElement>
          )}
          {project.live_demo_link && (
            <FloatingElement delay={0.2}>
              <motion.button
                className="p-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/20"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(145, 94, 255, 0.3)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.live_demo_link, '_blank');
                }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.button>
            </FloatingElement>
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
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

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag.name}
                  className={`px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${tag.color}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tagIndex * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  #{tag.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: isHovered 
              ? "linear-gradient(to top, rgba(145, 94, 255, 0.2), transparent)"
              : "linear-gradient(to top, transparent, transparent)"
          }}
        />
      </div>
    </motion.div>
  );
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, isDark }) => (
  <div className="flex flex-wrap justify-center gap-3 mb-12">
    {categories.map((category, index) => (
      <motion.button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`
          relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
          ${activeCategory === category
            ? 'text-white shadow-lg shadow-purple-500/30'
            : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {activeCategory === category && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            layoutId="categoryBackground"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">{category}</span>
      </motion.button>
    ))}
  </div>
);

const SearchBar = ({ searchTerm, onSearchChange, isDark }) => (
  <motion.div
    className="relative max-w-md mx-auto mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`
          w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300
          ${isDark 
            ? 'bg-gray-900/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500' 
            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
          }
          backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20
        `}
      />
    </div>
  </motion.div>
);

const Works = () => {
  const categories = ['All'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className={`text-lg mb-4 text-gray-400 uppercase tracking-wider`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            My work
          </motion.p>
          
          <motion.h2
            className={`text-6xl md:text-8xl font-bold mb-8 text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Projects<span className="text-purple-500">.</span>
          </motion.h2>

          <motion.p
            className={`text-lg max-w-3xl mx-auto leading-relaxed text-gray-400`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Following projects showcase my skills and experience through real-world examples of my work.
            Each project is briefly described with links to code repositories and live demos.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isDark={true}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isDark={true}
        />

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isDark={true}
                  isActive={selectedProject?.id === project.id}
                  onClick={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className={`text-xl text-gray-400`}>
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Works;