import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <h1 className="text-5xl font-black tracking-tighter text-text-primary mb-12">Terms & <span className="text-primary">Conditions</span></h1>
      <div className="bg-bg-section p-10 md:p-16 rounded-[3rem] border border-border-light shadow-xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">1. Acceptance of Terms</h2>
          <p className="text-text-secondary font-medium leading-loose">
            By accessing and using the KAPU Tech website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">2. Product Information</h2>
          <p className="text-text-secondary font-medium leading-loose">
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site. However, we do not guarantee that the product descriptions or other content are accurate, complete, reliable, current, or error-free.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">3. Pricing and Availability</h2>
          <p className="text-text-secondary font-medium leading-loose">
            All prices are listed in Sri Lankan Rupees (LKR). We reserve the right to change prices and availability without notice. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">4. Order Confirmation</h2>
          <p className="text-text-secondary font-medium leading-loose">
            An order is only considered confirmed once we have contacted you via WhatsApp or phone and verified the details. We reserve the right to refuse or cancel any order for any reason.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-text-primary">5. Warranty and Liability</h2>
          <p className="text-text-secondary font-medium leading-loose">
            Warranty terms are specific to each product and are provided by the respective manufacturers or local distributors. KAPU Tech is not liable for any indirect, incidental, or consequential damages arising from the use of products purchased from us.
          </p>
        </section>
      </div>
    </div>
  );
}
