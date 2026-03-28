import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils';

interface ConfirmModalProps {
  data: { product: Product, quantity: number } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ data, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {data && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-text-primary/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-border-light"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShoppingCart size={24} />
                </div>
                <button 
                  onClick={onCancel}
                  className="w-10 h-10 bg-bg-section rounded-xl flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter">Add to Cart?</h3>
                <p className="text-sm font-medium text-text-secondary leading-relaxed">
                  Are you sure you want to add <span className="text-text-primary font-bold">{data.product.name}</span> to your shopping cart?
                </p>
              </div>

              <div className="flex items-center gap-4 bg-bg-section p-4 rounded-2xl border border-border-light">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-border-light shrink-0">
                  <img src={data.product.images[0]} alt={data.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-text-primary uppercase tracking-tight truncate">{data.product.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-black text-primary">{formatPrice(data.product.price)}</p>
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Qty: {data.quantity}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onCancel}
                  className="py-4 px-6 bg-bg-section rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:bg-border-light transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="btn-primary py-4 px-6 text-[10px] flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Yes, Add It
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
