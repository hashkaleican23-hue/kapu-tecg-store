import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../CartContext';
import { formatPrice } from '../utils';
import Modal from '../components/Modal';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  if (itemCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-bg-section rounded-full flex items-center justify-center mx-auto text-text-secondary shadow-inner">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-text-primary uppercase tracking-tighter">Your Cart is Empty</h1>
          <p className="text-text-secondary font-bold max-w-md mx-auto text-sm">Looks like you haven't added anything to your cart yet. Start shopping to find the best tech deals!</p>
        </div>
        <div>
          <Link to="/products" className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base shadow-lg shadow-primary/10">
            <ArrowLeft size={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-max py-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Cart Items */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-black text-text-primary uppercase tracking-tight">Shopping Cart</h1>
            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest bg-bg-section px-2 py-0.5 rounded-full border border-border-light">
              {itemCount} Items
            </span>
          </div>

          <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-12 gap-3 p-3 bg-bg-section border-b border-border-light text-[8px] font-black uppercase tracking-widest text-text-secondary">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-border-light">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 group hover:bg-bg-section/30 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-2">
                      <Link to={`/product/${item.id}`} className="w-14 h-14 bg-bg-section rounded-lg overflow-hidden flex-shrink-0 border border-border-light group-hover:border-primary/30 transition-colors">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </Link>
                      <div className="min-w-0 space-y-0">
                        <span className="text-[6px] font-black uppercase tracking-widest text-primary/70">{item.category}</span>
                        <Link to={`/product/${item.id}`} className="block">
                          <h3 className="text-xs font-bold text-text-primary truncate hover:text-primary transition-colors uppercase tracking-tight">{item.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[7px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={8} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center text-xs font-bold text-text-primary">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <div className="flex items-center bg-bg-section border border-border-light rounded-lg p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all active:scale-95"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center font-bold text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all active:scale-95"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 text-right">
                      <p className="md:hidden text-[7px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">Subtotal</p>
                      <p className="text-sm font-black text-text-primary tracking-tight">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link to="/products" className="inline-flex items-center gap-2 text-[9px] font-black text-text-secondary uppercase tracking-widest hover:text-primary transition-colors group">
              <ArrowLeft size={12} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary Sidebar */}
        <aside className="w-full lg:w-[280px] lg:sticky lg:top-20">
          <div className="bg-white border border-border-light p-4 rounded-xl shadow-sm space-y-4">
            <h2 className="text-base font-black uppercase tracking-tight border-b border-border-light pb-2">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-bold text-text-secondary uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-text-primary font-black">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-[8px] font-bold text-text-secondary uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-600 font-black">Free</span>
              </div>
              
              <div className="pt-3 border-t border-border-light">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-xs font-black uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-primary block leading-none tracking-tight">{formatPrice(total)}</span>
                    <span className="text-[6px] font-bold text-text-secondary uppercase tracking-widest mt-1 block">Taxes included</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/10 group"
                >
                  Checkout
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 p-2 bg-bg-section rounded-lg border border-border-light">
                <ShieldCheck size={14} className="text-primary" />
                <div className="space-y-0.5">
                  <p className="text-[7px] font-black uppercase tracking-widest text-text-primary">Secure Transaction</p>
                  <p className="text-[6px] font-bold text-text-secondary uppercase tracking-widest">Encrypted payment data</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-bg-section rounded-lg border border-border-light">
                <Truck size={14} className="text-primary" />
                <div className="space-y-0.5">
                  <p className="text-[7px] font-black uppercase tracking-widest text-text-primary">Fast Delivery</p>
                  <p className="text-[6px] font-bold text-text-secondary uppercase tracking-widest">2-3 business days</p>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <h4 className="text-[7px] font-black uppercase tracking-widest text-text-secondary mb-1.5">Promo Code</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="CODE" 
                  className="flex-1 bg-bg-section border border-border-light rounded-lg px-2 py-1 text-[8px] font-bold focus:outline-none focus:border-primary transition-all uppercase tracking-widest placeholder:text-gray-400"
                />
                <button className="bg-text-primary text-white px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest hover:bg-black transition-all">Apply</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
