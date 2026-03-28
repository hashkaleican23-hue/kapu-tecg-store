import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <h1 className="text-5xl font-black tracking-tighter text-text-primary mb-12">Privacy <span className="text-primary">Policy</span></h1>
      <div className="bg-bg-section p-10 md:p-16 rounded-[3rem] border border-border-light shadow-xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">1. Information We Collect</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We collect information you provide directly to us when you place an order, create an account, or contact us. This includes your name, email address, phone number, and delivery address.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">2. How We Use Your Information</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We use your information to process and fulfill your orders, communicate with you about your order status, and provide customer support. We also use it to improve our website and services.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">3. Data Security</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">4. Cookies</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">5. Third-Party Disclosure</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.
          </p>
        </section>
      </div>
    </div>
  );
}
