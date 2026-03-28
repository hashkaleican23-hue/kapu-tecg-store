import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, ChevronRight, Globe, Zap } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { cn } from '../utils';

export default function ContactUs() {
  const [whatsappNumber, setWhatsappNumber] = useState('94729399609');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWhatsappNumber(docSnap.data().whatsappNumber);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
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
                Contact Us
              </motion.span>
              <h1 className="text-6xl md:text-[10rem] font-black text-text-primary leading-[0.8] tracking-tighter uppercase">
                Get in <br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-primary drop-shadow-2xl inline-block"
                >
                  Touch
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xl md:text-2xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed opacity-80"
              >
                Have a question about a product or an order? Our tech experts are ready to assist you with personalized support.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            {[
              { 
                icon: Phone, 
                title: "Call Us", 
                desc: "Direct line for urgent inquiries and quick support.", 
                value: `+${whatsappNumber.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`,
                link: `tel:+${whatsappNumber}`,
                color: "text-primary",
                bg: "bg-primary/5"
              },
              { 
                icon: MessageCircle, 
                title: "WhatsApp", 
                desc: "Fastest way to get support and product inquiries.", 
                value: "Chat on WhatsApp",
                link: `https://wa.me/${whatsappNumber}`,
                color: "text-green-500",
                bg: "bg-green-50/50"
              },
              { 
                icon: Clock, 
                title: "Business Hours", 
                desc: "We are available during these hours for support.", 
                value: "Mon - Sat: 9AM - 8PM",
                link: null,
                color: "text-orange-500",
                bg: "bg-orange-50/50"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] border border-border-light group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500", item.bg, item.color)}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-text-primary">{item.title}</h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed mb-6">{item.desc}</p>
                {item.link ? (
                  <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} className="inline-flex items-center gap-2 text-lg font-black text-text-primary hover:text-primary transition-colors uppercase tracking-tight">
                    {item.value}
                    <ChevronRight size={18} />
                  </a>
                ) : (
                  <p className="text-lg font-black text-text-primary uppercase tracking-tight">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white p-12 md:p-20 rounded-[4rem] border border-border-light shadow-2xl shadow-primary/5"
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-7xl font-black text-text-primary uppercase tracking-tighter leading-none">Send us a <br /> <span className="text-primary">Message</span></h2>
                <p className="text-text-secondary font-medium text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-section border border-border-light rounded-[2rem] py-6 px-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-text-primary font-bold placeholder:text-text-secondary/30"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-bg-section border border-border-light rounded-[2rem] py-6 px-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-text-primary font-bold placeholder:text-text-secondary/30"
                    placeholder="john@example.com"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 md:col-span-2"
                >
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-section border border-border-light rounded-[2rem] py-6 px-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-text-primary font-bold placeholder:text-text-secondary/30"
                    placeholder="How can we help?"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 md:col-span-2"
                >
                  <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-bg-section border border-border-light rounded-[2.5rem] py-8 px-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-text-primary font-bold placeholder:text-text-secondary/30 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-2 pt-4"
                >
                  <button className="btn-primary w-full py-7 text-base flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 group">
                    <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-bg-section p-8 rounded-[4.5rem] border border-border-light h-[600px] overflow-hidden relative group shadow-2xl shadow-primary/5"
        >
          <div className="absolute inset-0 bg-text-primary/10 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="text-center p-12 md:p-20 bg-white/90 backdrop-blur-2xl rounded-[4rem] border border-white/20 shadow-2xl max-w-xl mx-6 transform group-hover:scale-105 transition-transform duration-700">
              <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <MapPin className="text-primary" size={48} />
              </div>
              <h3 className="text-4xl font-black text-text-primary uppercase tracking-tighter mb-4 leading-none">Our Experience <br /> <span className="text-primary">Center</span></h3>
              <p className="text-text-secondary font-medium mb-10 leading-relaxed">No. 123, Tech Plaza, Galle Road, Colombo 03, Sri Lanka.</p>
              <button className="btn-primary px-12 py-5 text-sm">
                Open in Google Maps
              </button>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1600" 
            alt="Map Background" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
}
