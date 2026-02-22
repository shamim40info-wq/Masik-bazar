import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bangla font-bold">শপিং কার্ট ({items.length})</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="font-bangla text-slate-500">আপনার কার্ট খালি!</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-primary font-bangla font-bold hover:underline"
                  >
                    বাজার শুরু করুন
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-xl object-cover bg-slate-50"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bangla font-bold text-slate-800 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 font-bangla mb-3">{item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center bg-white text-slate-600 rounded shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">৳{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between mb-2">
                  <span className="font-bangla text-slate-500">সাব-টোটাল</span>
                  <span className="font-bold">৳{total}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-bangla text-slate-500">ডেলিভারি চার্জ</span>
                  <span className="font-bold text-primary">ফ্রি</span>
                </div>
                <div className="flex justify-between mb-8 pt-4 border-t border-slate-200">
                  <span className="font-bangla font-bold text-lg">মোট</span>
                  <span className="font-bold text-2xl text-primary">৳{total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  চেকআউট করুন
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
