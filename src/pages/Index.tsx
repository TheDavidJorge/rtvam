
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import LatestNews from '@/components/home/LatestNews';
import SocialFeed from '@/components/home/SocialFeed';
import FootballStandings from '@/components/home/FootballStandings';
import CurrencyExchange from '@/components/home/CurrencyExchange';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div className="py-12 bg-gradient-to-br from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-12">
                <FeaturedPrograms />
                <LatestNews />
              </div>
              <div className="space-y-8">
                <CurrencyExchange />
                <FootballStandings />
              </div>
            </div>
          </div>
        </div>
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
