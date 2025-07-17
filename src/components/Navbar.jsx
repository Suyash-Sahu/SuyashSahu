import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
        ${scrolled ? 'backdrop-blur-md bg-primary/30' : 'bg-transparent'}
        ${isDark ? 'text-white' : 'text-gray-900'}
        transition-all duration-300`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <motion.img 
            src={logo} 
            alt='logo' 
            className='w-9 h-9 object-contain'
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
          <motion.p 
            className='text-[18px] font-bold cursor-pointer flex'
            whileHover={{ scale: 1.05 }}
          >
            Suyash &nbsp;
            <span className='sm:block hidden'> | Portfolio</span>
          </motion.p>
        </Link>

        {/* Desktop Navigation */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              className={`${
                active === link.title 
                  ? 'text-[#915eff]' 
                  : isDark ? 'text-white' : 'text-gray-900'
              } hover:text-[#915eff] text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </motion.li>
        </ul>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <motion.img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[32px] h-[32px] object-contain cursor-pointer p-1 rounded-md hover:bg-primary/10 transition'
            onClick={() => setToggle(!toggle)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`fixed inset-0 top-0 left-0 w-full h-full flex flex-col items-end z-50 bg-black/40 backdrop-blur-sm`}
                style={{ overscrollBehavior: 'contain' }}
              >
                <div className={`w-4/5 max-w-xs bg-white dark:bg-tertiary rounded-l-2xl shadow-2xl h-full p-8 flex flex-col gap-8 relative`}>
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/20 transition-colors"
                    onClick={() => setToggle(false)}
                    aria-label="Close menu"
                  >
                    <img src={close} alt="close" className="w-7 h-7" />
                  </button>
                  <ul className='list-none flex flex-col gap-6 mt-12'>
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.id}
                        className={`$${
                        active === link.title 
                          ? 'text-[#915eff]' 
                          : isDark ? 'text-white' : 'text-gray-900'
                        } font-poppins font-medium cursor-pointer text-[18px] py-3 px-2 rounded-lg hover:bg-primary/10 transition`}
                      onClick={() => {
                          setToggle(false);
                        setActive(link.title);
                      }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </motion.li>
                  ))}
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={toggleTheme}
                        className={`flex items-center gap-2 w-full py-3 px-2 rounded-lg hover:bg-primary/10 transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    >
                      {isDark ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </motion.li>
                </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
