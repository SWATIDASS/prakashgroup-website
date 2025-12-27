"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MapPin from '@/components/icons/MapPin';

const brands = [
  {
    name: "Bajaj (Motor Vehicle Dealer)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Bajaj_Auto_Ltd_logo.svg",
    locations: [
      {
        city: "Prakash Bajaj, Forbesganj",
        address: "Ward No. 1, Araria–Raniganj Rd, Forbesganj, Bihar 854318",
        map: "https://share.google/bzSTaR8U3dM7QutZ2"
      },
      {
        city: "Prabha Bajaj, Supaul",
        address: "State Highway 76, Chain Singh Patti, Bihar 852134",
        map: "https://share.google/deGFGfmKcDbZDG15X"
      }
    ]
  },
  {
    name: "Chetak (Electric)",
    logo: "https://mir-s3-cdn-cf.behance.net/projects/404/42af85215377869.Y3JvcCw1NzUzLDQ1MDAsMTEyNSww.png",
    locations: [
      {
        city: "Prakash Bajaj, Forbesganj",
        address: "Ward No. 1, Araria–Raniganj Rd, Forbesganj, Bihar 854318",
        map: "https://share.google/bzSTaR8U3dM7QutZ2"
      }
    ]
  },
  {
    name: "Piaggio",
    logo: "https://motorcycle-logos.com/wp-content/uploads/2016/11/Piaggio-Logo.png",
    locations: [
      {
        city: "Prakash Piaggio, Forbesganj",
        address: "Araria–Raniganj Rd, Forbesganj, Bihar 854318",
        map: "https://share.google/FfXeDQ7U4zCrrCxwg"
      }
    ]
  },
  {
    name: "Tanishq",
    logo: "https://3.bp.blogspot.com/_vS6xlZmGNcc/S_LUmJIqhLI/AAAAAAAAAEg/JQPltgmWsA4/s1600/Tanisq-logo.jpg",
    locations: [
      {
        city: "Tanishq Jewellery, Kishanganj",
        address: "Near Rajbari Honda Showroom, Paschimpally Chowk, Bihar 855107",
        map: "https://share.google/TOj6ORKCU7IUXnt00"
      }
    ]
  },
  {
    name: "Pulse (Aqua Industry)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Water_drop.svg",
    locations: [
      {
        city: "Pulse JJS Aqua Pulse Water Plant",
        address: "Forbesganj, Bihar 854318",
        map: "https://share.google/YPbO96NBb9AsUgG6R"
      }
    ]
  },
  {
    name: "World of Titan & Titan Eye+",
    logo: "https://hellomangaluru.online/media/2023/10/WhatsApp-Image-2023-10-26-at-3.31.33-PM-1.jpeg",
    locations: [
      {
        city: "Titan Eye+, Saharsa",
        address: "Ward No. 29, Hatiya Gachhi, Saharsa, Bihar 852201",
        map: "https://share.google/cifzKCR7DO5P08D4I"
      }
    ]
  },
  {
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
    locations: [
      {
        city: "Prakash Toyota, Purnea",
        address: "NH-31, Barsauni, Bihar 854326",
        map: "https://share.google/OhndpSjltmrZIhumG"
      },
      {
        city: "Prakash Toyota, Bhagalpur",
        address: "Aliganj Road, Bhagalpur, Bihar 812005",
        map: "https://share.google/SsrJsoqaT9HbJ6C2W"
      },
      {
        city: "Prakash Toyota, Araria (Dholbaja)",
        address: "NH, Dholbaja, Bihar 854318",
        map: "https://share.google/oBgir71iOLzKYI1VX"
      },
      {
        city: "Prakash Toyota, Kishanganj",
        address: "NH-31, Faringora, Bihar 855107",
        map: "https://share.google/2L3p4uZyiQnPMG0rf"
      },
      {
        city: "Prakash Toyota, Khagaria",
        address: "NH-31, Khagaria, Bihar 851204",
        map: "https://share.google/XQrXZzbPOpQr9C23U"
      },
      {
        city: "Prakash Toyota, Supaul",
        address: "SH-76, Chain Singh Patti, Bihar 852134",
        map: "https://share.google/5JV3FGqCnoIJfCN0q"
      }
    ]
  }
];

export default function PrakashGroupPortal() {
  const [dark, setDark] = useState(false);

  return (
    <div className={(dark ? 'min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-gray-50 text-gray-900') + ' p-8'}>
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-center mx-auto">Prakash Group</h1>
        <button
          aria-pressed={dark}
          onClick={() => setDark((s) => !s)}
          className="ml-4 px-3 py-1 rounded-md border bg-white/80 dark:bg-gray-800 text-sm"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-1 flex justify-center">
          <img src="/md-vijay-prakash.png" alt="Mr. Vijay Prakash" className="rounded-2xl shadow-lg w-60" />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-2">Mr. Vijay Prakash</h2>
          <p className="text-gray-600 font-medium mb-3">Managing Director – Prakash Group</p>
          <p className="text-gray-700 leading-relaxed">
            Under the visionary leadership of Mr. Vijay Prakash, Prakash Group has grown into a trusted and diversified business house with a strong presence across Bihar. His commitment to ethical business practices, customer-centricity, and long-term value creation has been the driving force behind the group’s steady expansion across multiple industries.
          </p>
        </div>
      </div>
      <p className="text-center text-gray-600 max-w-4xl mx-auto mb-10">
        Prakash Group is a diversified business group with an established presence across Bihar, operating authorised dealerships and ventures in automobiles, electric mobility, jewellery, eyewear, and packaged drinking water. Built on the pillars of trust, excellence, and customer satisfaction, the group proudly represents some of India’s most respected national brands, delivering quality products and services to thousands of customers every year.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.name} className={(dark ? 'bg-gray-800 text-white' : 'bg-white') + ' rounded-2xl shadow-md hover:shadow-lg transition'}>
            <CardContent className="p-6">
              <div className={(dark ? 'bg-gray-700' : 'bg-gray-100') + ' flex items-center justify-center h-16 w-full rounded-md p-2 mb-4'} role="img" aria-label={brand.name}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 w-auto mx-auto object-contain"
                  onError={(e) => {
                    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='80'><rect width='100%' height='100%' fill='${dark ? '#374151' : '#f3f4f6'}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${dark ? '#f9fafb' : '#111827'}' font-family='Arial, sans-serif' font-size='14'>${brand.name.split(' ')[0]}</text></svg>`;
                    // @ts-ignore
                    e.currentTarget.onerror = null;
                    // @ts-ignore
                    e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                  }}
                />
              </div>
              <h2 className="text-xl font-semibold text-center mb-4">{brand.name}</h2>
              <div className="space-y-3">
                {brand.locations.map((loc) => (
                  <a key={loc.city} href={loc.map} target="_blank" className={(dark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100') + ' block border rounded-xl p-3'}>
                    <div className="flex items-center gap-2 font-medium"><MapPin size={16} /> {loc.city}</div>
                    <p className={(dark ? 'text-gray-300' : 'text-gray-500') + ' text-sm mt-1'}>{loc.address}</p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="text-center text-sm text-gray-500 mt-16">© {new Date().getFullYear()} Prakash Group · Domain: prakashgroup.in</footer>
    </div>
  );
}
