/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Categories } from './components/Categories';
import { ProductCard } from './components/ProductCard';
import { SpecialOffers } from './components/SpecialOffers';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { Product, CartItem, SiteSettings } from './types';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<'store' | 'admin-auth' | 'admin-panel'>('store');

  useEffect(() => {
    fetchProducts();
    fetchSettings();
  }, [view]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
      
      // Apply settings to document
      if (data.site_title) document.title = data.site_title;
      
      if (data.site_favicon) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = data.site_favicon;
      }

      // Inject tracking code
      if (data.tracking_code) {
        const existingScript = document.getElementById('dynamic-tracking-code');
        if (existingScript) existingScript.remove();
        
        const container = document.createElement('div');
        container.id = 'dynamic-tracking-code';
        container.innerHTML = data.tracking_code;
        
        // Execute scripts if any
        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          const script = document.createElement('script');
          if (scripts[i].src) {
            script.src = scripts[i].src;
          } else {
            script.textContent = scripts[i].textContent;
          }
          document.head.appendChild(script);
        }
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  };

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
  [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart_items_backup', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
      localStorage.setItem('cart_items_backup', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== id);
      localStorage.setItem('cart_items_backup', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    localStorage.removeItem('cart_items_backup');
  };

  if (view === 'admin-auth') {
    return (
      <AdminAuth 
        onLoginSuccess={() => setView('admin-panel')} 
        onBack={() => setView('store')} 
      />
    );
  }

  if (view === 'admin-panel') {
    return (
      <>
        <Navbar settings={settings} cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <AdminPanel onLogout={() => setView('store')} />
        <button 
          onClick={() => setView('store')}
          className="fixed bottom-8 right-8 bg-slate-900 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2 font-bangla"
        >
          <Settings className="w-5 h-5" />
          স্টোরে ফিরে যান
        </button>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        settings={settings}
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="flex-grow">
        <Hero settings={settings} />
        <Features />
        <Categories />

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bangla font-bold text-slate-900 mb-4">জনপ্রিয় পণ্যসমূহ</h2>
                <p className="text-slate-500 font-bangla">সেরা মানের পণ্য এখন আপনার হাতের নাগালে।</p>
              </div>
              <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
                {['সব', 'চাল ও ডাল', 'তেল ও মসলা'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat === 'সব' ? null : cat)}
                    className={`px-4 py-2 rounded-lg font-bangla text-sm transition-all ${
                      (cat === 'সব' && !activeCategory) || cat === activeCategory 
                        ? 'bg-white text-primary shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart}
                    quantityInCart={cartItems.find(item => item.id === product.id)?.quantity}
                    onUpdateQuantity={updateQuantity}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button className="btn-secondary px-10">আরও পণ্য দেখুন</button>
            </div>
          </div>
        </section>

        <SpecialOffers />
        <Testimonials />
      </main>

      <Footer settings={settings} onAdminLogin={() => setView('admin-auth')} />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}
