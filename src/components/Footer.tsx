import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white pt-24 pb-32 md:pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[150px]"></div>
      </div>

      <div className="container-max relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pb-24 border-b border-white/10"
        >
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Stay in the <br /> <span className="text-primary">Tech Loop</span>
            </h3>
            <p className="text-gray-400 font-medium max-w-md">
              Subscribe to get exclusive deals, early access to new arrivals, and expert tech tips.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-none focus:border-primary transition-all"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-12 py-5 text-sm whitespace-nowrap"
            >
              Subscribe Now
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24"
        >
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/20">
                <span className="text-white font-black text-2xl">KT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter uppercase leading-none">KAPU TECH</span>
                <span className="text-[8px] font-black tracking-[0.3em] text-primary uppercase leading-none mt-1">Premium Tech Store</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Your premier destination for high-quality tech components in Sri Lanka. We specialize in keyboards, mice, monitors, and more.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-primary">Categories</h4>
            <ul className="space-y-5">
              {['Keyboard', 'Mouse', 'Monitor', 'Speaker', 'RAM', 'SSD'].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`} className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block font-bold uppercase tracking-widest">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-primary">Quick Links</h4>
            <ul className="space-y-5">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'Delivery & Return', path: '/delivery' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block font-bold uppercase tracking-widest">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-primary">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <span className="text-sm font-bold">{WHATSAPP_NUMBER}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Email</p>
                  <span className="text-sm font-bold">sales@kaputech.lk</span>
                </div>
              </li>
              <li className="pt-4">
                <motion.a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-whatsapp w-full py-4 flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
          <p>© 2026 KAPU TECH. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span>Designed for Sri Lanka</span>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-5 bg-red-600 rounded-sm shadow-lg"></div>
                <div className="w-8 h-5 bg-yellow-400 rounded-sm shadow-lg"></div>
                <div className="w-8 h-5 bg-green-600 rounded-sm shadow-lg"></div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
