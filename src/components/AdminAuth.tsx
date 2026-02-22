import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

interface AdminAuthProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/admin/login' : '/api/admin/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      
      const data = await res.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setError(data.message || 'কিছু ভুল হয়েছে');
      }
    } catch (err) {
      setError('সার্ভার ত্রুটি, আবার চেষ্টা করুন');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-8 shadow-2xl shadow-primary/20">M</div>
            <h1 className="text-4xl font-bangla font-bold text-white mb-6 leading-tight">
              masikbajar.com <br />
              <span className="text-primary">অ্যাডমিন কন্ট্রোল সেন্টার</span>
            </h1>
            <p className="text-slate-400 font-bangla text-lg leading-relaxed">
              আপনার ব্যবসার প্রতিটি ধাপ পরিচালনা করুন এক জায়গা থেকে। নিরাপদ এবং শক্তিশালী অ্যাডমিন প্যানেল।
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
              <ShieldCheck className="w-8 h-8 text-primary mb-4 mx-auto" />
              <p className="text-white font-bangla font-bold">নিরাপদ এক্সেস</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
              <ShoppingBag className="w-8 h-8 text-primary mb-4 mx-auto" />
              <p className="text-white font-bangla font-bold">রিয়েল-টাইম ডাটা</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-24 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bangla font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          স্টোরে ফিরে যান
        </button>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bangla font-bold text-slate-900 mb-2">
              {isLogin ? 'স্বাগতম ফিরে এসেছেন!' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
            </h2>
            <p className="text-slate-500 font-bangla">
              {isLogin ? 'আপনার অ্যাডমিন ক্রেডেনশিয়াল দিয়ে লগইন করুন।' : 'অ্যাডমিন প্যানেলে যোগ দিতে নিচের তথ্যগুলো দিন।'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="font-bangla text-sm font-semibold text-slate-700">আপনার নাম</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="পুরো নাম লিখুন" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bangla transition-all" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="font-bangla text-sm font-semibold text-slate-700">ইমেইল অ্যাড্রেস</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bangla transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bangla text-sm font-semibold text-slate-700">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bangla transition-all" 
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-bangla bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'লগইন করুন' : 'সাইন আপ করুন'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="font-bangla text-slate-500">
              {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLogin ? 'সাইন আপ করুন' : 'লগইন করুন'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
