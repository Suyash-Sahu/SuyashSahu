import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CursorEffect = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [magneticElement, setMagneticElement] = useState(null);
  const [ripples, setRipples] = useState([]);

  // Spring animation for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Handle cursor movement with spring physics
  useEffect(() => {
    x.set(mousePosition.x);
    y.set(mousePosition.y);
  }, [mousePosition, x, y]);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });

    // Handle magnetic effect
    if (magneticElement) {
      const rect = magneticElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 100) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const force = (100 - distance) / 2;
        magneticElement.style.transform = `translate(${Math.cos(angle) * force}px, ${
          Math.sin(angle) * force
        }px)`;
      } else {
        magneticElement.style.transform = '';
      }
    }
  }, [magneticElement]);

  const createRipple = useCallback((x, y) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const mouseMove = (e) => handleMouseMove(e);
    const mouseDown = (e) => {
      setIsClicking(true);
      createRipple(e.clientX, e.clientY);
    };
    const mouseUp = () => setIsClicking(false);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), [data-magnetic]'
      );

      interactiveElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const text = element.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
          const variant = element.getAttribute('data-cursor-variant');
          if (variant) setCursorVariant(variant);
          if (element.hasAttribute('data-magnetic')) {
            setMagneticElement(element);
          }
        });

        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
          setCursorVariant('default');
          if (magneticElement === element) {
            setMagneticElement(null);
            element.style.transform = '';
          }
        });
      });
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      observer.disconnect();
    };
  }, [handleMouseMove, createRipple, magneticElement]);

  const variants = {
    default: {
      height: 32,
      width: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      mixBlendMode: isDark ? 'difference' : 'normal',
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: '#915eff',
      mixBlendMode: 'normal',
    },
    button: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
      mixBlendMode: isDark ? 'difference' : 'normal',
    },
    link: {
      height: 48,
      width: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: '#915eff',
      mixBlendMode: 'normal',
    },
    image: {
      height: 100,
      width: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      backgroundColor: 'transparent',
      border: '2px solid #915eff',
      mixBlendMode: 'normal',
    },
    video: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: 'rgba(145, 94, 255, 0.2)',
      border: '2px solid #915eff',
      mixBlendMode: 'normal',
    },
    drag: {
      height: 100,
      width: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      backgroundColor: 'rgba(145, 94, 255, 0.1)',
      border: '2px dashed #915eff',
      mixBlendMode: 'normal',
    },
    slider: {
      height: 40,
      width: 40,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      backgroundColor: '#915eff',
      borderRadius: '4px',
      mixBlendMode: 'normal',
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor-main fixed top-0 left-0 rounded-full pointer-events-none z-50"
        animate={{
          ...variants[cursorVariant],
          scale: isClicking ? 0.8 : 1,
        }}
        transition={spring}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={spring}
        />

        {/* Cursor ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
            opacity: isHovering ? 1 : 0,
          }}
          transition={spring}
        />
      </motion.div>

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-40 rounded-full"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor text */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className={`fixed pointer-events-none z-50 text-sm font-medium
              ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              x: mousePosition.x + 16,
              y: mousePosition.y + 16,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={spring}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic effect area */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-40"
        animate={{
          background: isHovering
            ? isDark
              ? 'radial-gradient(600px at center, rgba(255,255,255,0.03), transparent 80%)'
              : 'radial-gradient(600px at center, rgba(0,0,0,0.03), transparent 80%)'
            : 'none',
        }}
        style={{
          left: mousePosition.x - window.innerWidth / 2,
          top: mousePosition.y - window.innerHeight / 2,
        }}
      />

      {/* Global styles */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        iframe, .cursor-default {
          cursor: auto !important;
        }

        .cursor-hover {
          cursor: none;
        }

        .cursor-main {
          mix-blend-mode: ${isDark ? 'difference' : 'normal'};
          pointer-events: none;
          will-change: transform;
        }

        [data-magnetic] {
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </>
  );
};

export default CursorEffect;
