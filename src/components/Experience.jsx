import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

const FloatingOrb = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full"
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, -120, 0],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 0.5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }}
    />
  );
};

const TechIcon = ({ icon, delay, index }) => {
  return (
    <motion.div
      className="absolute text-2xl"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: [180, 0, 0, -180],
        x: [0, Math.sin(index) * 100, Math.sin(index + 1) * 150, 0],
        y: [0, Math.cos(index) * 80, Math.cos(index + 1) * 120, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );
};

const ExperienceCard = ({ experience, index, isActive, onHover, scrollProgress }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const y = useTransform(scrollProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -100 : 100,
      y: 50,
      scale: 0.8,
      rotateY: index % 2 === 0 ? -15 : 15,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.3,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateX: 5,
      boxShadow: "0 25px 50px -12px rgba(145, 94, 255, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const glowVariants = {
    initial: { 
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.5, 2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${index % 2 === 0 ? 'ml-20' : 'mr-20 ml-auto'} max-w-lg`}
      style={{ y, opacity, scale }}
    >
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <FloatingOrb key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#915eff]/20 to-purple-400/20 rounded-3xl blur-xl"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
      />

      <motion.div 
        className={`relative flex flex-col rounded-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border border-gray-700/50' 
            : 'bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95 border border-gray-200/50'
        } backdrop-blur-xl p-8 overflow-hidden group cursor-pointer transform-gpu`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => {
          setIsHovered(true);
          onHover(index);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          onHover(null);
        }}
      >
        {/* Animated mesh gradient background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #915eff 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #915eff 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, purple 0%, transparent 50%)
            `
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Tech icons floating around */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['💻', '🚀', '⚛️', '🔧'].map((icon, i) => (
            <TechIcon key={i} icon={icon} delay={i * 1.5} index={i} />
          ))}
        </div>

        {/* Timeline connector with animated flow */}
        <motion.div 
          className={`absolute ${index % 2 === 0 ? '-left-16' : '-right-16'} top-1/2 w-16 h-0.5 bg-gradient-to-r from-[#915eff] to-purple-400`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5
            }}
          />
        </motion.div>

        {/* Pulsing timeline dot */}
        <motion.div 
          className={`absolute ${index % 2 === 0 ? '-left-[73px]' : '-right-[73px]'} top-1/2 w-6 h-6 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full border-4 ${isDark ? 'border-gray-900' : 'border-white'} z-10`}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            boxShadow: isActive 
              ? ['0 0 0 0 rgba(145, 94, 255, 0.7)', '0 0 0 20px rgba(145, 94, 255, 0)', '0 0 0 0 rgba(145, 94, 255, 0.7)']
              : '0 0 0 0 rgba(145, 94, 255, 0.4)'
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10">
          {/* Header with morphing effects */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 + 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#915eff] via-purple-400 to-[#915eff] bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100"
              style={{
                backgroundSize: '200% auto',
                backgroundPosition: '0% center'
              }}
              whileHover={{
                backgroundPosition: '100% center',
              }}
              transition={{ duration: 0.5 }}
            >
              {experience.title}
            </motion.h3>
            
            <motion.div 
              className="flex items-center space-x-3 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 + 0.7 }}
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-secondary text-lg font-semibold">
                {experience.company_name}
              </p>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3 + 0.8 }}
            >
              <motion.span
                className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#915eff]/20 to-purple-400/20 border border-[#915eff]/30 text-[#915eff] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {experience.date}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Experience points with stagger animation */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3 + 0.9 }}
          >
            {experience.points.map((point, pointIndex) => (
              <motion.div
                key={pointIndex}
                className="flex items-start space-x-3 group/point"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 + 1 + pointIndex * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full mt-2 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.5,
                    boxShadow: "0 0 10px rgba(145, 94, 255, 0.5)"
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: pointIndex * 0.3
                  }}
                />
                <motion.p 
                  className="text-sm leading-relaxed text-secondary group-hover/point:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {point}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive corner accents */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#915eff]/10 to-transparent rounded-bl-3xl"
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-tr-3xl"
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const { isDark } = useTheme();
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const timelineScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto-cycle through cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % experiences.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1
      }
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-screen">
      {/* Animated background with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-[#915eff]/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-l from-purple-400/20 to-[#915eff]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#915eff]/10 to-purple-400/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#915eff] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header with advanced animations */}
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center mb-20"
      >
        <motion.p 
          className={`${styles.sectionSubText} mb-4`}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 20px rgba(145, 94, 255, 0.5)"
          }}
        >
          WHAT I HAVE DONE SO FAR
        </motion.p>
        
        <motion.h2 
          className={`${styles.sectionHeadText} bg-gradient-to-r from-[#915eff] via-purple-400 to-[#915eff] bg-clip-text text-transparent`}
          style={{
            backgroundSize: '200% auto',
          }}
          animate={{
            backgroundPosition: ['0% center', '100% center', '0% center'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ 
            scale: 1.02,
            filter: "drop-shadow(0 0 20px rgba(145, 94, 255, 0.3))"
          }}
        >
          Work Experience.
        </motion.h2>
      </motion.div>

      {/* Main timeline container */}
      <div className="relative">
        {/* Central timeline with advanced effects */}
        <motion.div 
          ref={timelineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#915eff] via-purple-400 to-[#915eff] origin-top"
          style={{ 
            height: `${experiences.length * 300}px`,
            scaleY: timelineScale
          }}
        >
          {/* Flowing energy effect */}
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-b from-white/50 via-transparent to-white/50"
            animate={{
              y: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Pulsing nodes */}
          {experiences.map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full border-2 border-white"
              style={{ top: `${(index + 1) * 300 - 150}px` }}
              animate={{
                scale: activeCard === index ? [1, 1.5, 1] : 1,
                boxShadow: activeCard === index 
                  ? ['0 0 0 0 rgba(145, 94, 255, 0.7)', '0 0 0 30px rgba(145, 94, 255, 0)']
                  : '0 0 0 0 rgba(145, 94, 255, 0.4)'
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Experience cards */}
        <div className="relative space-y-40 py-20">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index}
              experience={experience} 
              index={index}
              isActive={hoveredCard === index || activeCard === index}
              onHover={setHoveredCard}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Interactive navigation */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 100 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col space-y-4">
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-[#915eff] transition-all duration-300 ${
                activeCard === index ? 'bg-[#915eff] scale-125' : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={activeCard === index ? {
                boxShadow: ['0 0 0 0 rgba(145, 94, 255, 0.4)', '0 0 0 15px rgba(145, 94, 255, 0)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");