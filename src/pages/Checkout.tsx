import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { useCart } from '../CartContext';
import { formatPrice, generateOrderId } from '../utils';
import { WHATSAPP_NUMBER } from '../constants';
import { ShieldCheck, Truck, MessageCircle, ArrowLeft, ArrowRight, CreditCard, Banknote, MapPin, Phone, User, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import Modal from '../components/Modal';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<{ id: string; method: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'Bank Transfer'
  });

  const deliveryFee = 0; // Can be dynamic if needed
  const finalTotal = useMemo(() => total + deliveryFee, [total, deliveryFee]);

  useEffect(() => {
    // Only redirect if cart is empty and we're not in the middle of an order success
    if (items.length === 0 && !loading && !orderResult) {
      const timer = setTimeout(() => {
        if (items.length === 0) {
          navigate('/cart');
        }
      }, 100); // Small delay to allow state updates to propagate
      return () => clearTimeout(timer);
    }
  }, [items.length, navigate, loading, orderResult]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    const orderId = generateOrderId();
    const orderData = {
      id: orderId,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items,
      subtotal: total,
      deliveryFee,
      total: finalTotal,
      paymentMethod: formData.paymentMethod,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      setOrderResult({ id: orderId, method: formData.paymentMethod });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container-max py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Checkout Steps */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-6 mb-10">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate('/cart')}
              className="w-12 h-12 bg-white border border-border-light rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">Checkout</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-black uppercase tracking-widest ${step === 1 ? 'text-primary' : 'text-text-secondary'}`}>Shipping</span>
                <div className="w-4 h-[1px] bg-border-light"></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${step === 2 ? 'text-primary' : 'text-text-secondary'}`}>Payment</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-white p-8 rounded-2xl border border-border-light shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      Shipping Details
                    </h2>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Where should we deliver your order?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full bg-bg-section border border-border-light rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Phone Number</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 0771234567"
                        className="w-full bg-bg-section border border-border-light rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Delivery Address</label>
                      <textarea
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="House No, Street, City, District"
                        className="w-full bg-bg-section border border-border-light rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all resize-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 text-base flex items-center justify-center gap-3 group shadow-xl shadow-primary/20">
                    Continue to Payment
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-white p-8 rounded-2xl border border-border-light shadow-sm space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-2">
                      <CreditCard size={18} className="text-primary" />
                      Payment Method
                    </h2>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Select your preferred payment option</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Cash on Delivery' }))}
                      className={`p-6 rounded-2xl border-2 text-left transition-all space-y-4 relative group ${formData.paymentMethod === 'Cash on Delivery' ? 'border-primary bg-primary/5' : 'border-border-light hover:border-primary/30'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formData.paymentMethod === 'Cash on Delivery' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-bg-section text-primary'}`}>
                        <Banknote size={24} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text-primary uppercase tracking-tight">Cash on Delivery</h4>
                        <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest mt-1">Pay when you receive your order</p>
                      </div>
                      {formData.paymentMethod === 'Cash on Delivery' && (
                        <div className="absolute top-4 right-4 text-primary">
                          <CheckCircle2 size={20} />
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Bank Transfer' }))}
                      className={`p-6 rounded-2xl border-2 text-left transition-all space-y-4 relative group ${formData.paymentMethod === 'Bank Transfer' ? 'border-primary bg-primary/5' : 'border-border-light hover:border-primary/30'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formData.paymentMethod === 'Bank Transfer' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-bg-section text-primary'}`}>
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text-primary uppercase tracking-tight">Bank Transfer</h4>
                        <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest mt-1">Direct deposit to our account</p>
                      </div>
                      {formData.paymentMethod === 'Bank Transfer' && (
                        <div className="absolute top-4 right-4 text-primary">
                          <CheckCircle2 size={20} />
                        </div>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {formData.paymentMethod === 'Bank Transfer' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-bg-section p-6 rounded-2xl border border-border-light space-y-5 overflow-hidden"
                      >
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Bank Account Details</h4>
                        <div className="space-y-4 text-xs font-bold text-text-primary">
                          <div className="flex justify-between border-b border-border-light pb-3">
                            <span className="text-text-secondary uppercase tracking-widest text-[9px]">Bank</span>
                            <span>Commercial Bank</span>
                          </div>
                          <div className="flex justify-between border-b border-border-light pb-3">
                            <span className="text-text-secondary uppercase tracking-widest text-[9px]">Account Name</span>
                            <span>KAPU TECH (PVT) LTD</span>
                          </div>
                          <div className="flex justify-between border-b border-border-light pb-3">
                            <span className="text-text-secondary uppercase tracking-widest text-[9px]">Account Number</span>
                            <span className="font-black text-primary text-sm">1234567890</span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-border-light flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MessageCircle size={18} className="text-green-500" />
                          </div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-text-secondary leading-relaxed">
                            Please share the payment slip via WhatsApp after checkout to confirm your order.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full py-5 text-base flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-50 group"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Order...
                      </div>
                    ) : (
                      <>
                        Complete Order
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Summary Sidebar */}
        <aside className="w-full lg:w-[380px] lg:sticky lg:top-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border-light p-8 rounded-2xl shadow-sm space-y-8"
          >
            <h2 className="text-xl font-black uppercase tracking-tight border-b border-border-light pb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-bg-section rounded-xl overflow-hidden flex-shrink-0 border border-border-light group-hover:border-primary/30 transition-colors">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold truncate uppercase tracking-tight leading-none text-text-primary">{item.name}</h4>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mt-1.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-black text-text-primary">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border-light">
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-text-primary font-black">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-600 font-black">FREE</span>
              </div>
              <div className="pt-6 border-t border-border-light flex justify-between items-baseline">
                <span className="text-base font-black uppercase tracking-widest">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-primary block leading-none tracking-tight">{formatPrice(finalTotal)}</span>
                  <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest mt-2 block">Secure Transaction</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex flex-col items-center gap-2 p-4 bg-bg-section rounded-2xl border border-border-light text-center">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[8px] font-black uppercase tracking-widest text-text-primary">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-bg-section rounded-2xl border border-border-light text-center">
                <Truck size={20} className="text-primary" />
                <span className="text-[8px] font-black uppercase tracking-widest text-text-primary">Fast</span>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Success Modals */}
      <Modal 
        isOpen={!!orderResult} 
        onClose={() => navigate('/')}
        maxWidth="max-w-xl"
      >
        <div className="space-y-10 text-center py-4">
          {orderResult?.method === 'Cash on Delivery' ? (
            <>
              <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Order Placed!</h3>
                <p className="text-sm font-bold text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
                  Thank you! Your order has been placed successfully. You will receive it within 2–3 days.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl shadow-primary/20">
                <Clock size={48} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Order Pending</h3>
                <p className="text-sm font-bold text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
                  Thank you! Your order will be placed after checking your payment details. You will receive a message via WhatsApp after placing your order. You will receive it within 2–3 days.
                </p>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {orderResult?.method === 'Bank Transfer' && (
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I've just placed an order (ID: ${orderResult.id}) via Bank Transfer. Here is my payment slip.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <MessageCircle size={20} />
                WhatsApp Slip
              </a>
            )}
            <button 
              onClick={() => navigate('/')}
              className={`btn-primary py-5 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3 ${orderResult?.method !== 'Bank Transfer' ? 'sm:col-span-2' : ''}`}
            >
              Continue Shopping
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="pt-8 border-t border-border-light">
            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Order ID: <span className="text-primary">{orderResult?.id}</span></p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
