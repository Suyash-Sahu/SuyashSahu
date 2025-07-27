import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with environment variable
// Replace 'YOUR_EMAILJS_PUBLIC_KEY' with your actual EmailJS public key
// You can get this from your EmailJS dashboard
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY");

// Enhanced 3D Holographic Ring Component
// Remove or comment out the unused HolographicRing and ContactInfoCard
// const HolographicRing = ({ mousePosition }) => {
//   const ringRef = useRef();
//   const particlesRef = useRef();
//   const innerRingRef = useRef();
//   const textRef = useRef();
  
//   // Create dynamic particle system
//   const particleCount = 200;
//   const particles = useMemo(() => {
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
    
//     for (let i = 0; i < particleCount; i++) {
//       // Create spiral pattern
//       const radius = 2 + Math.random() * 3;
//       const angle = (i / particleCount) * Math.PI * 4;
//       const height = (Math.random() - 0.5) * 4;
      
//       positions[i * 3] = Math.cos(angle) * radius;
//       positions[i * 3 + 1] = height;
//       positions[i * 3 + 2] = Math.sin(angle) * radius;
      
//       // Purple to white gradient colors
//       const intensity = Math.random();
//       colors[i * 3] = 0.57 + intensity * 0.43; // R
//       colors[i * 3 + 1] = 0.37 + intensity * 0.63; // G  
//       colors[i * 3 + 2] = 1; // B
//     }
//     return { positions, colors };
//   }, []);

//   useFrame((state) => {
//     const time = state.clock.elapsedTime;
    
//     // Main ring animation
//     if (ringRef.current) {
//       ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
//       ringRef.current.rotation.y += 0.008;
//       ringRef.current.rotation.z = Math.cos(time * 0.15) * 0.2;
      
//       // Mouse interaction
//       if (mousePosition) {
//         const rotationX = (mousePosition.y - 0.5) * 0.5;
//         const rotationZ = (mousePosition.x - 0.5) * 0.5;
//         ringRef.current.rotation.x += rotationX * 0.03;
//         ringRef.current.rotation.z += rotationZ * 0.03;
//       }
//     }
    
//     // Inner ring counter-rotation
//     if (innerRingRef.current) {
//       innerRingRef.current.rotation.y -= 0.012;
//       innerRingRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
//     }
    
//     // Animate particles in orbital motion
//     if (particlesRef.current) {
//       const positions = particlesRef.current.geometry.attributes.position.array;
      
//       for (let i = 0; i < particleCount; i++) {
//         const i3 = i * 3;
//         const radius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
//         const angle = Math.atan2(positions[i3 + 2], positions[i3]) + 0.01;
        
//         positions[i3] = Math.cos(angle) * radius;
//         positions[i3 + 1] += Math.sin(time * 2 + i * 0.1) * 0.002;
//         positions[i3 + 2] = Math.sin(angle) * radius;
//       }
//       particlesRef.current.geometry.attributes.position.needsUpdate = true;
//     }
    
//     // Floating text animation
//     if (textRef.current) {
//       textRef.current.position.y = Math.sin(time * 0.5) * 0.1;
//       textRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
//     }
//   });

//   return (
//     <group>
//       {/* Main Holographic Ring */}
//       <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
//         <group ref={ringRef}>
//           <mesh scale={[3, 3, 3]}>
//             <torusGeometry args={[1, 0.05, 16, 100]} />
//             <meshStandardMaterial
//               color="#915eff"
//               emissive="#915eff"
//               emissiveIntensity={0.4}
//               transparent
//               opacity={0.8}
//               wireframe={false}
//             />
//           </mesh>
          
//           {/* Inner Ring */}
//           <group ref={innerRingRef}>
//             <mesh scale={[2, 2, 2]}>
//               <torusGeometry args={[1, 0.02, 12, 80]} />
//               <meshStandardMaterial
//                 color="#ffffff"
//                 emissive="#ffffff"
//                 emissiveIntensity={0.3}
//                 transparent
//                 opacity={0.6}
//               />
//             </mesh>
//           </group>
//         </group>
//       </Float>
      
//       {/* Orbiting Energy Spheres */}
//       <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
//         <mesh position={[4, 0, 0]}>
//           <sphereGeometry args={[0.15, 16, 16]} />
//           <meshStandardMaterial 
//             color="#915eff" 
//             emissive="#915eff" 
//             emissiveIntensity={0.5}
//             transparent
//             opacity={0.9}
//           />
//         </mesh>
//       </Float>
      
//       <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
//         <mesh position={[-4, 1.5, 0]}>
//           <sphereGeometry args={[0.12, 16, 16]} />
//           <meshStandardMaterial 
//             color="#ffffff" 
//             emissive="#ffffff" 
//             emissiveIntensity={0.4}
//             transparent
//             opacity={0.8}
//           />
//         </mesh>
//       </Float>
      
//       <Float speed={2.5} rotationIntensity={0.25} floatIntensity={0.6}>
//         <mesh position={[0, -4, 3]}>
//           <sphereGeometry args={[0.18, 16, 16]} />
//           <meshStandardMaterial 
//             color="#7c3aed" 
//             emissive="#7c3aed" 
//             emissiveIntensity={0.4}
//             transparent
//             opacity={0.85}
//           />
//         </mesh>
//       </Float>
      
//       {/* Dynamic Particle System */}
//       <points ref={particlesRef}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             array={particles.positions}
//             count={particleCount}
//             itemSize={3}
//           />
//           <bufferAttribute
//             attach="attributes-color"
//             array={particles.colors}
//             count={particleCount}
//             itemSize={3}
//           />
//         </bufferGeometry>
//         <pointsMaterial 
//           size={0.03} 
//           vertexColors
//           transparent 
//           opacity={0.8}
//           blending={THREE.AdditiveBlending}
//         />
//       </points>
      
//       {/* Floating Contact Text */}
//       <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
//         <Text
//           ref={textRef}
//           position={[0, 0, 0]}
//           fontSize={0.3}
//           color="#915eff"
//           anchorX="center"
//           anchorY="middle"
//           font="/fonts/helvetiker_regular.typeface.json"
//         >
//           GET IN TOUCH
//         </Text>
//       </Float>
      
//       {/* Advanced Lighting Setup */}
//       <ambientLight intensity={0.4} />
//       <pointLight position={[10, 10, 10]} intensity={1.2} color="#915eff" />
//       <pointLight position={[-10, -5, -10]} intensity={0.8} color="#ffffff" />
//       <spotLight
//         position={[0, 20, 0]}
//         angle={0.3}
//         penumbra={1}
//         intensity={0.5}
//         color="#7c3aed"
//         target-position={[0, 0, 0]}
//       />
//     </group>
//   );
// };

// Enhanced Contact Form with better animations
const ContactForm = ({ isDark }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef();

  const validateForm = () => {
    const errors = {};
    if (!formData.user_name.trim()) errors.user_name = 'Name is required';
    if (!formData.user_email.trim()) errors.user_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.user_email)) errors.user_email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setIsSubmitting(true);
    
    try {
      
      const result = await emailjs.sendForm(
        // Replace with your EmailJS service ID from environment variable
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        // Replace with your EmailJS template ID from environment variable  
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current
      );
      
      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ user_name: '', user_email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormErrors({
        submit: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl text-center font-medium shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🚀</span>
              <span>Message sent successfully! I'll get back to you soon.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {formErrors.submit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-red-500 text-white p-6 rounded-xl text-center font-medium shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">⚠️</span>
            <span>{formErrors.submit}</span>
          </div>
        </motion.div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('user_name')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-transparent
              ${focusedField === 'user_name' || formData.user_name
                ? 'border-[#915eff] shadow-[0_0_25px_rgba(145,94,255,0.3)]' 
                : formErrors.user_name
                ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                : isDark ? 'border-gray-600' : 'border-gray-300'
              }
              ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
              focus:outline-none`}
            placeholder=" "
          />
          <motion.label
            className={`absolute left-6 transition-all duration-300 pointer-events-none
              ${formData.user_name || focusedField === 'user_name'
                ? `-top-3 text-sm px-2 text-[#915eff] font-medium
                   ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`
                : 'top-4 text-gray-500'
              }`}
            animate={{
              scale: formData.user_name || focusedField === 'user_name' ? 0.9 : 1,
              y: formData.user_name || focusedField === 'user_name' ? -2 : 0
            }}
          >
            Your Name ✨
          </motion.label>
          {formErrors.user_name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{formErrors.user_name}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('user_email')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-transparent
              ${focusedField === 'user_email' || formData.user_email
                ? 'border-[#915eff] shadow-[0_0_25px_rgba(145,94,255,0.3)]' 
                : formErrors.user_email
                ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                : isDark ? 'border-gray-600' : 'border-gray-300'
              }
              ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
              focus:outline-none`}
            placeholder=" "
          />
          <motion.label
            className={`absolute left-6 transition-all duration-300 pointer-events-none
              ${formData.user_email || focusedField === 'user_email'
                ? `-top-3 text-sm px-2 text-[#915eff] font-medium
                   ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`
                : 'top-4 text-gray-500'
              }`}
            animate={{
              scale: formData.user_email || focusedField === 'user_email' ? 0.9 : 1,
              y: formData.user_email || focusedField === 'user_email' ? -2 : 0
            }}
          >
            Your Email 📧
          </motion.label>
          {formErrors.user_email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{formErrors.user_email}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows={6}
            className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-transparent resize-none
              ${focusedField === 'message' || formData.message
                ? 'border-[#915eff] shadow-[0_0_25px_rgba(145,94,255,0.3)]' 
                : formErrors.message
                ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                : isDark ? 'border-gray-600' : 'border-gray-300'
              }
              ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
              focus:outline-none`}
            placeholder=" "
          />
          <motion.label
            className={`absolute left-6 transition-all duration-300 pointer-events-none
              ${formData.message || focusedField === 'message'
                ? `-top-3 text-sm px-2 text-[#915eff] font-medium
                   ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`
                : 'top-4 text-gray-500'
              }`}
            animate={{
              scale: formData.message || focusedField === 'message' ? 0.9 : 1,
              y: formData.message || focusedField === 'message' ? -2 : 0
            }}
          >
            Your Message 💬
          </motion.label>
          {formErrors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center space-x-1"
            >
              <span>⚠️</span>
              <span>{formErrors.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 px-8 rounded-xl font-bold text-white text-lg
            bg-gradient-to-r from-[#915eff] via-[#7c3aed] to-[#915eff] 
            hover:from-[#7c3aed] hover:via-[#915eff] hover:to-[#7c3aed]
            transform transition-all duration-500 
            hover:scale-105 hover:shadow-[0_15px_40px_rgba(145,94,255,0.5)]
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
            relative overflow-hidden group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="relative z-10 flex items-center justify-center space-x-3">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Sending your message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </>
            )}
          </span>
          
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
            style={{ transform: 'skewX(-12deg) translateX(-100%)' }}
            whileHover={{ translateX: '200%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.button>
      </form>
    </motion.div>
  );
};

// Floating Contact Info Cards with enhanced animations
// Remove or comment out the unused HolographicRing and ContactInfoCard
// const ContactInfoCard = ({ icon, title, info, link, isDark, delay, position }) => (
//   <motion.a
//     href={link}
//     target="_blank"
//     rel="noopener noreferrer"
//     className={`absolute ${position} block p-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 group hover:scale-110 z-10
//       ${isDark 
//         ? 'bg-gray-900/40 border-gray-700/60 hover:border-[#915eff] hover:bg-gray-900/60' 
//         : 'bg-white/40 border-gray-200/60 hover:border-[#915eff] hover:bg-white/60'
//       }
//       hover:shadow-[0_15px_35px_rgba(145,94,255,0.3)]`}
//     initial={{ opacity: 0, scale: 0.8, y: 20 }}
//     animate={{ opacity: 1, scale: 1, y: 0 }}
//     transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
//     whileHover={{ 
//       y: -5,
//       transition: { duration: 0.2 }
//     }}
//   >
//     <div className="flex items-center space-x-3">
//       <motion.div 
//         className="p-2 rounded-xl bg-gradient-to-br from-[#915eff] to-[#7c3aed] text-white text-lg"
//         whileHover={{ rotate: 360, scale: 1.1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {icon}
//       </motion.div>
//       <div>
//         <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
//           {title}
//         </h3>
//         <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//           {info}
//         </p>
//       </div>
//     </div>
//   </motion.a>
// );

// Main Contact Section Component
const ContactSection = ({ isDark = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section 
      className={`relative min-h-screen py-20 overflow-hidden
        ${isDark 
          ? 'bg-gradient-to-br from-[#1a1a1a] via-[#2d1b69] to-[#050816]' 
          : 'bg-gradient-to-br from-[#f0f0f0] via-[#e8d5ff] to-[#ffffff]'
        }`}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20
            ${isDark ? 'bg-[#915eff]' : 'bg-[#915eff]'}`}
          animate={{
            x: mousePosition.x * 100 - 50,
            y: mousePosition.y * 100 - 50,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { duration: 2, ease: "easeOut" },
            y: { duration: 2, ease: "easeOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-15
            ${isDark ? 'bg-[#7c3aed]' : 'bg-[#7c3aed]'}`}
          animate={{
            x: -mousePosition.x * 80 + 40,
            y: -mousePosition.y * 80 + 40,
            scale: [1, 0.9, 1],
          }}
          transition={{
            x: { duration: 2.5, ease: "easeOut" },
            y: { duration: 2.5, ease: "easeOut" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#915eff] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className={`text-sm uppercase tracking-widest font-medium mb-6
              ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get in touch
          </motion.p>
          <motion.h2
            className={`text-5xl md:text-7xl font-bold mb-8
              ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            Contact<motion.span 
              className="text-[#915eff]"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 10px rgba(145,94,255,0.5)',
                  '0 0 20px rgba(145,94,255,0.8)',
                  '0 0 10px rgba(145,94,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >.</motion.span>
          </motion.h2>
          <motion.p
            className={`text-xl max-w-3xl mx-auto leading-relaxed
              ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to bring your ideas to life? Let's collaborate and create something 
            <motion.span 
              className="text-[#915eff] font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            > extraordinary </motion.span>
            together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Enhanced 3D Scene */}
          

          {/* Enhanced Contact Form Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className={`p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl
              ${isDark 
                ? 'bg-gray-900/20 border-gray-700/30' 
                : 'bg-white/20 border-gray-200/30'
              }`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Let's work together
                </h3>
                <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Have a project in mind? I'd love to hear about it!
                </p>
              </motion.div>
              
              <ContactForm isDark={isDark} />
            </div>
          </motion.div>
        </div>

        

        

        {/* Scroll indicator at bottom */}
        
      </div>
    </section>
  );
};

export default ContactSection;