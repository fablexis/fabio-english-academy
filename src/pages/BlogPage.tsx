import React from 'react';
import Navbar from '../components/Navbar';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <BlogSection />
      <Footer />
    </>
  );
};

export default BlogPage;
