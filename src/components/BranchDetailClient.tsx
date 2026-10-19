'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import centralLondonMenuData from '@/data/centralLondonMenu.json';
import { BranchData } from '@/data/branchesDetailedData';

interface MenuItem {
  title: string;
  desc: string;
  img?: string;
}

interface MenuCategory {
  category: string;
  itemsCount: number;
  items: MenuItem[];
}

function DeliveryScooterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_22" viewBox="0 0 2000 2000" className={className} fill="currentColor">
      <path d="m1999.846 1470.997c1.369-18.706-6.483-36.962-21.007-48.839-66.997-54.781-151.725-84.154-238.444-82.453-.041.001-.083.004-.124.004-.354-.898-.726-1.795-1.163-2.676l-180.508-364.105h59.455c18.658 0 33.783-15.125 33.783-33.783v-230.025c0-18.659-15.125-33.783-33.783-33.783h-68.165c-67.569 0-124.724 45.286-142.806 107.089-3.979-1.352-8.064-2.471-12.256-3.301l-131.454-26.034c-25.75-5.103-47.955-22.247-59.4-45.869l-77.966-160.915c-30.473-71.365-109.006-87.941-122.381-90.276-56.297-13.193-107.767-3.732-148.924 27.379-34.79 26.302-60.844 66.959-75.289 117.385-3.662 12.496-89.778 306.434-98.942 338.828-15.863 56.078-11.9 104.969 11.665 145.57h-64.688v-396.946c0-18.659-15.125-33.783-33.783-33.783h-559.883c-18.658-.001-33.783 15.124-33.783 33.783v430.729c0 18.659 15.125 33.784 33.783 33.784h209.564c-6.211 14.009-9.689 29.487-9.689 45.77 0 53.462 37.221 98.368 87.103 110.239-6.452 21.651-14.425 40.058-20.831 46.777-30.98 14.11-60.086 32.496-86.288 54.949-65.463 56.089-109.18 133.591-123.097 218.222-3.833 23.303 2.757 47.02 18.074 65.063 15.381 18.116 37.83 28.508 61.586 28.508h19.023c16.652 130.027 127.943 230.872 262.423 230.872s245.771-100.845 262.423-230.872h667.667c.808 17.901 2.905 35.717 6.281 53.175 3.57 18.457 15.94 34.051 33.092 41.716 7.489 3.347 15.494 5.004 23.479 5.004 10.271 0 20.51-2.742 29.564-8.156l21.493-12.858c43.068 91.25 136.233 151.991 239.516 151.991 145.931 0 264.654-118.722 264.654-264.655 0-57.77-18.308-112.443-52.139-157.76l24.306-14.541c16.076-9.62 26.492-26.519 27.859-45.207zm-449.955-728.094h34.381v162.458h-34.381c-44.792 0-81.231-36.437-81.231-81.229 0-44.791 36.439-81.229 81.231-81.229zm-705.58-123.308c13.244-46.229 49.654-120.372 144.764-97.575.999.238 1.811.403 2.828.55.544.088 54.732 9.076 72.164 50.738.238.568.491 1.133.763 1.69l78.342 161.689c20.631 42.578 60.657 73.487 107.075 82.681l131.455 26.034c7.13 1.415 13.281 5.521 17.317 11.566 4.038 6.045 5.473 13.299 4.045 20.429-2.9 14.469-17.066 24.043-31.58 21.382l-192.655-35.62c-25.473-4.71-47.023-20.546-59.123-43.454l-53.137-100.581c-6.318-11.957-19.19-19-32.641-17.889-13.481 1.111-25 10.154-29.278 22.988l-57.099 171.297-173.001-37.47c29.1-99.67 69.124-236.278 69.761-238.455zm332.4 379.225c-.541-.125-1.085-.238-1.631-.334l-179.911-32.159 48.582-145.75 16.212 30.69c21.815 41.291 60.661 69.844 106.582 78.33l153.619 28.402c70.455 108 124.007 342.492 50.882 483.369-23.464 45.204-58.609 76.949-104.963 95.049l22.871-388.18c3.97-70.703-43.235-133.541-112.243-149.417zm-431.223-40.804c1.482-5.24 5.099-17.737 10.102-34.94l170.688 36.968c-3.587 14.224-1.678 29.404 5.547 42.28 7.927 14.124 21.525 24.311 37.312 27.944.541.125 1.087.234 1.635.333l191.53 34.238c36.443 8.754 61.297 42.108 59.196 79.514l-24.045 408.111c-11.971 1.248-24.432 1.884-37.397 1.884-13.742 0-26.999-.25-39.768-.746l23.274-306.227c3.534-43.12-26.815-81.614-69.347-88.407-6.769-1.547-34.19-7.471-72.303-11.21-130.31-12.779-216.013-44.198-247.846-90.859-17.385-25.483-20.192-57.83-8.578-98.883zm330.717 284.041-23.262 306.053c-85.084-11.135-139.25-37.053-158.563-76.589-25.27-51.728 12.262-125.578 36.363-161.16 47.281-7.729 84.796-44.809 93.2-91.862 22.028 3.217 35.823 6.475 35.988 6.515 1.087.264 2.187.473 3.294.627 7.942 1.1 13.651 8.223 12.98 16.416zm-789.122-520.027h53.282v64.213h-53.282zm-219.516 363.162v-363.162h151.949v97.996c0 18.659 15.125 33.784 33.783 33.784h120.848c18.659 0 33.783-15.125 33.783-33.784v-97.996h151.951v363.162zm233.658 113.337c0-25.239 20.532-45.77 45.77-45.77h415.227c46.503 27.527 110.929 46.636 194.304 57.761-5.289 19.431-23.041 33.78-44.125 33.78h-565.405c-25.239 0-45.771-20.532-45.771-45.771zm150.426 687.063c-97.152 0-178.054-70.679-194.13-163.305h46.461c15.399 67.33 75.739 117.729 147.669 117.729s132.269-50.398 147.668-117.729h46.462c-16.076 92.626-96.978 163.305-194.13 163.305zm-76.823-163.305h153.645c-13.028 29.507-42.55 50.162-76.822 50.162s-63.795-20.655-76.823-50.162zm-204.624-67.567c-5.317 0-8.598-2.929-10.079-4.674-1.444-1.701-3.741-5.308-2.909-10.37 23.779-144.613 147.608-249.575 294.434-249.575 153.122 0 279.676 115.922 296.504 264.619zm1214.714 0h-568.841c-17.111-186.015-174.022-332.186-364.426-332.186-22.309 0-44.431 2.07-66.119 6.054 1.728-5.833 3.236-11.459 4.536-16.721h461.569c-25.272 49.041-50.145 123.144-18.08 189.079 39.035 80.269 148.886 120.97 326.498 120.97 159.847 0 235.575-81.255 270.959-149.419 76.727-147.814 37.468-373.873-30.142-509.006 18.63-5.06 35.362-15.738 47.835-30.394 7.251 6.738 15.16 12.776 23.64 17.975l196.811 396.986c-68.437 14.967-131.387 49.543-181.95 100.773-56.069 56.807-91.46 128.597-102.29 205.889zm67.07 93.832c-2.121-14.751-3.149-29.744-3.059-44.74.94-160.549 132.253-293.582 292.719-296.555 1.853-.033 3.695-.051 5.545-.051 64.037 0 126.404 20.594 177.609 58.49l-43.966 26.302c-1.804.871-3.544 1.903-5.201 3.112zm367.122-60.048c0 46.287-37.658 83.945-83.945 83.945-39.976 0-73.494-28.098-81.896-65.575l136.806-81.843c18.365 15.821 29.035 38.695 29.035 63.473zm-83.945 197.088c-79.23 0-150.447-47.983-181.146-119.343l39.63-23.708c21.814 56.932 77.004 97.476 141.516 97.476 83.544 0 151.512-67.967 151.512-151.512 0-37.232-13.343-72.078-36.912-99.183l39.51-23.637c27.838 34.75 42.976 77.503 42.976 122.82.001 108.673-88.411 197.087-197.086 197.087zm-696.588-1432.77c107.762 0 196.141-84.418 202.576-190.59h69.32c18.659 0 33.783-15.125 33.783-33.783s-15.125-33.783-33.783-33.783h-76.586c-24.1-85.196-102.502-147.825-195.309-147.825-103.425 0-188.973 77.768-201.385 177.889-.013.118-.033.234-.045.353-.992 8.119-1.563 16.367-1.563 24.749-.001 111.929 91.062 202.99 202.992 202.99zm0-338.414c55.031 0 102.465 33.014 123.631 80.258h-247.263c21.165-47.244 68.601-80.258 123.632-80.258zm134.831 147.824c-6.286 68.878-64.341 123.022-134.832 123.022-70.49 0-128.547-54.145-134.834-123.022z" />
    </svg>
  );
}

export default function BranchDetailClient({ branch }: { branch: BranchData }) {
  const categories = centralLondonMenuData as MenuCategory[];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [faqImageIndex, setFaqImageIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex] || categories[0];

  const faqCarouselImages = [
    '/images/migrated/thali2.jpg',
    '/images/migrated/WhatsApp-Image-2025-12-09-at-17.36.52-10.jpeg',
    '/images/migrated/WhatsApp-Image-2025-12-09-at-17.36.52-6.jpeg',
    '/images/migrated/WhatsApp-Image-2025-12-09-at-17.33.13.jpeg',
    '/images/migrated/WhatsApp-Image-2025-12-09-at-17.36.52-14.jpeg',
    '/images/migrated/South-indian.jpg'
  ];

  // Auto transition carousel every 5 seconds (5000ms) matching Elementor background_slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setFaqImageIndex((prev) => (prev + 1) % faqCarouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [faqCarouselImages.length]);

  const introFeatures = [
    {
      title: 'Traditional recipes',
      img: '/images/migrated/Screenshot-2026-02-25-103420.png',
    },
    {
      title: 'Freshly prepared daily',
      img: '/images/migrated/Screenshot-2026-02-25-103428.png',
    },
    {
      title: 'Family friendly dining',
      img: '/images/migrated/Screenshot-2026-02-25-103446.png',
    },
    {
      title: 'Vegan & Jain friendly',
      img: '/images/migrated/Screenshot-2026-02-25-103437.png',
    },
  ];

  const whyGuestsLove = [
    {
      title: 'Authentic Taste',
      desc: 'Prepared by Indian cooking techniques',
      img: '/images/migrated/Screenshot-2026-02-25-104846-e1774635366152.png'
    },
    {
      title: 'Pure Vegetarian',
      desc: '100% pure – completely vegetarian kitchen',
      img: '/images/migrated/Screenshot-2026-02-25-104933.png'
    },
    {
      title: 'Fresh Batter Daily',
      desc: 'Idli & dosa batter fermented fresh every day',
      img: '/images/migrated/Screenshot-2026-02-25-104922.png'
    },
    {
      title: 'Diet Friendly',
      desc: 'Vegan & Jain friendly menu available',
      img: '/images/migrated/Screenshot-2026-02-25-104933.png'
    },
    {
      title: 'Family Friendly',
      desc: 'Comfortable atmosphere for all age groups',
      img: '/images/migrated/Screenshot-2026-02-25-104939.png'
    },
    {
      title: 'Central Location',
      desc: 'Convenient transport links and local parking',
      img: '/images/migrated/Screenshot-2026-02-25-104947.png'
    }
  ];

  const whatWeOffer = [
    {
      title: '100% Vegetarian Kitchen',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 576 512" fill="currentColor">
          <path d="M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z" />
        </svg>
      )
    },
    {
      title: 'Vegan Options Available',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M934.4 592c-32-22.4-67.2-16-96-9.6-6.4 0-9.6 3.2-16 3.2-54.4-118.4-112-310.4 16-441.6 9.6-9.6 12.8-22.4 6.4-35.2s-16-19.2-28.8-19.2c-70.4 0-134.4 12.8-201.6 35.2C576 86.4 467.2 0 352 0 214.4 0 80 131.2 73.6 137.6S64 150.4 64 160c0 9.6 3.2 16 9.6 22.4s121.6 118.4 249.6 134.4c-60.8 73.6-115.2 166.4-128 265.6h-6.4c-28.8-6.4-64-12.8-96 12.8C32 636.8 0 700.8 0 771.2 0 892.8 99.2 992 224 992s224-99.2 224-220.8c0-70.4-35.2-134.4-89.6-179.2-32-22.4-67.2-16-96-9.6h-3.2c16-105.6 89.6-208 156.8-272 102.4-25.6 188.8-105.6 208-124.8 41.6-16 80-25.6 121.6-32-70.4 108.8-67.2 256 3.2 425.6-25.6-3.2-57.6-6.4-86.4 12.8C608 636.8 576 700.8 576 771.2 576 892.8 675.2 992 800 992s224-99.2 224-220.8c0-70.4-35.2-137.6-89.6-179.2zm-659.2 51.2c25.6-6.4 38.4-6.4 44.8 0C361.6 672 384 720 384 768c0 86.4-70.4 156.8-160 156.8S64 854.4 64 768c0-51.2 22.4-96 64-124.8 3.2-3.2 9.6-3.2 16-3.2s16 3.2 32 3.2c16 3.2 32 6.4 51.2 6.4 16 0 32-3.2 48-6.4zM352 256c-83.2 0-166.4-60.8-208-96 41.6-35.2 128-96 208-96 83.2 0 166.4 60.8 208 96-41.6 35.2-124.8 96-208 96zm448 672c-89.6 0-160-70.4-160-156.8 0-51.2 22.4-96 64-124.8 3.2-3.2 9.6-3.2 16-3.2s16 3.2 32 3.2c16 3.2 32 6.4 51.2 6.4H812.8c12.8 0 25.6-3.2 38.4-6.4 25.6-6.4 38.4-6.4 44.8 0 41.6 28.8 64 76.8 64 124.8 0 86.4-70.4 156.8-160 156.8z" />
        </svg>
      )
    },
    {
      title: 'Jain Friendly Dishes',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M608 288c-19.2 0-32 12.8-32 32v128h-32V320c0-19.2-12.8-32-32-32s-32 12.8-32 32v128h-32V320c0-19.2-12.8-32-32-32s-32 12.8-32 32v128c0 35.2 28.8 64 64 64h32v96h-32c-19.2 0-32 12.8-32 32v160c0 54.4 41.6 96 96 96s96-41.6 96-96V640c0-19.2-12.8-32-32-32h-32v-96h32c35.2 0 64-28.8 64-64V320c0-19.2-12.8-32-32-32zm-64 512c0 19.2-12.8 32-32 32s-32-12.8-32-32V672h64v128zm384 192V96c0-19.2-12.8-32-32-32H736V32c0-19.2-12.8-32-32-32s-32 12.8-32 32v32H544V32c0-19.2-12.8-32-32-32s-32 12.8-32 32v32H352V32c0-19.2-12.8-32-32-32s-32 12.8-32 32v32H128c-19.2 0-32 12.8-32 32v896c0 19.2 12.8 32 32 32h768c19.2 0 32-12.8 32-32zm-64-32H160V128h128v32c0 19.2 12.8 32 32 32s32-12.8 32-32v-32h128v32c0 19.2 12.8 32 32 32s32-12.8 32-32v-32h128v32c0 19.2 12.8 32 32 32s32-12.8 32-32v-32h128v832z" />
        </svg>
      )
    },
    {
      title: 'Fresh Filter Coffee',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M416 32v96c0 19.2 12.8 32 32 32s32-12.8 32-32V32c0-19.2-12.8-32-32-32s-32 12.8-32 32zM256 96v96c0 19.2 12.8 32 32 32s32-12.8 32-32V96c0-19.2-12.8-32-32-32s-32 12.8-32 32zm320 0v96c0 19.2 12.8 32 32 32s32-12.8 32-32V96c0-19.2-12.8-32-32-32s-32 12.8-32 32zM0 864c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160 0-19.2-12.8-32-32-32H659.2c86.4-57.6 147.2-150.4 166.4-256H864c54.4 0 96-41.6 96-96V320c0-19.2-12.8-32-32-32H96c-19.2 0-32 12.8-32 32v192c0 134.4 67.2 249.6 172.8 320H32c-19.2 0-32 12.8-32 32zm896-384c0 19.2-12.8 32-32 32h-32V352h64v128zm-768 32V352h640v160c0 176-144 320-320 320S128 688 128 512zm697.6 384c-12.8 38.4-48 64-89.6 64H160c-41.6 0-76.8-25.6-89.6-64h755.2z" />
        </svg>
      )
    },
    {
      title: 'Live Dosa Catering',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M512 160c-195.2 0-352 156.8-352 352s156.8 352 352 352 352-156.8 352-352-156.8-352-352-352zm0 640c-160 0-288-128-288-288s128-288 288-288 288 128 288 288-128 288-288 288zm0-800C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zm0 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z" />
        </svg>
      )
    },
    {
      title: 'Outdoor Catering Service',
      svg: (
        <svg className="w-9 h-9" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M448 544h128c19.2 0 32-12.8 32-32s-12.8-32-32-32H448c-19.2 0-32 12.8-32 32s12.8 32 32 32zm544-192h-57.6C864 246.4 758.4 176 640 144V32c0-19.2-12.8-32-32-32H416c-19.2 0-32 12.8-32 32v112C265.6 176 160 246.4 89.6 352H32c-19.2 0-32 12.8-32 32s12.8 32 32 32h32v32c0 182.4 108.8 339.2 265.6 409.6L259.2 976c-6.4 16-3.2 35.2 12.8 44.8 3.2 3.2 9.6 3.2 16 3.2 9.6 0 22.4-6.4 28.8-16l76.8-128c38.4 9.6 76.8 16 118.4 16s80-6.4 118.4-16l76.8 128c6.4 9.6 16 16 28.8 16 6.4 0 12.8 0 16-3.2 16-9.6 19.2-28.8 9.6-44.8l-70.4-118.4C851.2 787.2 960 630.4 960 448v-32h32c19.2 0 32-12.8 32-32s-12.8-32-32-32zM448 64h128v67.2c-22.4-3.2-41.6-3.2-64-3.2s-41.6 0-64 3.2V64zm64 128c134.4 0 259.2 57.6 342.4 160H169.6c83.2-102.4 208-160 342.4-160zm384 256c0 211.2-172.8 384-384 384S128 659.2 128 448v-32h768v32z" />
        </svg>
      )
    }
  ];

  // Helper to colorize dietary symbols in dish title e.g. (V G J N) exactly as on live site
  const renderDishTitle = (title: string) => {
    const regex = /\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(title)) !== null) {
      if (match.index > lastIdx) {
        parts.push(title.substring(lastIdx, match.index));
      }
      const tagsStr = match[1];
      const tags = tagsStr.split(/[\s,]+/);

      parts.push(
        <span key={match.index} className="inline-flex items-center gap-1 ml-1 text-[13px] font-bold">
          <span>(</span>
          {tags.map((t, ti) => {
            let color = 'text-gray-600';
            if (t.includes('V')) color = 'text-[#16a34a]';
            else if (t.includes('G')) color = 'text-[#1d4ed8]';
            else if (t.includes('J')) color = 'text-[#d97706]';
            else if (t.includes('N')) color = 'text-[#dc2626]';
            else if (t.includes('?')) color = 'text-[#7c3aed]';
            return (
              <span key={ti} className={color}>
                {t}
              </span>
            );
          })}
          <span>)</span>
        </span>
      );
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < title.length) {
      parts.push(title.substring(lastIdx));
    }

    return parts;
  };

  return (
    <div className="min-h-screen bg-white font-['Josefin_Sans',sans-serif] text-[#202020] overflow-x-hidden">
      
      {/* 1. HERO SECTION (Only when branch has hero enabled) */}
      {branch.hasHero !== false && (
        <section className="relative w-full h-[520px] sm:h-[640px] lg:h-[800px] select-none overflow-hidden bg-black">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={branch.hero.bgImage}
              alt={`${branch.hero.titleLine1} ${branch.hero.titleLine2}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              quality={95}
            />
            {/* Subtle overlay keeping images bright, vivid, and clearly visible */}
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Live slide copy begins 40% down matching live site */}
          <div className="absolute left-[8%] sm:left-[40px] lg:left-[84px] top-[38%] sm:top-[40%] z-20 max-w-[90%] sm:max-w-[700px] lg:max-w-[800px] text-left">
            <h1 className="m-0 font-['Josefin_Sans',sans-serif] text-[22px] sm:text-[26px] lg:text-[30px] font-semibold uppercase leading-[1.4] tracking-normal text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {branch.hero.titleLine1}<br />
              {branch.hero.titleLine2}
            </h1>

            <p className="font-['Josefin_Sans',sans-serif] text-[15px] sm:text-[20px] lg:text-[24px] font-semibold text-white tracking-[2px] leading-[1.25] mt-4 sm:mt-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {branch.hero.subtitle}
            </p>

            <div className="pt-6 sm:pt-8">
              <a
                href={branch.hero.orderUrl || 'https://onlineordering.skaryabhavan.com/popmenu-order'}
                target={branch.hero.orderUrl?.startsWith('http') ? '_blank' : undefined}
                rel={branch.hero.orderUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-hero-menu cursor-pointer inline-block"
              >
                {branch.hero.buttonText || 'Online Order'}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 2. INTRODUCTION SECTION (Exact 50/50 full-bleed left flush matching live site, equal height) */}
      <section className="w-full bg-white pt-0 pb-0 overflow-hidden">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            
            {/* Left: Interior Photo full-bleed flush to left edge, stretches to match exact right content height */}
            <div className="w-full relative min-h-[350px] lg:min-h-0 self-stretch">
              <Image
                src={branch.intro.image}
                alt={branch.intro.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Content & 4 Feature Badges with exact live site typography */}
            <div className="px-6 sm:px-8 lg:pl-6 lg:pr-8 xl:pr-12 pt-8 pb-10 lg:pt-10 lg:pb-12 flex flex-col justify-center">
              {branch.intro.heading === 'AUTHENTIC SOUTH INDIAN VEGETARIAN RESTAURANT IN BRUSSELS' ? (
                <h2 className="font-ivymode text-[22px] sm:text-[25px] lg:text-[27px] xl:text-[29px] font-semibold text-[#344E41] uppercase tracking-[0.5px] leading-tight lg:leading-[44px] mb-5">
                  AUTHENTIC SOUTH INDIAN<br className="hidden sm:inline" />
                  <span className="inline lg:whitespace-nowrap">VEGETARIAN RESTAURANT IN BRUSSELS</span>
                </h2>
              ) : (
                <h2 className="font-ivymode text-[22px] sm:text-[25px] lg:text-[27px] xl:text-[29px] font-semibold text-[#344E41] uppercase tracking-[0.5px] leading-tight lg:leading-[44px] mb-5">
                  {branch.intro.heading}
                </h2>
              )}
              
              <p className="font-['Josefin_Sans',sans-serif] text-[17px] sm:text-[18px] leading-[1.65] text-[#000000] mb-4">
                {branch.intro.p1}
              </p>
              
              <p className="font-['Josefin_Sans',sans-serif] text-[17px] sm:text-[18px] leading-[1.65] text-[#000000] mb-4">
                {branch.intro.p2}
              </p>

              {branch.intro.p3 && (
                <p className="font-['Josefin_Sans',sans-serif] text-[17px] sm:text-[18px] leading-[1.65] text-[#000000] mb-4">
                  {branch.intro.p3}
                </p>
              )}

              {branch.intro.p4 && (
                <p className="font-['Josefin_Sans',sans-serif] text-[17px] sm:text-[18px] leading-[1.65] text-[#000000] mb-4">
                  {branch.intro.p4}
                </p>
              )}

              {/* 4 Feature Badges (2x2 Grid) with exact #EBE6E0 background & hover shadow */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {introFeatures.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3.5 p-3.5 rounded-[10px] bg-[#EBE6E0] transition-all duration-300 hover:shadow-[1px_1px_8px_1px_#F68422] cursor-pointer"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[17px] font-bold text-[#000000]">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR MENU SECTION */}
      <section id="menu" className="py-14 lg:py-20 bg-[#FAF8F5] border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-[700px] mx-auto mb-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal uppercase tracking-wider text-[#344E41]">
              OUR MENU
            </h2>
          </div>

          {/* Dietary Legend Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-sm mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2b59c3] bg-white text-[#1e3a8a] font-semibold text-xs sm:text-sm shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#1e40af] text-white flex items-center justify-center text-[11px] font-bold">G</span>
              <span>GLUTEN FREE</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f59e0b] bg-white text-[#92400e] font-semibold text-xs sm:text-sm shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#d97706] text-white flex items-center justify-center text-[11px] font-bold">J</span>
              <span>JAIN</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#16a34a] bg-white text-[#166534] font-semibold text-xs sm:text-sm shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[11px] font-bold">V</span>
              <span>VEGAN</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ef4444] bg-white text-[#991b1b] font-semibold text-xs sm:text-sm shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#dc2626] text-white flex items-center justify-center text-[11px] font-bold">N</span>
              <span>CONTAIN NUTS</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-500 bg-white text-gray-800 font-semibold text-xs sm:text-sm shadow-xs">
              <span className="w-5 h-5 rounded-full bg-gray-600 text-white flex items-center justify-center text-[11px] font-bold">?</span>
              <span>Ask for VEGAN</span>
            </div>
          </div>

          {/* Category Tabs: Inactive = Dark Green, Active = Light Gray #C8C8C8 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
            {categories.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`px-4 py-2 text-[15px] sm:text-[16px] font-medium rounded-[8px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#C8C8C8] text-[#202020] font-bold shadow-xs'
                      : 'bg-[#28492C] hover:bg-[#1e3822] text-white'
                  }`}
                >
                  {cat.category}
                </button>
              );
            })}
          </div>

          {/* Dishes Cards Grid: 4 columns matching exact live site rectangular card design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {activeCategory.items.map((dish, dIdx) => (
              <div
                key={`${dish.title}-${dIdx}`}
                className="bg-white rounded-[10px] border-2 border-[#BBBBBB] p-3 sm:p-3.5 hover:bg-[#ECECEC] transition-colors duration-200 cursor-pointer flex flex-col justify-between min-h-[96px]"
              >
                <div className="flex items-start gap-3">
                  {dish.img && (
                    <div className="relative w-14 h-14 sm:w-15 sm:h-15 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                      <Image
                        src={dish.img}
                        alt={dish.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Josefin_Sans',sans-serif] text-[15px] sm:text-[16px] font-bold text-[#202020] leading-snug">
                      {renderDishTitle(dish.title)}
                    </h4>
                    {dish.desc && (
                      <p className="font-['Josefin_Sans',sans-serif] mt-1 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                        {dish.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. VISIT US TODAY (fixed background, left widget card, right frosted info card) */}
      <section 
        id="visit-us" 
        className="relative py-16 lg:py-24 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/images/migrated/enquire-banner-1-scaled.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: SevenRooms widget or Google Map */}
            <div className="lg:col-span-6 w-full">
              <div className="bg-white rounded-[14px] overflow-hidden shadow-2xl h-[560px] border border-white/20">
                <iframe
                  src={branch.visitUs.widgetUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={`Arya Bhavan ${branch.name} Location and Reservations`}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Column: Frosted container with ADDRESS & MOBILE NO */}
            <div className="lg:col-span-6 border border-white/60 rounded-[12px] p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-white backdrop-blur-xs">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold uppercase tracking-wider text-center text-white mb-3">
                VISIT US TODAY
              </h2>
              
              <p className="text-center text-white/90 text-[16px] sm:text-[17px] leading-relaxed mb-8 max-w-[500px] mx-auto">
                Whether you’re exploring the area or searching for comforting vegetarian food, Arya Bhavan welcomes you with authentic flavours and heartfelt hospitality.
              </p>

              {/* Box 1: Address */}
              <div className="bg-[#777777]/65 rounded-[10px] p-5 mb-4 text-center border border-white/20">
                <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wider text-white">
                  ADDRESS
                </h3>
                <p className="text-white/90 text-[15px] sm:text-[16px] mt-1.5">
                  {branch.visitUs.address}
                </p>
                <a
                  href={branch.visitUs.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs uppercase font-bold tracking-wider text-[#F6851C] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Box 2: Mobile No */}
              <div className="bg-[#777777]/65 rounded-[10px] p-5 text-center border border-white/20">
                <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wider text-white">
                  MOBILE NO:
                </h3>
                <a
                  href={`tel:${branch.visitUs.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-[#F6851C] transition font-bold text-lg sm:text-xl mt-1.5 inline-block"
                >
                  {branch.visitUs.phone}
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. SOUTH INDIAN CULTURAL HERITAGE SKETCH BANNER */}
      <section className="relative w-full h-[240px] sm:h-[340px] md:h-[427px] overflow-hidden bg-white">
        <Image
          src="/images/migrated/WhatsApp-Image-2026-02-28-at-16.21.58.jpeg"
          alt="South Indian Heritage Landmarks, Culture, and Monuments"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </section>

      {/* 6. WHY GUESTS LOVE DINING WITH US (Exact live site layout: full-bleed flush right image, font-ivymode heading) */}
      <section className="w-full bg-[#F9F5F1] py-0 overflow-hidden">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            
            {/* Left Column: Heading, description, and 6 feature cards */}
            <div className="px-6 sm:px-10 lg:pl-[50px] xl:pl-[70px] lg:pr-8 py-10 lg:py-12 flex flex-col justify-center">
              <h2 className="font-ivymode text-[22px] sm:text-[25px] lg:text-[27px] xl:text-[29px] font-semibold text-[#344E41] uppercase tracking-[0.5px] leading-tight lg:leading-[44px] mb-4">
                WHY GUESTS LOVE DINING WITH US
              </h2>
              
              <p className="font-['Josefin_Sans',sans-serif] text-[16px] sm:text-[17px] leading-[1.65] text-[#202020] mb-8">
                {branch.whyGuestsLove.description}
              </p>

              {/* 6 feature items (2 columns x 3 rows) matching exact live screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                {whyGuestsLove.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1"
                  >
                    <div className="w-[62px] h-[62px] sm:w-[68px] sm:h-[68px] flex-shrink-0 relative rounded-[14px] overflow-hidden flex items-center justify-center">
                      <Image
                        src={feat.img}
                        alt={feat.title}
                        width={68}
                        height={68}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-['Josefin_Sans',sans-serif] font-bold text-[17px] sm:text-[18px] text-[#000000] leading-snug">
                        {feat.title}
                      </h3>
                      <p className="font-['Josefin_Sans',sans-serif] text-[13px] sm:text-[14px] text-[#333333] leading-[1.35] mt-1 font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Full-bleed flush to right edge dish photo matching live site background */}
            <div className="w-full relative min-h-[454px] lg:min-h-full self-stretch overflow-hidden">
              <Image
                src={branch.whyGuestsLove.dishImage}
                alt={`Delicious South Indian Podi Idli and Chutney at Arya Bhavan ${branch.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_35%]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. OPENING TIMES (Exact live site specifications) */}
      <section className="py-[50px] bg-[#334D40] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
          
          <h2 className="font-ivymode text-2xl sm:text-3xl lg:text-[32px] font-semibold uppercase tracking-[1px] text-white leading-[56px]">
            OPENING TIMES
          </h2>
          <p className="font-['Josefin_Sans',sans-serif] text-[25px] sm:text-[32px] text-white font-normal mt-1 mb-8">
            We&apos;re Open Every Day
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <div className="bg-[#3C5549] rounded-[10px] p-8 sm:p-[50px] flex flex-col items-center justify-center text-center shadow-[7px_10px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_10px_0.5px_#F58522] transition-all duration-300">
              <div className="text-[#CC8C33] mb-3">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">
                Opening Times
              </h3>
              <p className="text-white text-sm sm:text-base mb-2 font-normal">
                {branch.openingHours.label1}
              </p>
              <div className="font-['Josefin_Sans',sans-serif] text-[20px] sm:text-[32px] font-bold text-[#CC8C33]">
                {branch.openingHours.time1}
              </div>
            </div>

            <div className="bg-[#3C5549] rounded-[10px] p-8 sm:p-[50px] flex flex-col items-center justify-center text-center shadow-[7px_10px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_10px_0.5px_#F58522] transition-all duration-300">
              <div className="text-[#CC8C33] mb-3">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">
                Opening Times
              </h3>
              <p className="text-white text-sm sm:text-base mb-2 font-normal">
                {branch.openingHours.label2}
              </p>
              <div className="font-['Josefin_Sans',sans-serif] text-[20px] sm:text-[32px] font-bold text-[#CC8C33]">
                {branch.openingHours.time2}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. WHAT WE OFFER (Exact live site specifications) */}
      <section className="py-12 sm:py-14 bg-[#ECE6DF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-ivymode text-2xl sm:text-[28px] lg:text-[32px] font-semibold uppercase tracking-[1px] leading-tight text-[#344E41]">
              WHAT WE OFFER
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {whatWeOffer.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[10px] p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_2px_9px_1px_#F5852296] hover:-translate-y-1.5 cursor-pointer min-h-[140px]"
              >
                <div className="w-[48px] h-[48px] rounded-[21px] bg-[#ECE3E0] text-[#6E1007] mb-3 flex items-center justify-center flex-shrink-0">
                  <div className="w-[26px] h-[26px] flex items-center justify-center">
                    {item.svg}
                  </div>
                </div>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#000000] leading-snug font-['Josefin_Sans',sans-serif]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DELIVERY SECTION (Exact live site specifications) */}
      <section className="py-[50px] bg-[#334D40] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-[700px] mx-auto mb-8">
            <span className="text-[18px] sm:text-[20px] font-medium text-[#CC8C33] block mb-1">
              Delivery
            </span>
            <h2 className="font-ivymode text-2xl sm:text-3xl lg:text-[32px] font-semibold uppercase tracking-[1px] text-white leading-tight">
              ENJOY ARYA BHAVAN AT HOME
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-white/90 leading-relaxed max-w-2xl mx-auto">
              Order your favourites through popular delivery partners and enjoy authentic South Indian flavours at your doorstep.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={branch.delivery.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-6 py-2.5 bg-[#142328] text-white rounded-[10px] font-['Josefin_Sans',sans-serif] text-[20px] sm:text-[24px] font-normal shadow-[3px_3px_3px_3px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_6px_2px_#F58524] hover:-translate-y-0.5 transition-all duration-300"
            >
              <DeliveryScooterIcon className="w-10 h-10 fill-white flex-shrink-0" />
              <span>Order on Uber Eats</span>
            </a>

            <a
              href={branch.delivery.deliverooUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-6 py-2.5 bg-[#00B398] text-white rounded-[10px] font-['Josefin_Sans',sans-serif] text-[20px] sm:text-[24px] font-normal shadow-[3px_3px_3px_3px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_6px_2px_#F58524] hover:-translate-y-0.5 transition-all duration-300"
            >
              <DeliveryScooterIcon className="w-10 h-10 fill-white flex-shrink-0" />
              <span>Order on Deliveroo</span>
            </a>

            <a
              href={branch.delivery.justEatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-6 py-2.5 bg-[#FF8000] text-white rounded-[10px] font-['Josefin_Sans',sans-serif] text-[20px] sm:text-[24px] font-normal shadow-[3px_3px_3px_3px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_6px_2px_#F58524] hover:-translate-y-0.5 transition-all duration-300"
            >
              <DeliveryScooterIcon className="w-10 h-10 fill-white flex-shrink-0" />
              <span>Order on Just Eat</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ'S ACCORDION WITH CHANGING IMAGE CAROUSEL */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-wider text-[#1F302B]">
              FAQ &apos;S
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Food Image Carousel (changes every 5 seconds) */}
            <div className="lg:col-span-6 relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
              {faqCarouselImages.map((src, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    i === faqImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Arya Bhavan South Indian dish ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={i === 0}
                  />
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
                {faqCarouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFaqImageIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === faqImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Branch-specific FAQ Accordion */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-3.5">
              {branch.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#EDE8E2] hover:bg-[#E5DFD7] transition cursor-pointer rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[#2C241E] leading-none select-none">
                          {isOpen ? '−' : '+'}
                        </span>
                        <span className="text-[15px] sm:text-[16px] font-medium text-[#2C241E]">
                          {faq.q}
                        </span>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 py-3.5 bg-white border border-[#EDE8E2] rounded-b-xl text-[15px] leading-relaxed text-gray-700 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
