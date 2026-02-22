import React from 'react';
import { ShieldCheck, Truck, BadgePercent, PackageCheck } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: '১০০% অরিজিনাল পণ্য',
    desc: 'সেরা মানের নিশ্চয়তা',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'ফাস্ট হোম ডেলিভারি',
    desc: 'সারা ঢাকা শহরে দ্রুত ডেলিভারি',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: <BadgePercent className="w-8 h-8" />,
    title: 'সাশ্রয়ী মূল্য',
    desc: 'বাজারের চেয়ে কম দামে',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: <PackageCheck className="w-8 h-8" />,
    title: 'নিরাপদ প্যাকেজিং',
    desc: 'সুরক্ষিত ভাবে আপনার কাছে',
    color: 'bg-purple-50 text-purple-600',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bangla font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 font-bangla text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
