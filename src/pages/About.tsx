import React from 'react';
import { Award, Users, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary mb-8">
          We Are <span className="text-primary">KAPU TECH</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          Sri Lanka's premier destination for high-performance tech components. We are a team of tech enthusiasts dedicated to bringing the world's best hardware to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-border-light aspect-square md:aspect-auto md:h-[600px]">
          <img 
            src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800" 
            alt="Our Story" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Our <span className="text-primary">Story</span></h2>
            <p className="text-text-secondary font-medium leading-loose">
              Founded in 2023, KAPU Tech started with a simple mission: to bridge the gap between global tech innovation and Sri Lankan enthusiasts. We noticed that getting high-quality, genuine tech components with reliable warranty was a challenge in our local market.
            </p>
            <p className="text-text-secondary font-medium leading-loose">
              Today, we serve thousands of gamers, creators, and professionals across the island, providing them with the tools they need to build their dream setups.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-black">1000+</h4>
              <p className="text-xs text-text-secondary font-black uppercase tracking-widest">Happy Customers</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-black">100%</h4>
              <p className="text-xs text-text-secondary font-black uppercase tracking-widest">Genuine Products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-section rounded-[4rem] p-12 md:p-24 border border-border-light">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Why Choose <span className="text-primary">Us?</span></h2>
          <p className="text-text-secondary font-medium">The KAPU Tech advantage.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-border-light space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black">Local Warranty</h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed">We don't just sell products; we stand by them. All our items come with official local warranty support.</p>
          </div>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-border-light space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-black">Fast Delivery</h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed">Our logistics network ensures that your gear reaches you within 24-48 hours, anywhere in Sri Lanka.</p>
          </div>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-border-light space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-black">Expert Support</h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed">Our team consists of tech experts who can help you choose the right components for your specific needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
