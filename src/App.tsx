import React from 'react';
import HeroBanner from './components/HeroBanner';
import WhyChooseUs from './components/WhyChooseUs';
import CoursesSection from './components/CoursesSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <WhyChooseUs />
      <CoursesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default App;
