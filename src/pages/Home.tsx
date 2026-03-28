import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ShieldCheck, Truck, Zap, Flame, ArrowRight, MessageCircle, Star, Play, Globe, Cpu } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { SAMPLE_PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import ProductCard from '../components/ProductCard';
import { formatPrice, cn } from '../utils';
import { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(true);

  const heroContent = {
    title: "Your One-Stop Electronic Market",
    subtitle: "Welcome to KAPU TECH, your premium tech store for high-performance gear. Sale every day!",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop",
    badge: "Limited Sale",
    color: "from-orange-50/50",
    accent: "text-[#FF6B4A]"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(12));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.slice(0, 4);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="space-y-0 pb-6 bg-white">
      {/* Hero Section - Editorial / High-End Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] text-white py-20 lg:py-0">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
          />
          <motion.div 
            style={{ y: y2, opacity }}
            className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">New Season Drop</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase">
                The Future <br />
                <span className="text-primary italic">Of Tech.</span>
              </h1>
              
              <p className="text-sm sm:text-lg text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroContent.subtitle}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 justify-center lg:justify-start"
            >
              <Link to="/products" className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-dark transition-all active:scale-95 shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 group">
                Shop Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-3">
                Our Story
                <Globe size={18} />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/5"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black tracking-tighter">10K+</p>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active Users</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black tracking-tighter">500+</p>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Premium Products</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black tracking-tighter">24/7</p>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Expert Support</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src={heroContent.img} 
                  alt="Electronic Market"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Featured Product</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-primary text-primary" />)}
                    </div>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Premium Setup Bundle</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black tracking-tighter">Rs. 145,000</span>
                    <button className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col items-center justify-center p-4 text-center"
              >
                <Cpu size={32} className="text-primary mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest leading-tight">Next Gen <br /> Performance</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-40 h-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center gap-4 p-4"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Fastest <br /> Delivery</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-6 bg-white overflow-hidden border-b border-border-light">
        <div className="container-max">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.3em]">Authorized Reseller For</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-30 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Logitech_logo.svg/2560px-Logitech_logo.svg.png" alt="Logitech" className="h-4 md:h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Razer_logo.svg/1200px-Razer_logo.svg.png" alt="Razer" className="h-4 md:h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Corsair_Logo.svg/1200px-Corsair_Logo.svg.png" alt="Corsair" className="h-4 md:h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" alt="Samsung" className="h-4 md:h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png" alt="HP" className="h-4 md:h-6 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-b border-border-light">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: 'Responsive', desc: 'Customer service available 24/7' },
              { icon: ShieldCheck, title: 'Secure', desc: 'Certified marketplace since 2017' },
              { icon: Truck, title: 'Shipping', desc: 'Free, fast, and reliable worldwide' },
              { icon: Star, title: 'Transparent', desc: 'Hassle-free return policy' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-text-primary">{item.title}</h4>
                  <p className="text-[10px] font-medium text-text-secondary leading-tight mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-6 bg-bg-section">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
            <div className="space-y-0.5 text-center md:text-left">
              <span className="text-primary text-[9px] font-black uppercase tracking-[0.2em]">Explore</span>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary uppercase tracking-tighter">Shop by Category</h2>
            </div>
            <Link to="/products" className="btn-outline !py-2 !px-4 text-[10px] text-center">
              View All Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Keyboards', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop', count: '120+ Products', color: 'from-blue-600/20' },
              { name: 'Gaming Mice', img: 'https://images.unsplash.com/photo-1527814050087-379371549a28?q=80&w=800&auto=format&fit=crop', count: '85+ Products', color: 'from-purple-600/20' },
              { name: 'Monitors', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop', count: '45+ Products', color: 'from-orange-600/20' },
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={`/products?category=${cat.name.replace('Gaming ', '').replace('s', '')}`}
                className="group relative h-[200px] rounded-[1.5rem] overflow-hidden shadow-md"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-text-primary/40 to-transparent opacity-60`}></div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center space-y-2">
                  <div className="space-y-0.5">
                    <p className="text-[7px] font-black text-primary uppercase tracking-[0.3em] drop-shadow-md">{cat.count}</p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">{cat.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-[7px] font-black text-white uppercase tracking-widest">Explore</span>
                    <ArrowRight size={10} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container-max">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">Featured Products</h2>
            <Link to="/products" className="text-[#FF6B4A] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All
              <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-6">
        <div className="container-max">
          <div className="relative h-[200px] sm:h-[250px] rounded-[1.5rem] overflow-hidden bg-text-primary">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop" 
                alt="Promo" 
                className="w-full h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-text-primary via-text-primary/70 to-transparent"></div>
            </div>
            <div className="relative h-full container-max flex items-center px-6 md:px-12">
              <div className="max-w-md space-y-3">
                <div className="space-y-0.5">
                  <span className="text-primary text-[9px] font-black uppercase tracking-[0.3em]">Limited Time Offer</span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-[0.9]">Upgrade Your <br /> Battlestation</h2>
                  <p className="text-xs text-white/60 font-medium max-w-sm">Get up to 40% off on all premium gaming peripherals. Valid until the end of the month.</p>
                </div>
                <Link to="/products" className="btn-primary !py-2.5 !px-6 text-[10px] inline-flex w-auto">
                  Shop the Sale
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container-max">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">New Arrivals</h2>
            <Link to="/products" className="text-[#FF6B4A] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Explore All
              <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-8 bg-white">
        <div className="container-max">
          <div className="text-center space-y-1 mb-8">
            <span className="text-primary text-[9px] font-black uppercase tracking-[0.3em]">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary uppercase tracking-tighter">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Arjun K.', role: 'Pro Gamer', text: 'The build quality of the mechanical keyboard I bought is insane. Best tech shop in the island!', rating: 5 },
              { name: 'Sarah M.', role: 'Graphic Designer', text: 'Super fast delivery and the monitor was packed so securely. Highly recommended for professionals.', rating: 5 },
              { name: 'Dimuthu R.', role: 'Tech Enthusiast', text: 'Genuine products and the WhatsApp support is actually helpful. Will definitely buy again.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-bg-section p-5 rounded-[1.5rem] border border-border-light space-y-3">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={10} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs text-text-secondary font-medium italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-[10px]">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-text-primary uppercase tracking-tight">{review.name}</h4>
                    <p className="text-[7px] font-bold text-text-secondary uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Community CTA */}
      <section className="py-8">
        <div className="container-max">
          <div className="bg-primary rounded-[1.5rem] p-6 md:p-10 text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
            
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                <MessageCircle size={12} className="text-white" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.1em]">Join the Squad</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-none">Get Exclusive Deals <br /> on WhatsApp</h2>
              <p className="text-xs text-white/80 font-medium max-w-lg mx-auto">Be the first to know about flash sales, new arrivals, and exclusive community discounts.</p>
              <div className="pt-1">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl inline-flex items-center gap-2"
                >
                  Join WhatsApp Community
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
