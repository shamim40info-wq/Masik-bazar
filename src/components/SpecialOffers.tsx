import React from 'react';
import { motion } from 'motion/react';
import { Truck, Gift } from 'lucide-react';

export const SpecialOffers: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bangla font-bold mb-2">ফ্রি হোম ডেলিভারি!</h3>
              <p className="font-bangla opacity-90 mb-6">২,০০০ টাকার বেশি অর্ডারে সারা ঢাকা শহরে ডেলিভারি একদম ফ্রি।</p>
              <button className="px-6 py-2 bg-white text-emerald-600 rounded-xl font-bangla font-bold hover:bg-emerald-50 transition-colors">
                এখনই কিনুন
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bangla font-bold mb-2">প্রথম অর্ডারে ছাড়!</h3>
              <p className="font-bangla opacity-90 mb-6">প্রোমো কোড <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">FIRST10</span> ব্যবহার করে পান ১০% ডিসকাউন্ট।</p>
              <button className="px-6 py-2 bg-white text-orange-600 rounded-xl font-bangla font-bold hover:bg-orange-50 transition-colors">
                অফার নিন
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
