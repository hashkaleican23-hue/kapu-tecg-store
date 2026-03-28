import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} bg-white rounded-[2.5rem] shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border-light">
              {title ? (
                <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">{title}</h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-section rounded-xl transition-colors text-text-secondary hover:text-primary"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
