import React from 'react';
import Navbar from './Navbar';
import CategoryBar from './CategoryBar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import MobileBottomNav from './MobileBottomNav';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';
import { useCart } from '../CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { confirmingProduct, setConfirmingProduct, addItem } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryBar />
      <main className="flex-grow bg-bg-main">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
      <Toast />
      <ConfirmModal 
        data={confirmingProduct} 
        onConfirm={() => {
          if (confirmingProduct) {
            addItem(confirmingProduct.product, confirmingProduct.quantity);
            setConfirmingProduct(null);
          }
        }}
        onCancel={() => setConfirmingProduct(null)}
      />
    </div>
  );
}
