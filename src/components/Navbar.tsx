import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, MessageCircle, Truck, ArrowRight, ChevronRight, User as UserIcon, LogOut, Package, Flame, MapPin, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import AuthModal from './AuthModal';
import { WHATSAPP_NUMBER, SAMPLE_PRODUCTS } from '../constants';
import { cn, formatPrice } from '../utils';
import { Product } from '../types';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { total, itemCount } = useCart();
  const { user, profile, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const filtered = SAMPLE_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Info Bar */}
      <div className="hidden lg:block border-b border-gray-100 py-2">
        <div className="container-max flex items-center justify-between text-[10px] font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-primary" />
              <span>123 Main Street, Anytown USA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
              <button className="hover:text-primary transition-colors">USD <ChevronRight size={10} className="inline rotate-90" /></button>
              <button className="hover:text-primary transition-colors flex items-center gap-1">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-3 h-2 object-cover" />
                English <ChevronRight size={10} className="inline rotate-90" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Facebook size={12} className="hover:text-primary cursor-pointer" />
              <Twitter size={12} className="hover:text-primary cursor-pointer" />
              <Instagram size={12} className="hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-max py-4 md:py-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/20">
              <span className="text-white font-black text-lg md:text-2xl">KT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-black tracking-tighter uppercase leading-none text-text-primary">KAPU TECH</span>
              <span className="text-[6px] md:text-[8px] font-black text-primary uppercase tracking-[0.3em] mt-1">Premium Tech Store</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border-light overflow-hidden z-50">
                <div className="p-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-bg-section rounded-xl transition-colors text-left group"
                    >
                      <div className="w-12 h-12 bg-bg-section rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-text-primary truncate uppercase tracking-tight">{product.name}</h4>
                        <p className="text-[10px] text-text-secondary font-medium">{product.category} • {formatPrice(product.price)}</p>
                      </div>
                      <ArrowRight size={14} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/cart" className="flex items-center gap-3 group">
              <div className="relative">
                <ShoppingCart size={24} className="text-gray-700 group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Cart</p>
                <p className="text-xs font-black text-text-primary mt-1">{formatPrice(total)}</p>
              </div>
            </Link>

            <div className="relative">
              {user ? (
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 group"
                >
                  <UserIcon size={24} className="text-gray-700 group-hover:text-primary transition-colors" />
                  <div className="hidden sm:block text-left">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">User</p>
                    <p className="text-xs font-black text-text-primary mt-1">{profile?.displayName?.split(' ')[0] || 'Account'}</p>
                  </div>
                </button>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-3 group"
                >
                  <UserIcon size={24} className="text-gray-700 group-hover:text-primary transition-colors" />
                  <div className="hidden sm:block text-left">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">User</p>
                    <p className="text-xs font-black text-text-primary mt-1">Account</p>
                  </div>
                </button>
              )}

              {isProfileOpen && user && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-border-light overflow-hidden z-50">
                  <div className="p-4 border-b border-border-light bg-bg-section/50">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Signed in as</p>
                    <p className="text-xs font-bold text-text-primary truncate mt-1">{profile?.email || profile?.phoneNumber}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/track-order" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full p-3 hover:bg-bg-section rounded-xl transition-colors">
                      <Package size={18} className="text-text-secondary" />
                      <span className="text-xs font-bold text-text-primary uppercase">My Orders</span>
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full p-3 hover:bg-bg-section rounded-xl transition-colors">
                        <UserIcon size={18} className="text-text-secondary" />
                        <span className="text-xs font-bold text-text-primary uppercase">Admin Panel</span>
                      </Link>
                    )}
                    <button onClick={() => { logout(); setIsProfileOpen(false); }} className="flex items-center gap-3 w-full p-3 hover:bg-red-50 rounded-xl transition-colors text-red-500">
                      <LogOut size={18} />
                      <span className="text-xs font-bold uppercase">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Red Nav Bar */}
      <div className="bg-primary py-3 px-4 relative overflow-hidden">
        <div className="container-max flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              <Menu size={16} />
              All Categories
            </button>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/products" className="text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-1">
                Products
                <ChevronRight size={12} className="rotate-90" />
              </Link>
              <Link to="/blog" className="text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
                Blog
              </Link>
              <Link to="/contact" className="text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/products?filter=sale" className="flex items-center gap-1.5 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              <Flame size={14} className="fill-white" />
              LIMITED SALE
            </Link>
            <Link to="/products?filter=best-seller" className="hidden sm:block text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              Best Seller
            </Link>
            <Link to="/products?filter=new-arrival" className="hidden sm:block text-white text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              New Arrival
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border-light overflow-hidden">
          <div className="p-4 space-y-4">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-section border border-border-light rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
              </form>
            </div>
            <nav className="grid grid-cols-2 gap-3">
              {['Keyboard', 'Mouse', 'Monitor', 'Speaker', 'RAM', 'SSD'].map((cat) => (
                <Link 
                  key={cat} 
                  to={`/products?category=${cat}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-4 bg-bg-section rounded-2xl text-[10px] font-black text-text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-center shadow-sm"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
