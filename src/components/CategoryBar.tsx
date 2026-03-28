import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils';

const categories = ['Keyboard', 'Mouse', 'Monitor', 'Speaker', 'RAM', 'SSD'];

export default function CategoryBar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border-b border-border-light overflow-x-auto no-scrollbar sticky top-16 md:top-20 z-40">
      <div className="container-max">
        <nav className="flex items-center justify-center gap-4 sm:gap-12 h-16 whitespace-nowrap">
          <Link
            to="/products"
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-primary transition-all relative py-5 group",
              !currentCategory && location.pathname === '/products' && "text-primary"
            )}
          >
            All Products
            <div className={cn(
              "absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 rounded-t-full",
              !currentCategory && location.pathname === '/products' ? "w-full" : "w-0 group-hover:w-full"
            )}></div>
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-primary transition-all relative py-5 group",
                currentCategory === cat && "text-primary"
              )}
            >
              {cat}
              <div className={cn(
                "absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 rounded-t-full",
                currentCategory === cat ? "w-full" : "w-0 group-hover:w-full"
              )}></div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
