import React from 'react';

export default function DeliveryPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <h1 className="text-5xl font-black tracking-tighter text-text-primary mb-12">Delivery & <span className="text-primary">Returns</span></h1>
      <div className="bg-bg-section p-10 md:p-16 rounded-[3rem] border border-border-light shadow-xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">1. Delivery Areas</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We provide island-wide delivery across Sri Lanka. Whether you are in Colombo, Kandy, Galle, or Jaffna, we will get your tech gear to you.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">2. Delivery Times</h2>
          <p className="text-text-secondary font-medium leading-loose">
            Orders within Colombo and suburbs are typically delivered within 24-48 hours. Orders outside Colombo may take 2-4 business days.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">3. Delivery Charges</h2>
          <p className="text-text-secondary font-medium leading-loose">
            Delivery charges are calculated based on your location and the weight of the items. We offer free delivery for orders over Rs. 50,000.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">4. Return Policy</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We accept returns for defective or damaged items within 7 days of delivery. The item must be in its original packaging and condition. Please contact us via WhatsApp to initiate a return.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">5. Refunds</h2>
          <p className="text-text-secondary font-medium leading-loose">
            Refunds are processed once the returned item has been inspected and approved. Refunds will be made via bank transfer within 5-7 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
