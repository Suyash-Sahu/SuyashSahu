import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import { useTheme } from '../context/ThemeContext';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const techIcons = [
    { icon: '💻', label: 'Development' },
    { icon: '🚀', label: 'Innovation' },
    { icon: '⚛️', label: 'React' },
    { icon: '🎨', label: 'Design' },
    { icon: '📱', label: 'Mobile' },
    { icon: '⚡', label: 'Performance' },
    { icon: '🔥', label: 'Trending' },
    { icon: '✨', label: 'Magic' }
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: `${50 + mousePosition.x}% ${50 + mousePosition.y}%`,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        style={{
          background: isDark 
            ? `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, #2a1a4a 0%, #1a1a2e 30%, #050816 100%)`
            : `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, #f8f4ff 0%, #e8e2ff 30%, #ffffff 100%)`,
        }}
      />

      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
        style={{
          backgroundImage: isDark 
            ? `linear-gradient(rgba(145, 94, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 94, 255, 0.1) 1px, transparent 1px)`
            : `linear-gradient(rgba(145, 94, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 94, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Enhanced Floating Tech Icons */}
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-3xl ${isDark ? 'opacity-30' : 'opacity-40'} cursor-pointer group`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.8,
            rotate: Math.random() * 360
          }}
          animate={{
            x: [null, Math.random() * (window.innerWidth - 100)],
            y: [null, Math.random() * (window.innerHeight - 100)],
            rotate: [null, 360 + Math.random() * 360],
            scale: [0.8, 1.1, 0.8],
          }}
          whileHover={{
            scale: 1.5,
            opacity: isDark ? 0.8 : 1,
            transition: { duration: 0.2 }
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          title={item.label}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}

      {/* Parallax Content Container */}
      <motion.div 
        className={`${styles.paddingX} absolute inset-0 top-[80px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Enhanced Side Indicator */}
        <div className="flex flex-col justify-center items-center mt-5">
          <motion.div 
            className="w-5 h-5 rounded-full bg-gradient-to-r from-[#915eff] to-[#ff6b6b] shadow-lg"
            animate={{
              boxShadow: [
                '0 0 20px rgba(145, 94, 255, 0.5)',
                '0 0 30px rgba(145, 94, 255, 0.8)',
                '0 0 20px rgba(145, 94, 255, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915eff] via-[#ff6b6b] to-transparent"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Enhanced Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Greeting with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-lg font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="inline-block mr-2"
            >
              👋
            </motion.span>
            Welcome to my digital universe
          </motion.div>

          {/* Main Title with Enhanced Effects */}
          <h1 className={`${styles.heroHeadText} ${isDark ? 'text-white' : 'text-gray-900'} relative`}>
            <motion.span 
              className={isDark ? 'text-white' : 'text-gray-900'}
              animate={{
                textShadow: isDark 
                  ? ['0 0 10px rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.3)']
                  : ['0 0 10px rgba(0,0,0,0.1)', '0 0 20px rgba(0,0,0,0.2)', '0 0 10px rgba(0,0,0,0.1)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hi, I'm
            </motion.span>{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#915eff] via-[#ff6b6b] to-[#915eff] relative"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Suyash Sahu
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#915eff] to-[#ff6b6b] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              />
            </motion.span>
          </h1>

          {/* Enhanced Subtitle with Better Animation */}
          <motion.div 
            className={`${styles.heroSubText} mt-6 ${isDark ? 'text-white-100' : 'text-gray-700'} relative`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="text-[#915eff] text-xl"
              >
                ⚡
              </motion.div>
              <TypeAnimation
                sequence={[
                  'I craft beautiful web applications',
                  2500,
                  'I design intuitive user interfaces',
                  2500,
                  'I build interactive digital experiences',
                  2500,
                  'I create modern frontend solutions',
                  2500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-medium text-lg sm:text-2xl bg-gradient-to-r from-[#915eff] via-[#ff6b6b] to-[#915eff] bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(145,94,255,0.12)]"
                style={{
                  WebkitTextStroke: '0.2px #915eff', // More subtle outline
                  textShadow: '0 1px 4px rgba(145,94,255,0.12), 0 1px 0 #fff', // Softer shadow
                }}
              />
            </div>
            
            {/* Skills Pills */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {['React', 'JavaScript', 'UI/UX', 'Three.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className={`px-3 py-1 text-sm rounded-full ${
                    isDark 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  } backdrop-blur-sm`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: isDark ? 'rgba(145, 94, 255, 0.2)' : 'rgba(145, 94, 255, 0.1)',
                    borderColor: '#915eff'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Social Links */}
      <motion.div 
        className="fixed left-0 top-1/2 -translate-y-1/2 ml-4 flex flex-col gap-4 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="https://github.com/Suyash-Sahu" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.2, x: 8 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full ${
              isDark ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm flex items-center justify-center hover:bg-[#915eff]/30 transition-all duration-300 group relative border ${
              isDark ? 'border-white/20' : 'border-gray-200'
            }`}
            aria-label="GitHub"
          >
            <motion.i 
              className={`fab fa-github ${isDark ? 'text-white' : 'text-gray-900'} text-xl`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <span className={`absolute left-full ml-3 px-3 py-2 ${
              isDark ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm rounded-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            } text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border ${
              isDark ? 'border-white/20' : 'border-gray-200'
            }`}>
              Check my code
            </span>
          </motion.div>
        </a>
        <a href="https://www.linkedin.com/in/suyash-sahu-839195292/" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.2, x: 8 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full ${
              isDark ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm flex items-center justify-center hover:bg-[#915eff]/30 transition-all duration-300 group relative border ${
              isDark ? 'border-white/20' : 'border-gray-200'
            }`}
            aria-label="LinkedIn"
          >
            <motion.i 
              className={`fab fa-linkedin ${isDark ? 'text-white' : 'text-gray-900'} text-xl`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <span className={`absolute left-full ml-3 px-3 py-2 ${
              isDark ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm rounded-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            } text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border ${
              isDark ? 'border-white/20' : 'border-gray-200'
            }`}>
              Let's connect
            </span>
          </motion.div>
        </a>
      </motion.div>

      <ComputersCanvas />

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <a href="#about">
          <motion.div 
            className={`w-[35px] h-[64px] rounded-3xl border-4 ${
              isDark ? 'border-white/30' : 'border-gray-400'
            } flex justify-center items-start p-2 backdrop-blur-sm ${
              isDark ? 'bg-white/5' : 'bg-gray-100/50'
            }`}
            whileHover={{ 
              scale: 1.1,
              borderColor: '#915eff',
              boxShadow: '0 0 20px rgba(145, 94, 255, 0.3)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-b from-[#915eff] to-[#ff6b6b] mb-1 shadow-lg"
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;