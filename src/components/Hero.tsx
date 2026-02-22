import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Tag } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings?: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const siteSettings = settings || {};
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary-light/30 rounded-l-[100px] hidden lg:block" />
      <div className="absolute -top-20 -left-20 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-bangla font-semibold mb-6">
              <Tag className="w-4 h-4" />
              নতুন কাস্টমারদের জন্য ১০% ছাড়!
            </div>
            <h1 className="text-4xl md:text-6xl font-bangla font-bold text-slate-900 leading-tight mb-6">
              আপনার মাসিক বাজার এখন <span className="text-primary">এক ক্লিক দূরে!</span>
            </h1>
            <p className="text-lg text-slate-600 font-bangla mb-8 max-w-lg">
              সময় বাঁচান এবং সাশ্রয়ী মূল্যে সেরা মানের গ্রোসারি পণ্য কিনুন। আমরা দিচ্ছি ১০০% অরিজিনাল পণ্যের নিশ্চয়তা।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center gap-2 shadow-xl shadow-primary/20">
                <ShoppingBag className="w-5 h-5" />
                এখনই অর্ডার করুন
              </button>
              <button className="btn-secondary">
                অফার দেখুন
              </button>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-bangla">
                <span className="font-bold text-slate-900">৫,০০০+</span> সুখী কাস্টমার আমাদের সাথে আছেন
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Happy Shopper with Grocery Bags"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 text-2xl">
                🚚
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bangla">ফাস্ট ডেলিভারি</p>
                <p className="text-sm font-bold font-bangla">২৪ ঘণ্টার মধ্যে</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-500 text-2xl">
                ✅
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bangla">পণ্যের মান</p>
                <p className="text-sm font-bold font-bangla">১০০% অরিজিনাল</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
