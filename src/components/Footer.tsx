import React from 'react';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  onAdminLogin: () => void;
  settings?: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onAdminLogin, settings }) => {
  const siteSettings = settings || {};
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {siteSettings.site_logo ? (
                <img src={siteSettings.site_logo} alt="Logo" className="h-10 w-auto object-contain bg-white/10 rounded p-1" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
              )}
              <span className="text-2xl font-bangla font-bold text-white">
                {siteSettings.site_title ? siteSettings.site_title.split(' - ')[0] : 'masikbajar'}
                <span className="text-primary">.com</span>
              </span>
            </div>
            <p className="font-bangla text-sm leading-relaxed mb-6 opacity-80">
              আপনার মাসিক বাজারের বিশ্বস্ত সঙ্গী। আমরা দিচ্ছি সেরা মানের গ্রোসারি পণ্য এবং দ্রুত হোম ডেলিভারি।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bangla font-bold text-lg mb-6">প্রয়োজনীয় লিঙ্ক</h4>
            <ul className="space-y-4 font-bangla text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ডেলিভারি পলিসি</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">রিটার্ন ও রিফান্ড</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">প্রাইভেসি পলিসি</a></li>
              <li><button onClick={onAdminLogin} className="hover:text-primary transition-colors">অ্যাডমিন লগইন</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bangla font-bold text-lg mb-6">পণ্য ক্যাটাগরি</h4>
            <ul className="space-y-4 font-bangla text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">চাল ও ডাল</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">তেল ও মসলা</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">সাবান ও ক্লিনিং</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ডেইরি ও বেকারি</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ফ্রুটস ও ভেজিটেবল</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bangla font-bold text-lg mb-6">যোগাযোগ</h4>
            <ul className="space-y-4 font-bangla text-sm">
              {siteSettings.contact_address && (
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>{siteSettings.contact_address}</span>
                </li>
              )}
              {siteSettings.contact_phone && (
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>{siteSettings.contact_phone}</span>
                </li>
              )}
              {siteSettings.contact_email && (
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>{siteSettings.contact_email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bangla opacity-60">
          <p>© ২০২৪ {siteSettings.site_title ? siteSettings.site_title.split(' - ')[0] : 'masikbajar'}.com - সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <span>ডেভেলপড বাই <a href="#" className="underline">Creative Studio</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
