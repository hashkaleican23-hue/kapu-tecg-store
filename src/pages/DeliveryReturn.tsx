import React from 'react';
import { Truck, ShieldCheck, Award, CreditCard, CheckCircle2 } from 'lucide-react';

export default function DeliveryReturn() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-[#E0E0E0] shadow-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#111111]">Delivery & <span className="text-[#0000FF]">Returns</span></h1>
          <p className="text-[#555555] mb-12">Last Updated: March 22, 2026</p>

          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0000FF]/10 rounded-xl flex items-center justify-center">
                  <Truck className="text-[#0000FF]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">1. Delivery Information</h2>
              </div>
              <p className="text-[#555555] leading-relaxed text-lg">
                We offer reliable island-wide delivery across Sri Lanka, ensuring your premium tech reaches you safely and quickly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#E0E0E0]">
                  <p className="text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">Colombo & Suburbs</p>
                  <p className="text-[#111111] font-bold text-lg">1-2 Business Days</p>
                </div>
                <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#E0E0E0]">
                  <p className="text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">Outstation</p>
                  <p className="text-[#111111] font-bold text-lg">3-5 Business Days</p>
                </div>
                <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#E0E0E0]">
                  <p className="text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">Delivery Fee</p>
                  <p className="text-[#111111] font-bold text-lg">Free over Rs. 50k</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0000FF]/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="text-[#0000FF]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">2. Order Tracking</h2>
              </div>
              <p className="text-[#555555] leading-relaxed">
                Once your order is shipped, you will receive a tracking ID via WhatsApp and Email. You can use our "Order Tracking" page to monitor your delivery status in real-time.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0000FF]/10 rounded-xl flex items-center justify-center">
                  <Award className="text-[#0000FF]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">3. Return Policy</h2>
              </div>
              <p className="text-[#555555] leading-relaxed">
                We accept returns within 7 days of delivery under the following conditions:
              </p>
              <ul className="space-y-4">
                {[
                  "The product is in its original, unopened packaging with all seals intact.",
                  "The product is defective or damaged upon arrival (must be reported within 24 hours).",
                  "The wrong item was delivered compared to your order confirmation."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#555555]">
                    <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0000FF]/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="text-[#0000FF]" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">4. Refund Process</h2>
              </div>
              <p className="text-[#555555] leading-relaxed">
                Refunds will be processed via bank transfer once the returned item is inspected and approved by our technical team. Please allow 3-5 business days for the refund to reflect in your account.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
