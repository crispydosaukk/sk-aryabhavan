'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const cateringServices = [
  {
    title: 'Wedding',
    desc: 'Celebrate your special day with authentic South Indian flavors from Arya Bhavan—where every bite is pure tradition and taste.',
    icon: '/images/migrated/arch_721925.svg'
  },
  {
    title: 'Corporate Events & Parties',
    desc: 'Make your corporate events stand out with Arya Bhavan’s curated catering—where every dish adds flavor to your business success.',
    icon: '/images/migrated/reusable_13285272.svg'
  },
  {
    title: 'Home Functions',
    desc: 'Hosting a celebration at home? Arya Bhavan brings authentic South Indian street food to your doorstep—fresh, flavorful, and irresistible.',
    icon: '/images/migrated/accommodation_17456109.svg'
  },
  {
    title: 'Live Dosa Stations',
    desc: 'Add a fun twist to your event with Arya Bhavan’s live food stations—freshly prepared, aromatic, and truly satisfying.',
    icon: '/images/migrated/chef_9725777.svg'
  }
];

interface CateringSectionLiveProps {
  cateringData?: {
    title?: string;
    subtitle?: string;
    services?: { title: string; desc: string }[];
  };
}

export default function CateringSectionLive({ cateringData }: CateringSectionLiveProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pax: '',
    eventType: 'Catering',
    eventDate: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: `Catering: ${formData.eventType}`,
          ...formData
        })
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="catering-live" className="py-10 sm:py-[50px] bg-[#ECE6DF]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Exact live site Elementor styling */}
        <div className="text-center mb-5 pt-4">
          <h2 className="font-ivymode text-2xl font-semibold uppercase tracking-[1px] text-[#344E41] sm:text-[28px] lg:text-[32px] lg:leading-[56px]">
            {cateringData?.title || 'CATERING SERVICES'}
          </h2>
        </div>

        {/* 2-Column Exact Layout: Left 70% cards container + Right 30% Enquire Now container */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12 lg:gap-5">
          
          {/* Left Column (70%): White container with hover scale & shadow */}
          <div className="flex flex-col justify-start rounded-[10px] bg-white p-2.5 transition-all duration-300 hover:scale-[1.01] hover:shadow-[2px_0px_9px_1px_#F5852296] lg:col-span-8">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {cateringServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-[10px] border border-[#344E41] bg-white p-1.5 px-4 text-center min-h-[240px] sm:min-h-[255px]"
                >
                  {/* Service Icon: Exact 70px live site SVG */}
                  <div className="mb-2 flex h-[70px] w-[70px] items-center justify-center">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="h-[70px] w-[70px] object-contain"
                    />
                  </div>

                  {/* Service Title: Exact Josefin Sans font, #344E41, same size & weight as live site */}
                  <h3 className="mb-2 font-['Josefin_Sans',sans-serif] text-[22px] sm:text-[24px] font-bold leading-tight text-[#344E41]">
                    {service.title}
                  </h3>

                  {/* Service Description: Josefin Sans, 16px, #000000, 1.4 line-height */}
                  <p className="font-['Josefin_Sans',sans-serif] text-[15px] sm:text-[16px] font-normal leading-[1.4] text-[#000000]">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (30%): Enquire Now Container with hover scale & shadow */}
          <div className="flex flex-col justify-start rounded-[10px] bg-white p-2.5 transition-all duration-300 hover:scale-[1.01] hover:shadow-[2px_0px_9px_1px_#F5852296] lg:col-span-4">
            <h2 className="font-ivymode text-2xl font-semibold uppercase tracking-[1px] text-[#344E41] sm:text-[28px] lg:text-[32px] lg:leading-[56px] text-left pt-2 pb-1 px-1.5">
              ENQUIRE NOW
            </h2>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-green-50 border border-green-200 text-center space-y-3 my-auto font-josefin">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="font-josefin font-bold text-lg text-green-900">Enquiry Received!</h4>
                <p className="text-xs text-green-700">
                  Thank you! An Arya Bhavan catering representative will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2 bg-[#f68422] hover:bg-[#366732] text-white text-xs font-bold rounded-[10px] transition-colors cursor-pointer mt-2"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0.5 font-['Josefin_Sans',sans-serif] px-1">
                <div className="mb-1">
                  <label htmlFor="home-catering-name" className="mb-0.5 block font-['Josefin_Sans',sans-serif] text-[15px] font-normal text-[#202020]">
                    Full Name
                  </label>
                  <input
                    id="home-catering-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-[10px] border-0 bg-[#F9F4EF] px-3.5 py-2 font-['Josefin_Sans',sans-serif] text-[15px] text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#366732]"
                    placeholder="Full Name"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="home-catering-email" className="mb-0.5 block font-['Josefin_Sans',sans-serif] text-[15px] font-normal text-[#202020]">
                    Email
                  </label>
                  <input
                    id="home-catering-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-[10px] border-0 bg-[#F9F4EF] px-3.5 py-2 font-['Josefin_Sans',sans-serif] text-[15px] text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#366732]"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="home-catering-phone" className="mb-0.5 block font-['Josefin_Sans',sans-serif] text-[15px] font-normal text-[#202020]">
                    Phone Number
                  </label>
                  <input
                    id="home-catering-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-[10px] border-0 bg-[#F9F4EF] px-3.5 py-2 font-['Josefin_Sans',sans-serif] text-[15px] text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#366732]"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="home-catering-pax" className="mb-0.5 block font-['Josefin_Sans',sans-serif] text-[15px] font-normal text-[#202020]">
                    No. of Pax ( Min 25 )
                  </label>
                  <input
                    id="home-catering-pax"
                    type="number"
                    min="25"
                    max="1000"
                    required
                    value={formData.pax}
                    onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                    className="w-full rounded-[10px] border-0 bg-[#F9F4EF] px-3.5 py-2 font-['Josefin_Sans',sans-serif] text-[15px] text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#366732]"
                    placeholder="No. of pax"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="home-catering-message" className="mb-0.5 block font-['Josefin_Sans',sans-serif] text-[15px] font-normal text-[#202020]">
                    Message
                  </label>
                  <textarea
                    id="home-catering-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-y rounded-[10px] border-0 bg-[#F9F4EF] px-3.5 py-2 font-['Josefin_Sans',sans-serif] text-[15px] text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#366732]"
                    placeholder="Message"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" /> Failed to submit. Please call 020 7839 8797.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-[#F68422] py-3 font-['Josefin_Sans',sans-serif] text-[18px] font-extrabold text-white transition-colors hover:bg-[#366732] shadow-sm uppercase tracking-wide"
                >
                  {status === 'submitting' ? 'Submitting...' : 'SUBMIT'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
