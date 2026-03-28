import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Award, Users, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
        <div className="container-max relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-primary/5 text-primary text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.4em] border border-primary/10"
              >
                The KAPU Story
              </motion.span>
              <h1 className="text-6xl md:text-[10rem] font-black text-text-primary leading-[0.8] tracking-tighter uppercase">
                Redefining <br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-primary drop-shadow-2xl inline-block"
                >
                  Tech Reselling
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xl md:text-2xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed opacity-80"
              >
                Sri Lanka's premier destination for high-end tech. We bridge the gap between premium global tech and local enthusiasts.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container-max mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[21/9] rounded-[4rem] overflow-hidden border border-border-light shadow-2xl group"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
            alt="KAPU Tech Office" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-text-primary/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 max-w-md text-white">
            <div className="w-16 h-1.5 bg-primary mb-6 rounded-full" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-primary">Our Headquarters</p>
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">Colombo, <br /> Sri Lanka</h3>
            <p className="text-white/60 mt-4 text-sm font-bold uppercase tracking-widest leading-relaxed">The heart of premium tech reselling in the island.</p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-bg-section py-32 border-y border-border-light overflow-hidden relative">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl"></div>
        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Happy Customers', value: '10,000+', icon: Users },
              { label: 'Products Sold', value: '25,000+', icon: Zap },
              { label: 'Tech Experts', value: '15+', icon: Cpu },
              { label: 'Global Brands', value: '50+', icon: Globe },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center space-y-4 group"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-primary shadow-xl shadow-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:-translate-y-2">
                  <stat.icon size={32} />
                </div>
                <div className="space-y-1">
                  <motion.p 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                    className="text-5xl font-black text-text-primary tracking-tighter uppercase"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">Our Mission</span>
                <h2 className="text-5xl md:text-8xl font-black text-text-primary uppercase tracking-tighter leading-[0.85]">Built by Enthusiasts, <br /> For Enthusiasts.</h2>
                <p className="text-xl text-text-secondary font-medium leading-relaxed">
                  Founded in Colombo, KAPU Tech started with a simple mission: to provide Sri Lankan gamers, creators, and professionals with access to genuine, high-performance tech components.
                </p>
              </div>
              <div className="space-y-6 text-text-secondary leading-relaxed font-medium">
                <p>What began as a small passion project among friends has grown into a trusted name in the Sri Lankan tech community. We understand the frustration of finding quality parts, and we're here to solve that.</p>
                <p>We don't just sell hardware; we sell reliability. Every product in our inventory undergoes rigorous testing to ensure it meets our "KAPU Standard" of excellence.</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/products" className="btn-primary inline-flex items-center gap-4 px-12 py-6 shadow-2xl shadow-primary/30">
                  Browse Collection
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-8 border-white relative z-10 group">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Tech Setup" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-bg-section border-y border-border-light">
        <div className="container-max">
          <div className="text-center mb-20 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">The KAPU Standard</span>
            <h2 className="text-5xl md:text-7xl font-black text-text-primary uppercase tracking-tighter">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: ShieldCheck, title: "100% Genuine", desc: "Every component is verified authentic and sourced directly from authorized distributors." },
              { icon: Target, title: "Expert Tested", desc: "Our tech experts rigorously test every product to ensure peak performance and reliability." },
              { icon: Award, title: "Local Warranty", desc: "Enjoy peace of mind with our comprehensive local warranty and dedicated support team." },
              { icon: Users, title: "Community Driven", desc: "We are built by tech enthusiasts who understand your needs and share your passion." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3.5rem] border border-border-light group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-bg-section rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={36} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-text-primary">{item.title}</h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-max section-padding">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-text-primary p-20 md:p-32 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] animate-pulse delay-700" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-6">Join the <br /> <span className="text-primary">Elite Community.</span></h2>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto text-xl font-medium leading-relaxed">Ready to upgrade your setup? Browse our curated collection of premium components today and experience the KAPU difference.</p>
            <Link to="/products" className="btn-primary inline-flex px-16 py-7 text-base shadow-2xl shadow-primary/40">
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
