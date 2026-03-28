import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight, ShoppingBag, Truck, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { formatPrice } from '../utils';
import { WHATSAPP_NUMBER } from '../constants';

export default function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  const handleWhatsAppConfirmation = () => {
    const message = encodeURIComponent(`Hi, I just placed an order with ID: ${id}. Please confirm it.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const copyOrderId = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      alert('Order ID copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 space-y-12">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
          <CheckCircle size={64} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tighter">Order Placed!</h1>
          <p className="text-text-secondary font-bold text-lg">Thank you for shopping with KAPU Tech. We've received your order.</p>
        </div>
        <div className="inline-flex items-center gap-3 bg-bg-section px-6 py-3 rounded-2xl border border-border-light shadow-sm">
          <span className="text-xs font-black text-text-secondary uppercase tracking-widest">Order ID:</span>
          <span className="text-lg font-black text-primary tracking-tight">{id}</span>
          <button onClick={copyOrderId} className="p-2 hover:bg-white rounded-lg transition-all text-text-secondary hover:text-primary">
            <Copy size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-6">
          <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-2">
            <ShoppingBag size={24} className="text-primary" />
            Next Steps
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">1</div>
              <p className="text-sm text-text-secondary font-bold">We will contact you via WhatsApp to confirm your order details and delivery time.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">2</div>
              <p className="text-sm text-text-secondary font-bold">Once confirmed, your order will be shipped within 24-48 hours.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs flex-shrink-0">3</div>
              <p className="text-sm text-text-secondary font-bold">You can track your order status using your Order ID on our tracking page.</p>
            </li>
          </ul>
        </div>

        <div className="bg-green-500 p-8 rounded-3xl shadow-xl shadow-green-500/20 space-y-6 text-white text-center flex flex-col justify-center">
          <h3 className="text-xl font-black uppercase tracking-tighter">Speed up the process?</h3>
          <p className="text-white/90 font-bold text-sm">Send us a message on WhatsApp with your Order ID for instant confirmation.</p>
          <button 
            onClick={handleWhatsAppConfirmation}
            className="bg-white text-green-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-bg-section transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
          >
            <MessageCircle size={24} />
            Confirm on WhatsApp
          </button>
        </div>
      </div>

      {order && (
        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-8">
          <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter border-b border-border-light pb-6">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">Shipping To</h4>
              <div className="space-y-1 text-sm font-bold text-text-primary">
                <p>{order.customerName}</p>
                <p>{order.phone}</p>
                <p className="text-text-secondary">{order.address}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">Payment Info</h4>
              <div className="space-y-1 text-sm font-bold text-text-primary">
                <p>{order.paymentMethod}</p>
                <p className="text-primary font-black text-lg">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/products" className="btn-primary w-full sm:w-auto px-10 py-4 text-lg">
          Continue Shopping
        </Link>
        <Link to={`/track-order?id=${id}`} className="bg-bg-section text-text-primary w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-lg hover:bg-border-light transition-all border border-border-light flex items-center justify-center gap-2">
          Track Order
          <ExternalLink size={20} />
        </Link>
      </div>
    </div>
  );
}
