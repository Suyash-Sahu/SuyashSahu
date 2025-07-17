import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { logo } from '../assets';

const LoadingScreen = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
        isDark ? 'bg-primary' : 'bg-white'
      }`}
    >
      {/* Logo Animation */}
      <motion.div
        variants={itemVariants}
        className="relative mb-8"
      >
        <motion.img
          src={logo}
          alt="logo"
          className="w-24 h-24 object-contain"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Circular Progress */}
        <motion.div
          className="absolute inset-0 border-4 border-t-[#915eff] border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        variants={itemVariants}
        className={`text-2xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        Loading
        <motion.span
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ...
        </motion.span>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        variants={itemVariants}
        className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-[#915eff]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Loading Message */}
      <motion.p
        variants={itemVariants}
        className={`mt-4 text-sm ${
          isDark ? 'text-secondary' : 'text-gray-600'
        }`}
      >
        Preparing something amazing for you...
      </motion.p>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
