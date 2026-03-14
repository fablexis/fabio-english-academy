import React from 'react';
import HeroBanner from '../components/HeroBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default HomePage;
