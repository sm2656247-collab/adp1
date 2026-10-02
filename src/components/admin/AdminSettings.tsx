import React, { useState } from 'react';
import { Save, ShieldCheck, Truck, CreditCard, Store } from 'lucide-react';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const currentSettings = StoreService.getSettings();

  const [storeName, setStoreName] = useState(currentSettings.storeName);
  const [brandTagline, setBrandTagline] = useState(currentSettings.brandTagline);
  const [phone, setPhone] = useState(currentSettings.phone);
  const [email, setEmail] = useState(currentSettings.email);
  const [address, setAddress] = useState(currentSettings.address);
  const [city, setCity] = useState(currentSettings.city);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(currentSettings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(currentSettings.standardShippingFee);
  const [expressShippingFee, setExpressShippingFee] = useState(currentSettings.expressShippingFee);
  const [allowCod, setAllowCod] = useState(currentSettings.allowCod);
  const [allowBankTransfer, setAllowBankTransfer] = useState(currentSettings.allowBankTransfer);
  const [allowOnlinePayment, setAllowOnlinePayment] = useState(currentSettings.allowOnlinePayment);
  const [announcementBarText, setAnnouncementBarText] = useState(currentSettings.announcementBarText);
  const [announcementDiscountCode, setAnnouncementDiscountCode] = useState(currentSettings.announcementDiscountCode);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StoreService.saveSettings({
      ...currentSettings,
      storeName,
      brandTagline,
      phone,
      email,
      address,
      city,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      expressShippingFee: Number(expressShippingFee),
      allowCod,
      allowBankTransfer,
      allowOnlinePayment,
      announcementBarText,
      announcementDiscountCode,
    });
    showToast('Store settings updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Store Settings & Configuration</h2>
        <p className="text-xs text-gray-500 mt-1">
          Configure business details, shipping thresholds, payment gateway methods, and promos.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs text-gray-800">
        {/* Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Store className="w-5 h-5 text-[#5A3E36]" />
            <h3 className="font-serif text-base font-bold text-gray-900">Brand & Store Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Store Name *</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Brand Subtitle / Tagline *</label>
              <input
                type="text"
                required
                value={brandTagline}
                onChange={(e) => setBrandTagline(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Helpline Phone *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Official Support Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Physical Flagship Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">City / Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Truck className="w-5 h-5 text-[#5A3E36]" />
            <h3 className="font-serif text-base font-bold text-gray-900">Shipping Rules in Pakistan</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Free Shipping Min Order (PKR) *</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Standard Shipping Fee (PKR)</label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Express Priority Fee (PKR)</label>
              <input
                type="number"
                value={expressShippingFee}
                onChange={(e) => setExpressShippingFee(Number(e.target.value))}
                className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways Enabled */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <CreditCard className="w-5 h-5 text-[#5A3E36]" />
            <h3 className="font-serif text-base font-bold text-gray-900">Supported Payment Gateways</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowCod}
                onChange={(e) => setAllowCod(e.target.checked)}
                className="w-4 h-4 accent-[#5A3E36]"
              />
              <div>
                <span className="font-bold text-gray-900">Cash on Delivery (COD)</span>
                <p className="text-[11px] text-gray-500">Collect cash upon courier delivery across Pakistan.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowBankTransfer}
                onChange={(e) => setAllowBankTransfer(e.target.checked)}
                className="w-4 h-4 accent-[#5A3E36]"
              />
              <div>
                <span className="font-bold text-gray-900">Direct Bank Transfer / 1LINK Raast</span>
                <p className="text-[11px] text-gray-500">Display Meezan Bank IBAN for direct electronic payments.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowOnlinePayment}
                onChange={(e) => setAllowOnlinePayment(e.target.checked)}
                className="w-4 h-4 accent-[#5A3E36]"
              />
              <div>
                <span className="font-bold text-gray-900">Debit / Credit Card Gateway</span>
                <p className="text-[11px] text-gray-500">Encrypted tokenized Visa & Mastercard gateway.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4 text-[#FFD7C4]" />
            <span>Save All Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
