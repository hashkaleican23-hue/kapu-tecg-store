import React from 'react';
import { ShieldCheck, Truck, MessageCircle, Phone, Mail, MapPin, Users, Star, Zap, Flame, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const AboutUs = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
        <Users size={48} />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tighter">About KAPU Tech</h1>
      <p className="text-text-secondary font-bold text-lg">Your premier destination for high-quality tech components in Sri Lanka.</p>
    </div>
    <div className="prose prose-lg max-w-none text-text-secondary font-medium leading-relaxed space-y-6">
      <p>Founded in 2024, KAPU Tech has quickly become a trusted name in the Sri Lankan tech community. We specialize in sourcing and reselling premium tech gear, from high-performance gaming peripherals to essential PC components.</p>
      <p>Our mission is simple: to provide tech enthusiasts in Sri Lanka with access to the latest and greatest technology at competitive prices, backed by exceptional customer service and genuine warranties.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose py-12">
        <div className="bg-bg-section p-8 rounded-3xl border border-border-light space-y-4">
          <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Our Vision</h3>
          <p className="text-sm font-bold">To be the #1 choice for tech gear in Sri Lanka, known for quality, trust, and innovation.</p>
        </div>
        <div className="bg-bg-section p-8 rounded-3xl border border-border-light space-y-4">
          <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Our Values</h3>
          <p className="text-sm font-bold">Integrity, customer-centricity, and a passion for technology drive everything we do.</p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactUs = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12">
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
        <MessageCircle size={48} />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tighter">Get in Touch</h1>
      <p className="text-text-secondary font-bold text-lg">Have a question? We're here to help you with all your tech needs.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-8">
        <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter">Send us a Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Full Name</label>
              <input type="text" className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Email Address</label>
              <input type="email" className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Subject</label>
            <input type="text" className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Message</label>
            <textarea rows={5} className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary resize-none" />
          </div>
          <button className="btn-primary w-full py-4 text-lg">Send Message</button>
        </form>
      </div>
      <div className="space-y-8">
        <div className="bg-text-primary text-white p-8 md:p-12 rounded-3xl shadow-2xl space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><Phone size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone / WhatsApp</p>
                <p className="text-lg font-black">{WHATSAPP_NUMBER}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><Mail size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</p>
                <p className="text-lg font-black">sales@kaputech.lk</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><MapPin size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Our Location</p>
                <p className="text-lg font-black">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-green-500 p-8 rounded-3xl shadow-xl shadow-green-500/20 text-white space-y-4">
          <h3 className="text-xl font-black uppercase tracking-tighter">Need Instant Support?</h3>
          <p className="text-sm font-bold">Chat with us on WhatsApp for the fastest response to your tech inquiries.</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-xl font-black text-sm hover:bg-bg-section transition-all">
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
    <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Privacy Policy</h1>
    <div className="prose prose-lg max-w-none text-text-secondary font-medium leading-relaxed space-y-6">
      <p>At KAPU Tech, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Information Collection</h3>
      <p>We collect information you provide when placing an order, including your name, phone number, and address. We also collect data related to your browsing behavior on our site to improve our services.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Use of Information</h3>
      <p>Your information is used to process orders, communicate with you via WhatsApp, and provide personalized recommendations. We do not sell your data to third parties.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Data Security</h3>
      <p>We implement robust security measures to protect your data from unauthorized access or disclosure.</p>
    </div>
  </div>
);

export const TermsConditions = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
    <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Terms & Conditions</h1>
    <div className="prose prose-lg max-w-none text-text-secondary font-medium leading-relaxed space-y-6">
      <p>By using our website, you agree to the following terms and conditions.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Product Availability</h3>
      <p>All products are subject to availability. We reserve the right to limit quantities or cancel orders at our discretion.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Pricing</h3>
      <p>Prices are subject to change without notice. We strive for accuracy but are not responsible for typographical errors.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Order Confirmation</h3>
      <p>Orders are only confirmed once we contact you via WhatsApp and receive confirmation.</p>
    </div>
  </div>
);

export const DeliveryReturn = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
    <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Delivery & Return Policy</h1>
    <div className="prose prose-lg max-w-none text-text-secondary font-medium leading-relaxed space-y-6">
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Delivery</h3>
      <p>We offer island-wide delivery across Sri Lanka. Delivery typically takes 2-5 business days after order confirmation. Free delivery is available on orders over Rs. 5000.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Returns</h3>
      <p>Returns are accepted within 7 days of delivery for defective or incorrect items. Products must be in original packaging and unused.</p>
      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Warranty</h3>
      <p>Most products come with a 1-year local warranty. Please check individual product descriptions for specific warranty details.</p>
    </div>
  </div>
);
