import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Eye, Zap, Flame, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils';
import { useCart } from '../CartContext';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setConfirmingProduct } = useCart();

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Is it available?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#FF6B4A] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
            -20%
          </span>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button 
            onClick={(e) => { e.preventDefault(); setConfirmingProduct({ product, quantity: 1 }); }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-xl hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <ShoppingCart size={18} />
          </button>
          <button 
            onClick={handleWhatsAppInquiry}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#25D366] shadow-xl hover:bg-[#25D366] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</span>
          
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-text-primary line-clamp-2 leading-tight hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-yellow-400">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < 5 ? "currentColor" : "none"} strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 ml-1">(100)</span>
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-black text-[#FF6B4A] tracking-tight">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-300 line-through font-bold tracking-tight">{formatPrice(product.price * 1.2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
