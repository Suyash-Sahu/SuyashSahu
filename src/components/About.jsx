import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useTheme } from '../context/ThemeContext';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const ServiceCard = ({ index, title, icon, description, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group"
    >
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 400,
        }}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute -inset-0.5 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, #915eff, #ff6b6b, #4ecdc4, #45b7d1, #915eff)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className={`relative w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card
            transition-all duration-500 transform overflow-hidden
            ${isHovered ? 'scale-105 rotate-1' : 'scale-100'}`}
        >
          <div
            className={`rounded-[20px] py-6 px-8 h-[320px] flex justify-between items-center flex-col
              ${isDark ? 'bg-tertiary' : 'bg-white/90 backdrop-blur-sm'}
              transition-all duration-500 relative overflow-hidden`}
          >
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-300'}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Icon with enhanced animation */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{
                rotate: isHovered ? [0, 5, -5, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-purple-500' : 'bg-purple-400'} blur-xl opacity-20 scale-150`} />
              <img src={icon} alt={title} className="relative w-20 h-20 object-contain" />
            </motion.div>

            {/* Title with typing effect */}
            <motion.h3 
              className={`text-[22px] font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} flex-shrink-0`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              {title}
            </motion.h3>

            {/* Enhanced description with better animation */}
            <motion.div
              className="relative flex-1 w-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <motion.p
                className={`text-[15px] text-center leading-relaxed ${isDark ? 'text-secondary' : 'text-gray-600'} 
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent`}
                initial={{ opacity: 0, height: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7,
                  height: isHovered ? 'auto' : '60px',
                  scale: isHovered ? 1 : 0.95,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: isHovered ? 'none' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: isHovered ? 'visible' : 'hidden',
                }}
              >
                {description}
              </motion.p>
            </motion.div>

            {/* Hover indicator */}
            <motion.div
              className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full
                ${isDark ? 'bg-purple-500' : 'bg-purple-400'}`}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? 32 : 16,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

const SkillBadge = ({ skill, index, isDark, inView }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsVisible(true), index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        x: isVisible ? 0 : -20
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, x: 5 }}
      className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
        ${isDark ? 'hover:bg-purple-900/20' : 'hover:bg-purple-50'} cursor-pointer`}
    >
      <motion.div 
        className="relative"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>
      <span className={`${isDark ? 'text-secondary group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} 
        transition-colors duration-300 font-medium`}>
        {skill}
      </span>
    </motion.div>
  );
};

const About = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    "Full-Stack Web Development (React.js, Node.js, MongoDB)",
    "Frontend Engineering with HTML, CSS, Tailwind CSS, Bootstrap, and JavaScript",
    "Backend Development with REST APIs and Express.js",
    "Database Management using MySQL, PostgreSQL, and MongoDB",
    "Version Control & Collaboration with Git and GitHub",
    "Mobile App Development with Kotlin and Java (Android)",
    "Strong Foundation in Data Structures & Algorithms (Java)",
    "NPTEL Certified in Programming Fundamentals"
  ];

  return (
    <>
      <motion.div
        ref={ref}
        variants={textVariant()}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative overflow-hidden"
      >
        <motion.p 
          className={`${styles.sectionSubText} ${isDark ? 'text-secondary' : 'text-gray-600'} tracking-wider`}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Introduction
        </motion.p>
        
        <motion.h2 
          className={`${styles.sectionHeadText} ${isDark ? 'text-white' : 'text-gray-900'} relative`}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Overview.
          <motion.span
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "200px" } : { width: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </motion.h2>

        {/* Enhanced Background Decoration */}
        <div className="absolute top-[-60%] right-[-10%] w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-[-40%] right-[20%] w-96 h-96 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-bounce" 
             style={{ animationDuration: '6s' }} />
        <div className="absolute top-[-20%] right-[40%] w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </motion.div>

      {/* Enhanced introduction text */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative"
      >
        <motion.p
          className={`mt-6 text-[18px] max-w-4xl leading-[32px] ${
            isDark ? 'text-secondary' : 'text-gray-600'
          } relative z-10`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          I'm a dedicated full-stack web developer skilled in technologies like React, Node.js, and MongoDB. My current focus is on building scalable, user-friendly web applications. I also have experience in Android development using Kotlin, and a solid understanding of core programming concepts through my DSA knowledge in Java. I enjoy solving real-world problems and collaborating to bring impactful digital products to life.
        </motion.p>
      </motion.div>

      {/* Enhanced service cards - Amazing triangular layout */}
      <motion.div 
        className="mt-24 relative"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Central connecting lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="relative w-96 h-96"
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            {/* Connecting lines forming a triangle */}
            <div className={`absolute top-1/2 left-1/2 w-px h-32 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-0
              ${isDark ? 'bg-gradient-to-t from-purple-500/50 to-transparent' : 'bg-gradient-to-t from-purple-400/50 to-transparent'}`} />
            <div className={`absolute top-1/2 left-1/2 w-px h-32 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-120
              ${isDark ? 'bg-gradient-to-t from-purple-500/50 to-transparent' : 'bg-gradient-to-t from-purple-400/50 to-transparent'}`} />
            <div className={`absolute top-1/2 left-1/2 w-px h-32 origin-bottom transform -translate-x-1/2 -translate-y-full -rotate-120
              ${isDark ? 'bg-gradient-to-t from-purple-500/50 to-transparent' : 'bg-gradient-to-t from-purple-400/50 to-transparent'}`} />
            
            {/* Central pulse dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Cards arranged in triangular formation */}
        <div className="relative flex flex-col items-center space-y-12 lg:space-y-16">
          {/* Top card - Web Developer (centered) */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
          >
            <ServiceCard 
              key={services[0]?.title || "web"} 
              index={0} 
              isDark={isDark}
              {...services[0]}
            />
            {/* Floating label */}
            <motion.div
              className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider
                ${isDark ? 'bg-purple-900/80 text-purple-200 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-300'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              FRONTEND MASTER
            </motion.div>
          </motion.div>

          {/* Bottom two cards */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 xl:gap-32">
            {/* Left card - Android Developer */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -100, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
            >
              <ServiceCard 
                key={services[1]?.title || "android"} 
                index={1} 
                isDark={isDark}
                {...services[1]}
              />
              {/* Floating label */}
              <motion.div
                className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider
                  ${isDark ? 'bg-green-900/80 text-green-200 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-300'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                MOBILE EXPERT
              </motion.div>
            </motion.div>

            {/* Right card - Backend Developer */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 100 }}
            >
              <ServiceCard 
                key={services[2]?.title || "backend"} 
                index={2} 
                isDark={isDark}
                {...services[2]}
              />
              {/* Floating label */}
              <motion.div
                className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider
                  ${isDark ? 'bg-blue-900/80 text-blue-200 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              >
                SERVER WIZARD
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-purple-400/30' : 'bg-purple-300/40'}`}
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <h4 className={`text-lg font-semibold ${isDark ? 'text-purple-300' : 'text-purple-600'} mb-2`}>
            Full-Stack Development Trinity
          </h4>
          <p className={`text-sm ${isDark ? 'text-secondary' : 'text-gray-600'} max-w-lg mx-auto`}>
            Combining frontend artistry, mobile innovation, and backend power to create exceptional digital experiences
          </p>
        </motion.div>
      </motion.div>

      {/* Completely redesigned skills section */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className={`mt-24 relative overflow-hidden rounded-3xl ${
          isDark ? 'bg-gradient-to-br from-tertiary to-tertiary/50' : 'bg-gradient-to-br from-white to-gray-50'
        } shadow-2xl backdrop-blur-sm border ${isDark ? 'border-purple-500/20' : 'border-purple-200/50'}`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${isDark ? '#915eff' : '#915eff'} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mb-10"
          >
            <h3 className={`text-[28px] font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Technical Arsenal
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBadge 
                key={index}
                skill={skill}
                index={index}
                isDark={isDark}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");