import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const settings = StoreService.getSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const ticket = StoreService.createSupportTicket({
      name,
      email,
      phone,
      orderNumber,
      subject,
      message,
    });

    setSubmittedTicketId(ticket.id);
    showToast(`Support Ticket ${ticket.id} submitted! Our team will respond shortly.`, 'success');
    setName('');
    setEmail('');
    setPhone('');
    setOrderNumber('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            We Are Here To Assist You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36] mt-1.5">
            Customer Care & Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-2">
            Reach out for size consultations, order inquiries, bespoke requests, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8D1] shadow-sm space-y-6 text-xs text-[#5A3E36]">
              <h3 className="font-serif text-xl font-medium text-[#5A3E36]">
                Comfort Flagship Store
              </h3>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#B67B8D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{settings.storeName} Ladies Garments</p>
                  <p className="text-[#5A3E36]/70 mt-0.5">{settings.address}</p>
                  <p className="text-[#5A3E36]/70">{settings.city}, {settings.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#B67B8D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Helpline & WhatsApp</p>
                  <p className="text-[#5A3E36]/70 mt-0.5">{settings.phone}</p>
                  <p className="text-[#5A3E36]/50">Mon-Sat, 10:00 AM – 8:00 PM PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#B67B8D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Email Concierge</p>
                  <p className="text-[#5A3E36]/70 mt-0.5">{settings.email}</p>
                  <p className="text-[#5A3E36]/50">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#E8D8D1]">
                <Clock className="w-5 h-5 text-[#B67B8D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Customer Service Hours</p>
                  <p className="text-[#5A3E36]/70 mt-0.5">Monday to Saturday: 10:00 AM – 8:00 PM</p>
                  <p className="text-[#5A3E36]/70">Sunday: Closed for Eid & dispatch rest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8D1] shadow-sm">
            <h2 className="font-serif text-xl font-medium text-[#5A3E36] mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#5A3E36]/70 mb-6">
              Fill in your details and an assigned Comfort customer advocate will contact you.
            </p>

            {submittedTicketId && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Support Request Logged (#{submittedTicketId})</p>
                  <p className="text-[11px] text-emerald-700">
                    A customer representative has received your inquiry. Check your email for updates.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A3E36] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatima Zahra"
                    className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A3E36] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fatima@example.com"
                    className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A3E36] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A3E36] mb-1">Order # (If applicable)</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. COM-2026-004812"
                    className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5A3E36] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Sizing inquiry regarding Stitched Suits"
                  className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A3E36] mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our tailoring or care experts help you today?"
                  className="w-full bg-[#F8EDE3]/20 px-3.5 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Support Ticket</span>
                <Send className="w-3.5 h-3.5 text-[#FFD7C4]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
