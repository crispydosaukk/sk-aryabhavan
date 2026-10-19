'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
  title?: string;
  sideImageSrc?: string;
  sideImageAlt?: string;
}

export default function CateringOrangeFaq({
  faqs,
  title = 'Faqs',
  sideImageSrc,
  sideImageAlt = 'Arya Bhavan Catering FAQ',
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
        <h2 className="font-['Josefin_Sans',sans-serif] font-bold text-[28px] sm:text-[32px] text-center text-[#344e41] mb-6 sm:mb-8 tracking-wide">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column Image */}
          {sideImageSrc && (
            <div className="lg:col-span-5 relative w-full min-h-[340px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
              <Image
                src={sideImageSrc}
                alt={sideImageAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Right Column Orange FAQ Bars (Matching live site Elementor 20px font, 10px radius) */}
          <div className={sideImageSrc ? 'lg:col-span-7 space-y-2.5 flex flex-col justify-start' : 'max-w-4xl mx-auto w-full space-y-2.5'}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="overflow-hidden">
                  {/* Orange Question Bar (Live Site: 20px title, 10px rounded, #F68422, dark #202020 text) */}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full bg-[#f68422] hover:bg-[#e67516] text-[#202020] px-5 sm:px-6 py-3 sm:py-3.5 rounded-[10px] flex items-center justify-between text-left cursor-pointer transition-colors gap-3"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-['Josefin_Sans',sans-serif] font-normal text-[18px] sm:text-[20px] leading-snug text-[#202020]"
                    >{faq.q}</span>
                    <span className="shrink-0 text-[#202020] font-bold text-[20px] sm:text-[22px] leading-none select-none">+</span>
                  </button>

                  {/* Expandable Answer */}
                  {isOpen && (
                    <div className="bg-white border border-[#f68422]/30 p-4 rounded-b-[10px] text-[#202020] font-['Josefin_Sans',sans-serif] text-[16px] leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
