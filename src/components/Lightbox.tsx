import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNext, onPrev }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-[210] w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-12 pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90 pointer-events-auto"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90 pointer-events-auto"
            >
              <ChevronRight size={40} />
            </button>
          </div>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-[2rem] shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-8 py-3 rounded-full text-white font-black text-sm uppercase tracking-[0.2em] border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
