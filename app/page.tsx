"use client";

import React, { useState, useRef, useEffect } from 'react';
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
    logo: "/logos/pulse.png",
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
  const [dark] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [contactPreviewUrl, setContactPreviewUrl] = useState<string | null>(null);
  const [contactErrors, setContactErrors] = useState({ name: '', phone: '', message: '' });

  // Careers/upload state
  const [showCareers, setShowCareers] = useState(false);
  const [careerForm, setCareerForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [careerFile, setCareerFile] = useState<File | null>(null);
  const [careerProgress, setCareerProgress] = useState<number | null>(null);
  const [careerStatus, setCareerStatus] = useState<string | null>(null);
  const [careerErrors, setCareerErrors] = useState({ name: '', email: '', file: '' });

  const contactButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const careerFileRef = useRef<HTMLInputElement | null>(null);

  function closeContact() {
    setShowContact(false);
    contactButtonRef.current?.focus();
  }

  useEffect(() => {
    if (showContact) {
      // small timeout so the input is available in DOM
      setTimeout(() => firstInputRef.current?.focus(), 10);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeContact();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [showContact]);

  function validateContact() {    const errs = { name: '', phone: '', message: '' };
    if (!contact.name.trim()) errs.name = 'Name is required.';
    if (!contact.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\- ]{7,15}$/.test(contact.phone)) errs.phone = 'Enter a valid phone number.';
    if (!contact.message.trim()) errs.message = 'Message is required.';
    setContactErrors(errs);
    return !errs.name && !errs.phone && !errs.message;
  }

  function validateCareer() {
    const errs = { name: '', email: '', file: '' };
    if (!careerForm.name.trim()) errs.name = 'Name is required.';
    if (!careerForm.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(careerForm.email)) errs.email = 'Valid email is required.';
    if (!careerFile) errs.file = 'CV/Resume is required.';
    setCareerErrors(errs);
    return !errs.name && !errs.email && !errs.file;
  }

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setContact((s) => ({ ...s, [name]: value }));
    setContactErrors((s) => ({ ...s, [name]: '' }));
  }

  function closeCareers() {
    setShowCareers(false);
    if (careerFileRef.current) careerFileRef.current.value = '';
  }

  function handleCareerChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target as HTMLInputElement;
    setCareerForm((s) => ({ ...s, [name]: value }));
    setCareerErrors((s) => ({ ...s, [name]: '' }));
  }

  function handleCareerFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setCareerFile(f);
    setCareerErrors((s) => ({ ...s, file: '' }));
  }

  async function handleCareerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateCareer()) return;

    const file = careerFile;
    if (!file) return;

    // limit 10 MB
    const MAX = 10 * 1024 * 1024;
    if (file.size > MAX) {
      setCareerErrors((s) => ({ ...s, file: 'File too large (max 10MB).' }));
      return;
    }

    // disallow empty files
    if (file.size === 0) {
      setCareerErrors((s) => ({ ...s, file: 'Selected file is empty.' }));
      setCareerProgress(null);
      return;
    }

    setCareerProgress(0);
    setCareerStatus('Preparing upload...');

    try {
      // 1) request presigned PUT URL
      const presignRes = await fetch('/api/careers/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type || 'application/octet-stream' }),
      });
      const presignJson = await presignRes.json().catch(() => ({}));

      // If S3 not configured, fallback to sending file inline to /api/careers
      if (!presignRes.ok) {
        // S3 specifically not configured
        if (presignJson && presignJson.error && presignJson.error.toLowerCase().includes('s3')) {
          setCareerStatus('S3 not configured — using fallback upload.');

          // read file as base64
          const fileData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base = result.split(',')[1];
              resolve(base);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          // ensure fileData is non-empty (some text files can be zero bytes or read failure)
          if (!fileData || fileData.length === 0) {
            setCareerErrors((s) => ({ ...s, file: 'Selected file is empty or could not be read.' }));
            setCareerProgress(null);
            return;
          }

          setCareerStatus('Uploading (fallback)...');

          const submitRes = await fetch('/api/careers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...careerForm, fileName: file.name, fileData, contentType: file.type }),
          });

          const submitJson = await submitRes.json().catch(() => ({}));
          if (submitRes.ok) {
            setCareerProgress(100);
            setCareerStatus(submitJson.previewUrl ? 'Application sent (preview).' : 'Application submitted.');
            setTimeout(() => {
              setCareerForm({ name: '', email: '', phone: '', position: '', message: '' });
              setCareerFile(null);
              closeCareers();
              setCareerProgress(null);
            }, 1800);
            return;
          }

          setCareerStatus(submitJson && submitJson.error ? `Error: ${submitJson.error}` : 'Error submitting application.');
          setCareerProgress(null);
          return;
        }

        setCareerStatus('Upload failed (presign).');
        setCareerProgress(null);
        return;
      }

      if (!presignJson.url || !presignJson.key) {
        setCareerStatus('Upload failed (presign).');
        setCareerProgress(null);
        return;
      }

      setCareerStatus('Uploading file...');

      // 2) PUT file to S3
      const putRes = await fetch(presignJson.url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });

      if (!putRes.ok) {
        setCareerStatus('Upload failed (PUT).');
        setCareerProgress(null);
        return;
      }

      setCareerProgress(100);
      setCareerStatus('Saving application...');

      // 3) notify server with metadata including file key / fileUrl
      const submitRes = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...careerForm, fileKey: presignJson.key, fileUrl: presignJson.fileUrl }),
      });
      const submitJson = await submitRes.json().catch(() => ({}));

      if (submitRes.ok) {
        setCareerStatus(submitJson.previewUrl ? 'Application sent (preview).' : 'Application submitted.');
        setTimeout(() => {
          setCareerForm({ name: '', email: '', phone: '', position: '', message: '' });
          setCareerFile(null);
          closeCareers();
          setCareerProgress(null);
        }, 1800);
        return;
      }

      setCareerStatus(submitJson && submitJson.error ? `Error: ${submitJson.error}` : 'Error submitting application.');
      setCareerProgress(null);
    } catch (err) {
      console.error('Career upload error', err);
      setCareerStatus('Network error. Please try again.');
      setCareerProgress(null);
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;

    setContactStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setContactStatus('Message sent. We will reach out within 48 hours.');
        if (json && json.previewUrl) {
          setContactPreviewUrl(json.previewUrl);
          setContactStatus('Message sent (preview available).');
        }
        setTimeout(() => {
          setContact({ name: '', phone: '', message: '' });
          setShowContact(false);
        }, 2000);
        return;
      }

      // If server indicates SMTP not configured, fallback to mailto
      if (json && json.error && json.error.toLowerCase().includes('smtp')) {
        const subject = encodeURIComponent(`Support request from ${contact.name}`);
        const body = encodeURIComponent(`Name: ${contact.name}\nPhone: ${contact.phone}\n\nMessage:\n${contact.message}`);
        const mailto = `mailto:swati.das1506@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        setContactStatus('SMTP not configured. Prepared message in your email client.');
        setTimeout(() => setShowContact(false), 2000);
        return;
      }

      setContactStatus(json && json.error ? `Error: ${json.error}` : 'Error sending message.');
    } catch {
      // network or other error — fallback to mailto
      const subject = encodeURIComponent(`Support request from ${contact.name}`);
      const body = encodeURIComponent(`Name: ${contact.name}\nPhone: ${contact.phone}\n\nMessage:\n${contact.message}`);
      const mailto = `mailto:swati.das1506@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      setContactStatus('Network error. Prepared message in your email client.');
      setTimeout(() => setShowContact(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <nav className="max-w-5xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">Prakash Group</div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Trusted since 1990</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#brands" className="text-sm font-semibold text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#C9A24D]">Brands</a>
          <button onClick={() => setShowCareers(true)} className="text-sm font-semibold text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#C9A24D]">Careers</button>
          <a href="mailto:swati.das1506@gmail.com" className="text-sm font-semibold text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#C9A24D]">Contact</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto mb-12 relative">
        <svg className="pointer-events-none absolute -top-8 -right-24 opacity-20 w-48 h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="70" r="80" fill="url(#g1)" />
        </svg>

        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Prakash Group</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">Authorized dealerships and trusted services across automobiles, mobility, jewellery, eyewear and packaged water — delivering consistent value to our customers in Bihar.</p>
            <ul className="mt-4 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside max-w-2xl">
              <li>Authorized national and international brands</li>
              <li>Transparent pricing and trusted service</li>
              <li>Local support across multiple cities</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#brands" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">Explore Brands</a>
              <button
                type="button"
                ref={contactButtonRef}
                onClick={() => setShowContact(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-indigo-600 bg-white/90 hover:bg-white transition"
              >
                Get in touch
              </button>
            </div>

            {/* Contact form modal */}
            {showContact && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeContact} aria-hidden="true" />
                <div role="dialog" aria-modal="true" aria-labelledby="contact-title" className="relative bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 max-h-[90vh] overflow-y-auto">
                  <button onClick={closeContact} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-lg">✕</button>
                  <h3 id="contact-title" className="text-2xl font-bold mb-6 text-gray-900">Send a query to our support team</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Full name <span className="text-red-500">*</span></label>
                      <input ref={firstInputRef} name="name" value={contact.name} onChange={handleContactChange} aria-required="true" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                      {contactErrors.name && <div className="text-sm text-red-500 mt-1">{contactErrors.name}</div>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Phone number <span className="text-red-500">*</span></label>
                      <input name="phone" value={contact.phone} onChange={handleContactChange} aria-required="true" pattern="[0-9+\- ]{7,15}" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                      {contactErrors.phone && <div className="text-sm text-red-500 mt-1">{contactErrors.phone}</div>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" value={contact.message} onChange={handleContactChange} aria-required="true" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                      {contactErrors.message && <div className="text-sm text-red-500 mt-1">{contactErrors.message}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition">Send to support</button>
                      <button type="button" onClick={closeContact} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">Cancel</button>
                      <div className="text-sm text-gray-500">We will reach out within 48 hours.</div>
                    </div>
                  </form>
                  {contactStatus && <div className="mt-3 text-sm text-green-500">{contactStatus}</div>}
                  {contactPreviewUrl && (
                    <div className="mt-2 text-sm">
                      <a href={contactPreviewUrl} target="_blank" rel="noreferrer" className="text-indigo-600">Open email preview</a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Careers modal */}
            {showCareers && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCareers} aria-hidden="true" />
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="careers-title"
                  className="relative bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 max-h-[90vh] overflow-y-auto"
                >
                  <button
                      onClick={closeCareers}
                      aria-label="Close"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-lg"
                    >
                      ✕
                    </button>
                  <h3 id="careers-title" className="text-2xl font-bold mb-6 text-gray-900">Apply — Upload your CV / Resume</h3>
                  <form onSubmit={handleCareerSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Full name <span className="text-red-500">*</span></label>
                      <input name="name" value={careerForm.name} onChange={handleCareerChange} aria-required="true" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                      {careerErrors.name && <div className="text-sm text-red-500 mt-1">{careerErrors.name}</div>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Email <span className="text-red-500">*</span></label>
                      <input name="email" value={careerForm.email} onChange={handleCareerChange} aria-required="true" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                      {careerErrors.email && <div className="text-sm text-red-500 mt-1">{careerErrors.email}</div>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Phone</label>
                      <input name="phone" value={careerForm.phone} onChange={handleCareerChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Position (optional)</label>
                      <input name="position" value={careerForm.position} onChange={handleCareerChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Message (optional)</label>
                      <textarea name="message" value={careerForm.message} onChange={handleCareerChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">CV / Resume <span className="text-red-500">*</span></label>
                      <div className="mt-2 flex items-start gap-3">
                        <label htmlFor="career-file" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#C9A24D] rounded-md cursor-pointer text-[#C9A24D] bg-[#C9A24D]/5 hover:bg-[#C9A24D]/10 transition">
                          <span className="text-sm font-medium">{careerFile ? careerFile.name : 'Upload CV / Resume'}</span>
                          <input
                            id="career-file"
                            ref={careerFileRef}
                            type="file"
                            onChange={handleCareerFile}
                            accept=".pdf,.doc,.docx,.rtf,.txt"
                            className="sr-only"
                          />
                        </label>
                        {careerFile && (
                          <button
                            type="button"
                            onClick={() => { setCareerFile(null); if (careerFileRef.current) careerFileRef.current.value = ''; }}
                            className="text-sm text-gray-500 mt-1"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Accepted: PDF, DOC, DOCX, RTF, TXT. Max file size 10MB.</div>
                      {careerErrors.file && <div className="text-sm text-red-500 mt-1">{careerErrors.file}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition">Submit application</button>
                      <button type="button" onClick={closeCareers} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">Cancel</button>
                      <div className="text-sm text-gray-500">Max file size 10MB. Any file type accepted.</div>
                    </div>
                  </form>
                  {careerProgress !== null && <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden"><div style={{ width: `${careerProgress}%` }} className="h-2 bg-[#C9A24D]" /></div>}
                  {careerStatus && <div className="mt-3 text-sm text-green-500">{careerStatus}</div>}
                </div>
              </div>
            )}
          </div>
          <div className="w-60 hidden md:block">
            <img src="/md-vijay-prakash.png" alt="Mr. Vijay Prakash" className="rounded-2xl shadow-lg w-full" />
          </div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mt-8">Built on the pillars of trust, excellence and customer satisfaction, Prakash Group proudly represents leading national brands and delivers quality products and services to thousands of customers every year.</p>
      </div>
      <div id="brands" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card
              key={brand.name}
              className="
                bg-white
                text-gray-900
                rounded-2xl
                border border-gray-200
                shadow-lg
                hover:shadow-2xl
                transform hover:-translate-y-1 hover:scale-[1.02]
                transition-all duration-300
                overflow-hidden
              "
            >
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 to-indigo-600" />
            <CardContent className="p-6">
              <div
                  className="
                    flex items-center justify-center
                    h-28 w-full mb-4
                    rounded-xl
                    bg-white
                    border border-gray-200
                    shadow-inner
                  "
                >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 max-w-[170px] object-contain drop-shadow-sm"
                  onError={(e) => {
                    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='80'><rect width='100%' height='100%' fill='${dark ? '#374151' : '#f3f4f6'}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${dark ? '#f9fafb' : '#111827'}' font-family='Arial, sans-serif' font-size='14'>${brand.name.split(' ')[0]}</text></svg>`;
                    (e.currentTarget as HTMLImageElement).onerror = null;
                    (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
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
      <footer className="text-center text-sm text-gray-500 mt-16 border-t pt-6">
        <div>© {new Date().getFullYear()} Prakash Group</div>
        <div className="mt-2"><a href="mailto:swati.das1506@gmail.com" className="text-indigo-600">swati.das1506@gmail.com</a> · <span className="text-gray-400">prakashgroup.in</span></div>
      </footer>
    </div>
  );
}
