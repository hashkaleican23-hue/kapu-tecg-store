import React from 'react';

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-[#E0E0E0] shadow-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#111111]">Terms & <span className="text-[#0000FF]">Conditions</span></h1>
          <p className="text-[#555555] mb-12">Last Updated: March 22, 2026</p>

          <div className="space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">1. Order Acceptance</h2>
              <p className="text-[#555555] leading-relaxed">
                All orders placed through KAPU Tech are subject to availability and confirmation. We reserve the right to cancel any order if the product is out of stock, if there is an error in pricing, or if we suspect fraudulent activity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">2. Pricing and Payment</h2>
              <p className="text-[#555555] leading-relaxed">
                Prices are listed in LKR (Sri Lankan Rupees). We currently accept Cash on Delivery (COD) and Bank Transfers. For Bank Transfers, orders will only be processed once the payment slip is verified by our finance team.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">3. Warranty Policy</h2>
              <p className="text-[#555555] leading-relaxed">
                Warranty periods vary by product. Please refer to the product detail page for specific warranty information. Warranty covers manufacturing defects only and does not cover physical damage, liquid damage, or misuse.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">4. Limitation of Liability</h2>
              <p className="text-[#555555] leading-relaxed">
                KAPU Tech shall not be liable for any indirect, incidental, or consequential damages arising from the use of products purchased from our store. Our total liability is limited to the purchase price of the product.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">5. Governing Law</h2>
              <p className="text-[#555555] leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">6. Modifications</h2>
              <p className="text-[#555555] leading-relaxed">
                We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on the website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
