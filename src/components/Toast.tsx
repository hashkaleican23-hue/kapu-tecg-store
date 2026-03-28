import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';

export default function Toast() {
  const { toast, hideToast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
        >
          <div className="bg-text-primary text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-tight line-clamp-1">{toast.message}</p>
                <Link 
                  to="/cart" 
                  onClick={hideToast}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-1"
                >
                  View Cart <ArrowRight size={12} />
                </Link>
              </div>
            </div>
            <button 
              onClick={hideToast}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
