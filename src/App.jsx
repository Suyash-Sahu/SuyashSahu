import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  LoadingScreen,
  ScrollToTop,
  NotFound,
  ThemeToggle,
  Footer,
} from "./components";

const MainContent = () => {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <About />
      <Experience />
      <Tech />
      <div id="projects">
      <Works />
      </div>

      <div id="contact" className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
      <ScrollToTop />
      <ThemeToggle />
    </>
  );
};

const App = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className={`relative z-0 transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-white'}`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MainContent />
                  </motion.div>
                } 
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;