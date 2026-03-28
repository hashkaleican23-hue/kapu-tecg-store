import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary mb-8">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          Have a question about a product or an order? Our tech experts are here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-32">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Contact <span className="text-primary">Info</span></h2>
            <div className="space-y-6">
              <div className="flex gap-6 p-8 bg-bg-section rounded-[2.5rem] border border-border-light shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase font-black tracking-widest mb-1">Call Us</p>
                  <p className="text-lg font-black text-text-primary">+94 72 939 9609</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 bg-bg-section rounded-[2.5rem] border border-border-light shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#25D366] shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase font-black tracking-widest mb-1">WhatsApp</p>
                  <p className="text-lg font-black text-text-primary">+94 72 939 9609</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 bg-bg-section rounded-[2.5rem] border border-border-light shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase font-black tracking-widest mb-1">Email</p>
                  <p className="text-lg font-black text-text-primary">sales@kaputech.lk</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight">Business <span className="text-primary">Hours</span></h2>
            <div className="p-8 bg-bg-section rounded-[2.5rem] border border-border-light shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-text-secondary">Mon - Fri</span>
                <span className="text-sm font-black text-text-primary">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-text-secondary">Saturday</span>
                <span className="text-sm font-black text-text-primary">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-text-secondary">Sunday</span>
                <span className="text-sm font-black text-text-primary">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-border-light shadow-2xl space-y-12">
            <h2 className="text-4xl font-black tracking-tight">Send a <span className="text-primary">Message</span></h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-bg-section border border-border-light rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-bg-section border border-border-light rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Subject</label>
                <input
                  required
                  type="text"
                  className="w-full bg-bg-section border border-border-light rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary transition-all"
                  placeholder="What is this about?"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Your Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full bg-bg-section border border-border-light rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
