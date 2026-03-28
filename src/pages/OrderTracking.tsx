import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, Package, CheckCircle, Truck, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { formatPrice, cn } from '../utils';
import { WHATSAPP_NUMBER } from '../constants';

export default function OrderTracking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const q = query(collection(db, 'orders'), where('id', '==', orderId.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setOrder(querySnapshot.docs[0].data());
      } else {
        setError('Order not found. Please check your Order ID and try again.');
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setError('An error occurred while tracking your order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleTrack();
    }
  }, [initialId]);

  const statusSteps = ['Pending', 'Confirmed', 'Shipped'];
  const currentStatusIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 space-y-12">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <Package size={64} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tighter">Track Your Order</h1>
          <p className="text-text-secondary font-bold text-lg">Enter your Order ID to see the current status of your delivery.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-ABC123XYZ)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-bg-section border border-border-light rounded-xl px-12 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all uppercase tracking-widest"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary px-10 py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track Now'}
            <ArrowRight size={20} />
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-bold text-center">
            {error}
          </div>
        )}

        {order && (
          <div className="space-y-12 animate-in fade-in slide-in-from-top duration-500">
            {/* Status Timeline */}
            <div className="flex items-center justify-between px-4">
              {statusSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all border-4",
                    index <= currentStatusIndex ? "bg-primary text-white border-primary/20 shadow-lg shadow-primary/20" : "bg-bg-section text-text-secondary border-transparent"
                  )}>
                    {index === 0 ? <Clock size={20} /> : index === 1 ? <CheckCircle size={20} /> : <Truck size={20} />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    index <= currentStatusIndex ? "text-primary" : "text-text-secondary"
                  )}>{step}</span>
                  {index < statusSteps.length - 1 && (
                    <div className={cn(
                      "absolute top-6 left-full w-full h-1 -translate-y-1/2 -z-10",
                      index < currentStatusIndex ? "bg-primary" : "bg-bg-section"
                    )}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-bg-section p-8 rounded-3xl border border-border-light space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Order Info</h4>
                  <div className="space-y-1 text-sm font-bold text-text-primary">
                    <p className="text-text-secondary">Order ID:</p>
                    <p className="text-lg font-black tracking-tight">{order.id}</p>
                    <p className="text-text-secondary mt-2">Placed on:</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Shipping To</h4>
                  <div className="space-y-1 text-sm font-bold text-text-primary">
                    <p>{order.customerName}</p>
                    <p>{order.phone}</p>
                    <p className="text-text-secondary">{order.address}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border-light">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Order Items</h4>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-border-light">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight line-clamp-1">{item.name}</p>
                          <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-primary">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-border-light flex justify-between items-baseline">
                  <span className="text-lg font-black uppercase tracking-widest text-text-primary">Total Paid</span>
                  <span className="text-3xl font-black text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500 p-8 rounded-3xl shadow-xl shadow-green-500/20 space-y-6 text-white text-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">Need more information?</h3>
              <p className="text-white/90 font-bold text-sm">Our support team is available on WhatsApp to help you with your order status.</p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm checking the status of my order ${order.id}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-bg-section transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
              >
                <MessageCircle size={24} />
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="text-center space-y-4">
        <p className="text-text-secondary font-bold">Lost your Order ID? Check your WhatsApp messages or contact us.</p>
        <Link to="/products" className="text-primary font-black text-sm uppercase tracking-widest flex items-center justify-center gap-1 hover:gap-2 transition-all">
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
