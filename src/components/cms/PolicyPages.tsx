import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HelpCircle, Ruler } from 'lucide-react';

interface PolicyPageProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms' | 'faq';
}

export const PolicyPages: React.FC<PolicyPageProps> = ({ type }) => {
  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#E8D8D1] shadow-sm">
        {/* Shipping Policy */}
        {type === 'shipping' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#B67B8D] text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Logistics Protocols</span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">
              Shipping & Delivery Policy
            </h1>
            <p>
              At Comfort Ladies Garments, every order is treated as a precious bespoke consignment.
              We partner with Pakistan's premier courier networks—TCS Express, Leopards Courier, and
              Trax Logistics—to ensure your garments arrive pristine, uncreased, and on schedule.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#5A3E36] pt-2">
              1. Delivery Timelines
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Major Metros (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 2 to 3 business days.</li>
              <li><strong>Secondary Cities & Regional Districts:</strong> 3 to 5 business days.</li>
              <li><strong>Express Priority Air Dispatch:</strong> 24 to 48 hours.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#5A3E36] pt-2">
              2. Shipping Charges
            </h3>
            <p>
              We are delighted to provide <strong>Free Shipping Across Pakistan</strong> on all orders
              exceeding <strong>PKR 5,000</strong>. For orders below this threshold, a flat nationwide
              courier fee of PKR 250 is applied at checkout.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#5A3E36] pt-2">
              3. Cash on Delivery (COD) Protocol
            </h3>
            <p>
              Our courier rider will deliver the sealed Comfort package and collect payment in Pakistani Rupees.
              Please ensure exact change is available whenever possible.
            </p>
          </div>
        )}

        {/* Return & Exchange Policy */}
        {type === 'returns' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#B67B8D] text-xs font-bold uppercase tracking-wider">
              <RotateCcw className="w-4 h-4" />
              <span>Customer Satisfaction Guarantee</span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">
              Return & Exchange Policy
            </h1>
            <p>
              Your delight is our single highest metric. If for any reason your selected size does not
              flatter you perfectly or you wish to exchange a piece, we offer a hassle-free 7-day
              exchange policy.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#5A3E36] pt-2">
              Conditions for Return
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be unworn, unwashed, and in original brand packaging.</li>
              <li>Original Comfort price tags and security seals must remain untampered.</li>
              <li>Return request must be initiated via your account portal within 7 days of delivery.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#5A3E36] pt-2">
              Size Exchanges
            </h3>
            <p>
              If your kurti or stitched suit feels slightly snug or roomy, simply select "Return / Exchange"
              under your Order History in the customer portal. Our courier rider will pick up your parcel
              and deliver the replacement size directly to your doorstep.
            </p>
          </div>
        )}

        {/* FAQs & Size Guide */}
        {type === 'faq' && (
          <div className="space-y-8 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <div>
              <div className="flex items-center gap-2 text-[#B67B8D] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Help & Sizing</span>
              </div>
              <h1 className="font-serif text-3xl font-medium text-[#5A3E36] mt-1">
                Frequently Asked Questions & Size Guide
              </h1>
            </div>

            {/* Official Size Guide Table */}
            <div className="p-6 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1] space-y-4">
              <div className="flex items-center gap-2 text-[#5A3E36] font-serif text-lg font-semibold">
                <Ruler className="w-5 h-5 text-[#B67B8D]" />
                <span>Official Comfort Sizing Chart (All measurements in Inches)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8D8D1] text-[#5A3E36] font-bold">
                      <th className="py-2">Size</th>
                      <th className="py-2">Chest</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Hip</th>
                      <th className="py-2">Shoulder</th>
                      <th className="py-2">Shirt Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D8D1]/60 font-medium">
                    <tr>
                      <td className="py-2 font-bold text-[#5A3E36]">Extra Small (XS)</td>
                      <td className="py-2">36"</td>
                      <td className="py-2">32"</td>
                      <td className="py-2">38"</td>
                      <td className="py-2">14"</td>
                      <td className="py-2">38"</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-[#5A3E36]">Small (S)</td>
                      <td className="py-2">38"</td>
                      <td className="py-2">34"</td>
                      <td className="py-2">40"</td>
                      <td className="py-2">14.5"</td>
                      <td className="py-2">39"</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-[#5A3E36]">Medium (M)</td>
                      <td className="py-2">41"</td>
                      <td className="py-2">37"</td>
                      <td className="py-2">43"</td>
                      <td className="py-2">15"</td>
                      <td className="py-2">40"</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-[#5A3E36]">Large (L)</td>
                      <td className="py-2">44"</td>
                      <td className="py-2">40"</td>
                      <td className="py-2">46"</td>
                      <td className="py-2">15.5"</td>
                      <td className="py-2">40"</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-[#5A3E36]">Extra Large (XL)</td>
                      <td className="py-2">47"</td>
                      <td className="py-2">43"</td>
                      <td className="py-2">49"</td>
                      <td className="py-2">16.5"</td>
                      <td className="py-2">41"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs Accordion items */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#E8D8D1]">
                <h4 className="font-bold text-[#5A3E36]">How do I care for pure embroidered lawn?</h4>
                <p className="mt-1 text-xs text-[#5A3E36]/75">
                  We recommend gentle hand-washing in cold water with mild detergent or dry cleaning.
                  Always dry inside out in shaded areas to preserve the brilliance of natural reactive dyes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8D8D1]">
                <h4 className="font-bold text-[#5A3E36]">Can I inspect my parcel before paying the courier rider?</h4>
                <p className="mt-1 text-xs text-[#5A3E36]/75">
                  Courier company regulations in Pakistan require parcel payment before box unsealing.
                  However, our 7-day hassle-free return and exchange guarantee completely protects you
                  in the rare event of an issue.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8D8D1]">
                <h4 className="font-bold text-[#5A3E36]">Are the garments pre-shrunk?</h4>
                <p className="mt-1 text-xs text-[#5A3E36]/75">
                  Yes, all Comfort lawn and cotton fabrics undergo industrial pre-shrinking prior to
                  tailoring so your garments maintain their precise fit after washing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Policy */}
        {type === 'privacy' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">Privacy Policy</h1>
            <p>
              Comfort Ladies Garments is committed to protecting your personal information. We never sell,
              rent, or distribute your email address, phone number, or home address to third parties.
            </p>
            <p>
              Your contact details are used exclusively for order fulfillment, courier dispatch tracking,
              and periodic Comfort circle invitations with your explicit consent.
            </p>
          </div>
        )}

        {/* Terms */}
        {type === 'terms' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">Terms & Conditions</h1>
            <p>
              By accessing and placing orders through Comfort Ladies Garments, you confirm your acceptance
              of our terms of service, payment guidelines, and exchange policies.
            </p>
            <p>
              All textile designs, photography, and brand insignias are the exclusive intellectual property
              of Comfort Ladies Garments (Pvt.) Ltd.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
