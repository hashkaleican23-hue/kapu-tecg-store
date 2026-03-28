import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-[#E0E0E0] shadow-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#111111]">Privacy <span className="text-[#0000FF]">Policy</span></h1>
          <p className="text-[#555555] mb-12">Last Updated: March 22, 2026</p>

          <div className="space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">1. Information We Collect</h2>
              <p className="text-[#555555] leading-relaxed">
                At KAPU Tech, we collect information necessary to process your orders and provide support. This includes your name, phone number, and delivery address provided during checkout.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">2. How We Use Your Information</h2>
              <p className="text-[#555555] leading-relaxed">
                We use your information solely for:
              </p>
              <ul className="space-y-3">
                {[
                  "Processing and delivering your orders accurately.",
                  "Communicating with you via WhatsApp for order confirmation and status updates.",
                  "Providing technical support and warranty services for your purchased products.",
                  "Improving our website and customer service experience."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#555555]">
                    <div className="w-1.5 h-1.5 bg-[#0000FF] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">3. Data Security</h2>
              <p className="text-[#555555] leading-relaxed">
                We implement industry-standard security measures to protect your personal data. Your order information is stored securely in our database and is only accessible by authorized personnel. We do not store any credit card or payment information on our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">4. Third-Party Sharing</h2>
              <p className="text-[#555555] leading-relaxed">
                We do not sell or trade your personal information. We may share your delivery details with trusted courier partners solely for the purpose of delivering your order to your doorstep.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#111111]">5. Contact Us</h2>
              <p className="text-[#555555] leading-relaxed">
                If you have any questions about our Privacy Policy, please contact us via WhatsApp at +94 72 939 9609 or email us at support@kaputech.lk.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
