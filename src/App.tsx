import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CoursesPage from './pages/CoursesPage';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import SplashLoader from './components/SplashLoader';
import WhatsAppFloat from './components/WhatsAppFloat';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/courses" element={<PageTransition><CoursesPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogDetailPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <WhatsAppFloat />
    </MotionConfig>
  );
};

export default App;
