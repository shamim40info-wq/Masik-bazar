import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteSettings } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  settings?: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const siteSettings = settings || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 group">
              {siteSettings.site_logo ? (
                <img src={siteSettings.site_logo} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">M</div>
              )}
              <span className="text-2xl font-bangla font-bold text-primary hidden sm:block">
                {siteSettings.site_title ? siteSettings.site_title.split(' - ')[0] : 'masikbajar'}
                <span className="text-slate-700">.com</span>
              </span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all font-bangla shadow-inner"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {siteSettings.contact_phone && (
              <a href={`tel:${siteSettings.contact_phone}`} className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-bangla">
                <Phone className="w-5 h-5" />
                <span className="font-medium">{siteSettings.contact_phone}</span>
              </a>
            )}
            
            <button className="p-2 text-slate-600 hover:text-primary transition-colors">
              <User className="w-6 h-6" />
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-600 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="পণ্য খুঁজুন..."
                  className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 font-bangla"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-xl font-bangla text-slate-700">চাল ও ডাল</a>
                <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-xl font-bangla text-slate-700">তেল ও মসলা</a>
                <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-xl font-bangla text-slate-700">অফার</a>
                <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-xl font-bangla text-slate-700">যোগাযোগ</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
