import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Building,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { CartItem, PaymentMethod, Address, Order } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface CheckoutPageProps {
  cart: CartItem[];
  onOrderPlaced: (order: Order) => void;
  onBackToCart: () => void;
  currentUser: { name: string; email: string; phone: string } | null;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  onOrderPlaced,
  onBackToCart,
  currentUser,
}) => {
  const { showToast } = useToast();
  const settings = StoreService.getSettings();

  // Multi-step progress (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');

  // Shipping Address
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Lahore');
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('54000');

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Online Card Simulation
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Coupon
  const [couponCode, setCouponCode] = useState('WELCOME10');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeThreshold = settings.freeShippingThreshold || 5000;
  const isFreeStandard = subtotal >= freeThreshold;

  const shippingFee =
    deliveryMethod === 'express'
      ? settings.expressShippingFee || 450
      : isFreeStandard
      ? 0
      : settings.standardShippingFee || 250;

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = StoreService.validateCoupon(couponCode, subtotal);
    if (res.valid) {
      setAppliedCoupon({ code: res.coupon!.code, discount: res.discount });
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!customerName || !customerEmail || !customerPhone) {
        showToast('Please provide your name, email, and phone number.', 'error');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!street || !city || !province) {
        showToast('Please enter your complete shipping street address and city.', 'error');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePlaceOrder = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      isDefault: true,
      fullName: customerName,
      phone: customerPhone,
      street,
      apartment,
      city,
      province,
      postalCode,
      country: 'Pakistan',
    };

    const orderItems = cart.map((c) => ({
      productId: c.productId,
      variantId: c.variantId,
      name: c.name,
      size: c.size,
      color: c.color,
      image: c.image,
      price: c.price,
      quantity: c.quantity,
      sku: `${c.productId}-${c.size}`,
    }));

    const result = StoreService.placeOrder({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items: orderItems,
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      deliveryMethod,
      tax: 0,
      total: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'online_card' ? 'paid' : 'pending',
    });

    setIsSubmitting(false);

    if (result.success && result.order) {
      showToast(`Order placed successfully! Order ID: ${result.order.id}`, 'success');
      onOrderPlaced(result.order);
    } else {
      showToast(result.error || 'Failed to place order. Please review your cart.', 'error');
    }
  };

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8D8D1] mb-8">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">Secure Checkout</h1>
            <p className="text-xs text-[#5A3E36]/70 mt-1">
              Encrypted 256-bit transactional checkout for Comfort Ladies Garments
            </p>
          </div>
          <button
            onClick={onBackToCart}
            className="flex items-center gap-1.5 text-xs text-[#B67B8D] hover:text-[#5A3E36] font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[#5A3E36]">
            {['Contact', 'Shipping', 'Delivery', 'Payment', 'Review'].map((stepName, idx) => {
              const stepNumber = idx + 1;
              const isDone = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;
              return (
                <div key={stepName} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#5A3E36] text-[#FFD7C4] shadow-md ring-4 ring-[#FFD7C4]/40'
                        : 'bg-white text-gray-400 border border-[#E8D8D1]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span className={`mt-1.5 text-[11px] ${isCurrent ? 'font-bold text-[#5A3E36]' : 'text-gray-500'}`}>
                    {stepName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8D1] shadow-sm">
            {/* Step 1: Customer Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Step 1: Contact Information
                  </h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    We will send order confirmation, packing status, and courier tracking to these details.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#5A3E36] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#5A3E36] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="ayesha.khan@example.com"
                        className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#5A3E36] mb-1">Phone Number (with WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Shipping Address</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Step 2: Shipping Destination in Pakistan
                  </h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Provide precise street and house details for rapid courier dispatch.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#5A3E36] mb-1">
                      Street Address & House / Plot No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. House 42-B, Street 7, Phase 5, DHA"
                      className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#5A3E36] mb-1">
                      Apartment, Floor, Suite (Optional)
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apartment 402, 4th Floor"
                      className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-[#5A3E36] mb-1">City *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#F8EDE3]/20 px-3 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bahawalpur">Bahawalpur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#5A3E36] mb-1">Province *</label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full bg-[#F8EDE3]/20 px-3 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#5A3E36] mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="54000"
                        className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 text-xs text-[#5A3E36] hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Delivery Method</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Delivery Method */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Step 3: Select Courier Dispatch Speed
                  </h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    All deliveries are handled by certified national couriers (TCS / Leopards).
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      deliveryMethod === 'standard'
                        ? 'border-[#5A3E36] bg-[#F8EDE3]/30 shadow-sm'
                        : 'border-[#E8D8D1] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#5A3E36]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#5A3E36]">Standard Nationwide Courier</h4>
                        <p className="text-[11px] text-[#5A3E36]/70">2 to 4 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#5A3E36]">
                      {isFreeStandard ? 'FREE' : `PKR ${settings.standardShippingFee}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      deliveryMethod === 'express'
                        ? 'border-[#5A3E36] bg-[#F8EDE3]/30 shadow-sm'
                        : 'border-[#E8D8D1] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#B67B8D]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#5A3E36]">Express Priority Air Dispatch</h4>
                        <p className="text-[11px] text-[#5A3E36]/70">1 to 2 business days (Same day dispatch)</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#5A3E36]">
                      PKR {settings.expressShippingFee || 450}
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 text-xs text-[#5A3E36] hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment Method */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Step 4: Payment Method
                  </h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Choose how you wish to settle your purchase.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#5A3E36] bg-[#F8EDE3]/30 shadow-sm'
                        : 'border-[#E8D8D1]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#5A3E36] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#5A3E36]">Cash on Delivery (COD)</h4>
                      <p className="text-[11px] text-[#5A3E36]/70 mt-0.5">
                        Pay cash directly to the TCS / Leopards courier rider when your parcel is handed over.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#5A3E36] bg-[#F8EDE3]/30 shadow-sm'
                        : 'border-[#E8D8D1]'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#5A3E36] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#5A3E36]">Direct Bank Transfer / Raast</h4>
                      <p className="text-[11px] text-[#5A3E36]/70 mt-0.5">
                        Account Name: Comfort Ladies Garments Pvt Ltd · Meezan Bank IBAN: PK36MEZN00010293847561
                      </p>
                    </div>
                  </label>

                  {/* Online Card */}
                  <label
                    onClick={() => setPaymentMethod('online_card')}
                    className={`flex flex-col p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'online_card'
                        ? 'border-[#5A3E36] bg-[#F8EDE3]/30 shadow-sm'
                        : 'border-[#E8D8D1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#5A3E36]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#5A3E36]">Credit or Debit Card (Visa / Mastercard)</h4>
                        <p className="text-[11px] text-[#5A3E36]/70">Secure 3D-secure encrypted card gateway</p>
                      </div>
                    </div>

                    {paymentMethod === 'online_card' && (
                      <div className="mt-4 pt-3 border-t border-[#E8D8D1] space-y-3 text-xs">
                        <div>
                          <label className="block font-medium text-[#5A3E36] mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            className="w-full bg-white px-3 py-2 rounded-lg border border-[#E8D8D1]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-medium text-[#5A3E36] mb-1">MM / YY</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full bg-white px-3 py-2 rounded-lg border border-[#E8D8D1]"
                            />
                          </div>
                          <div>
                            <label className="block font-medium text-[#5A3E36] mb-1">CVC / CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              className="w-full bg-white px-3 py-2 rounded-lg border border-[#E8D8D1]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 text-xs text-[#5A3E36] hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Review Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Final Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Step 5: Review & Confirm Order
                  </h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Please double-check your recipient details before placing the order.
                  </p>
                </div>

                <div className="space-y-4 text-xs divide-y divide-[#E8D8D1]">
                  <div className="py-2">
                    <span className="font-bold text-[#5A3E36]">Recipient:</span>
                    <p className="text-[#5A3E36]/80 mt-0.5">
                      {customerName} · {customerPhone} · {customerEmail}
                    </p>
                  </div>

                  <div className="py-2">
                    <span className="font-bold text-[#5A3E36]">Deliver To:</span>
                    <p className="text-[#5A3E36]/80 mt-0.5">
                      {street} {apartment && `, ${apartment}`}, {city}, {province} ({postalCode})
                    </p>
                  </div>

                  <div className="py-2">
                    <span className="font-bold text-[#5A3E36]">Payment:</span>
                    <p className="text-[#5A3E36]/80 mt-0.5 capitalize">
                      {paymentMethod.replace('_', ' ')} (
                      {deliveryMethod === 'express' ? 'Express Courier' : 'Standard Delivery'})
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 text-xs text-[#5A3E36] hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-[#B67B8D] hover:bg-[#9D6475] disabled:bg-gray-400 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Securing Inventory...' : `Confirm & Place Order (PKR ${grandTotal.toLocaleString()})`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#E8D8D1] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#5A3E36]">
                Order Items ({cart.length})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#E8D8D1]/60 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg border border-[#E8D8D1] shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-semibold text-[#5A3E36] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#5A3E36]/60">
                        {item.size} · {item.color} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-xs text-[#5A3E36] tabular-nums">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-[#E8D8D1]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 bg-[#F8EDE3]/30 px-3 py-2 text-xs rounded-xl border border-[#E8D8D1] uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#5A3E36] text-white rounded-xl text-xs font-semibold hover:bg-[#462F29] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {appliedCoupon && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex justify-between">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span className="font-bold">- PKR {appliedCoupon.discount.toLocaleString()}</span>
                </div>
              )}

              {/* Cost Calculation */}
              <div className="pt-3 border-t border-[#E8D8D1] space-y-2 text-xs text-[#5A3E36]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#5A3E36]">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span className="font-bold tabular-nums">
                      - PKR {discount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold tabular-nums text-[#5A3E36]">
                    {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#5A3E36] pt-3 border-t border-[#E8D8D1]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
