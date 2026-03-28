import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../CartContext';
import { WHATSAPP_NUMBER } from '../constants';
import { cn } from '../utils';

export default function MobileBottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/products?focus=search' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: itemCount },
    { icon: MessageCircle, label: 'WhatsApp', path: `https://wa.me/${WHATSAPP_NUMBER}`, external: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-light z-50 px-6 py-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path.split('?')[0];
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors"
              >
                <Icon size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all relative",
                isActive ? "text-primary scale-110" : "text-text-secondary"
              )}
            >
              <Icon size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
