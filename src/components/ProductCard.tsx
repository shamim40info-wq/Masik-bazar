import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  quantityInCart?: number;
  onUpdateQuantity?: (id: number, delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  quantityInCart = 0,
  onUpdateQuantity 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full font-bangla">
            সাশ্রয় ৳{product.originalPrice - product.price}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-slate-400 font-bangla mb-1">{product.unit}</p>
        <h3 className="font-bangla font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between gap-2 mb-4">
          <div>
            <span className="text-lg font-bold text-primary">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-2">৳{product.originalPrice}</span>
            )}
          </div>
        </div>

        {quantityInCart > 0 ? (
          <div className="flex items-center justify-between bg-primary-light rounded-xl p-1">
            <button 
              onClick={() => onUpdateQuantity?.(product.id, -1)}
              className="w-8 h-8 flex items-center justify-center bg-white text-primary rounded-lg shadow-sm active:scale-90 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-primary-dark">{quantityInCart}</span>
            <button 
              onClick={() => onUpdateQuantity?.(product.id, 1)}
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-sm active:scale-90 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-xl font-bangla font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            কার্টে যোগ করুন
          </button>
        )}
      </div>
    </div>
  );
};
