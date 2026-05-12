import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      const NAVBAR_HEIGHT = 80;
      const top = contactSection.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else {
      // Navigate to contact page if not on home
      navigate('/contacto');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="wa-float wa-float--contact"
      aria-label="Contactar"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="wa-float__pulse" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
      <span className="wa-float__label">Contactar</span>
    </motion.button>
  );
}
