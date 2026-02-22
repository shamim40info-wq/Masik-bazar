import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bangla font-bold text-slate-900 mb-4">কাস্টমারদের মতামত</h2>
          <p className="text-slate-500 font-bangla max-w-2xl mx-auto">আমাদের সেবায় সন্তুষ্ট হাজারো কাস্টমারদের মধ্য থেকে কয়েকজনের কথা।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-100" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 font-bangla mb-6 italic">"{t.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bangla font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-400 font-bangla">ভেরিফাইড কাস্টমার</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
