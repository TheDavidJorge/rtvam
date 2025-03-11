
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import LatestNews from '@/components/home/LatestNews';
import SocialFeed from '@/components/home/SocialFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedPrograms />
        <LatestNews />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
