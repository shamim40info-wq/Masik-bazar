import React from 'react';
import { CATEGORIES } from '../constants';
import { motion } from 'motion/react';

export const Categories: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bangla font-bold text-slate-900 mb-4">পণ্য ক্যাটাগরি</h2>
          <p className="text-slate-500 font-bangla max-w-2xl mx-auto">আপনার প্রয়োজনীয় পণ্যগুলো সহজেই খুঁজে পেতে ক্যাটাগরি অনুযায়ী ব্রাউজ করুন।</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-bangla font-semibold text-slate-800 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
