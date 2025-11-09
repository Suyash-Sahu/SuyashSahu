import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { useTheme } from '../context/ThemeContext';

const FloatingParticle = ({ delay = 0, index }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-[#915eff] to-purple-400 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        x: [0, Math.cos(index) * 200, Math.sin(index + 1) * 150, 0],
        y: [0, Math.sin(index) * 150, Math.cos(index + 1) * 200, 0],
        rotate: [0, 360, 720, 1080],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const TechOrb = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="absolute opacity-20"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  );
};

const TechCard = ({ name, icon, isDark, index, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateX: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const glowVariants = {
    initial: {
      boxShadow: "0 0 0 0 rgba(145, 94, 255, 0)",
    },
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(145, 94, 255, 0.4)",
        "0 0 0 20px rgba(145, 94, 255, 0)",
        "0 0 0 40px rgba(145, 94, 255, 0)"
      ],
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
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="w-40 h-48 relative group cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onClick={() => setIsActive(!isActive)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Floating particles around card */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {isHovered && [...Array(8)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.1} index={i} />
        ))}
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
      />

      {/* Main card */}
      <motion.div
        className={`w-full h-full rounded-2xl ${
          isDark
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border border-gray-700/50'
            : 'bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95 border border-gray-200/50'
        } backdrop-blur-xl p-6 flex flex-col items-center justify-center relative overflow-hidden transform-gpu`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #915eff 0%, transparent 70%),
              radial-gradient(circle at 70% 70%, purple 0%, transparent 70%)
            `
          }}
          animate={{
            rotate: isHovered ? 180 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Icon container with 3D effect */}
        <motion.div
          className="relative mb-4"
          animate={{
            rotateY: isHovered ? [0, 360] : 0,
          }}
          transition={{ duration: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="w-16 h-16 relative"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={icon}
              alt={name}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />

            {/* Icon glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#915eff]/20 to-purple-400/20 rounded-full blur-xl"
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1,
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Tech name with typing effect */}
        <motion.h3
          className="text-center text-lg font-bold bg-gradient-to-r from-[#915eff] to-purple-400 bg-clip-text text-transparent mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {name}
        </motion.h3>

        {/* (Skill/proficiency removed by request) */}

        {/* Interactive elements */}
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-[#915eff] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: dot * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#915eff]/10 to-purple-400/10 rounded-2xl opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating tooltip (kept but empty — you can populate if needed) */}
      <motion.div
        className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-xl z-10 whitespace-nowrap`}
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm font-medium text-[#915eff]"></p>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-inherit border-l border-t border-gray-300 rotate-45" />
      </motion.div>
    </motion.div>
  );
};

const TechStats = ({ isDark }) => {
  const stats = [
    { label: 'Technologies Learned', value: 10, suffix: '+' },
    { label: 'Projects Built', value: 8, suffix: '+' },
    { label: 'Internship Experience', value: 1, suffix: '' },
    { label: 'Frameworks & Tools', value: 6, suffix: '+' }
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`text-center p-4 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border border-gray-300/20`}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-[#915eff] to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 1.2, type: "spring" }}
          >
            {stat.value}{stat.suffix}
          </motion.div>
          <p className="text-sm text-secondary mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Tech = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const categories = ['all'];

  // Add category metadata to technologies (customize if needed)
  const enhancedTechnologies = technologies.map((tech, index) => ({
    ...tech,
    category: ['frontend', 'backend', 'tools', 'mobile'][index % 4],
  }));

  const filteredTech = selectedCategory === 'all'
    ? enhancedTechnologies
    : enhancedTechnologies.filter(tech => tech.category === selectedCategory);

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
      {/* Animated background with tech orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <TechOrb delay={0}>
          <div className="text-6xl">💻</div>
        </TechOrb>
        <TechOrb delay={2}>
          <div className="text-4xl absolute top-1/4 right-1/4">🚀</div>
        </TechOrb>
        <TechOrb delay={4}>
          <div className="text-5xl absolute bottom-1/4 left-1/4">⚛️</div>
        </TechOrb>
        <TechOrb delay={6}>
          <div className="text-3xl absolute top-3/4 right-1/3">🔧</div>
        </TechOrb>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-[#915eff]/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-l from-purple-400/10 to-[#915eff]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Header section */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center mb-12"
      >
        <motion.p
          className={`${styles.sectionSubText} mb-4`}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 20px rgba(145, 94, 255, 0.5)"
          }}
        >
          MY TECH ARSENAL
        </motion.p>

        <motion.h2
          className={`${styles.sectionHeadText} bg-gradient-to-r from-[#915eff] via-purple-400 to-[#915eff] bg-clip-text text-transparent mb-6`}
          style={{ backgroundSize: '200% auto' }}
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
          Technologies.
        </motion.h2>

        <motion.p
          className="mt-4 text-secondary text-[17px] max-w-3xl mx-auto leading-[30px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A curated collection of cutting-edge technologies I leverage to build exceptional digital experiences.
        </motion.p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        className="flex justify-center space-x-4 mb-12 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#915eff] to-purple-400 text-white'
                : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Tech cards grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center relative z-10"
        layout
      >
        {filteredTech.map((technology, index) => (
          <TechCard
            key={`${technology.name}-${selectedCategory}`}
            index={index}
            isDark={isDark}
            {...technology}
          />
        ))}
      </motion.div>

      {/* Tech stats */}
      <TechStats isDark={isDark} />

      {/* Interactive background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#915eff] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
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
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
