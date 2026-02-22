import React, { useState, useEffect } from 'react';
import { Product, Order, SiteSettings } from '../types';
import { Package, ShoppingBag, Edit2, Save, X, CheckCircle, Clock, Plus, Settings as SettingsIcon, Globe, Image as ImageIcon, Phone, Mail, MapPin, Code, Trash2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchSettings();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  const updateOrderStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const fetchSettings = async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    setSettings(data);
  };

  const saveSettings = async () => {
    setIsSavingSettings(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setIsSavingSettings(false);
    // Trigger a refresh of the site title/favicon if needed
    window.location.reload(); // Simple way to apply all global changes
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditForm({
      name: '',
      price: 0,
      originalPrice: null,
      image: '',
      category: 'grocery',
      unit: '',
    });
  };

  const saveEdit = async () => {
    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
    } else if (isAdding) {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
    }
    setEditingId(null);
    setIsAdding(false);
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    if (confirm('আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?')) {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string = 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (activeTab === 'settings') {
          setSettings({ ...settings, [field]: reader.result as string });
        } else {
          setEditForm({ ...editForm, [field]: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bangla font-bold text-slate-900">অ্যাডমিন কন্ট্রোল</h1>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="লগআউট"
            >
              <LogOut className="w-6 h-6" />
            </button>
            <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-2 rounded-lg font-bangla font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'products' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Package className="w-4 h-4" />
                পণ্য
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-2 rounded-lg font-bangla font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                অর্ডার
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-2 rounded-lg font-bangla font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'settings' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                সেটিংস
              </button>
            </div>
            {activeTab === 'products' && !isAdding && (
              <button 
                onClick={startAdding}
                className="btn-primary py-2 px-6 flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                নতুন পণ্য
              </button>
            )}
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left font-bangla">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-700">ছবি</th>
                  <th className="px-6 py-4 font-bold text-slate-700">নাম</th>
                  <th className="px-6 py-4 font-bold text-slate-700">মূল্য</th>
                  <th className="px-6 py-4 font-bold text-slate-700">ইউনিট</th>
                  <th className="px-6 py-4 font-bold text-slate-700">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isAdding && (
                  <tr className="bg-primary/5">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {editForm.image && (
                          <img src={editForm.image} className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                          className="text-xs"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="পণ্যের নাম"
                        className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={editForm.price || 0}
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                          className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                        <input
                          type="number"
                          value={editForm.originalPrice || 0}
                          onChange={(e) => setEditForm({ ...editForm, originalPrice: Number(e.target.value) })}
                          className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-400"
                          placeholder="Old Price"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.unit || ''}
                        onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                        placeholder="ইউনিট"
                        className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20">
                          <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex flex-col gap-2">
                          {editForm.image && (
                            <img src={editForm.image} className="w-12 h-12 rounded-lg object-cover" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="text-xs"
                          />
                        </div>
                      ) : (
                        <img src={product.image} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                      ) : (
                        <span className="font-semibold text-slate-800">{product.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={editForm.price || 0}
                            onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                            className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                          />
                          <input
                            type="number"
                            value={editForm.originalPrice || 0}
                            onChange={(e) => setEditForm({ ...editForm, originalPrice: Number(e.target.value) })}
                            className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-400"
                            placeholder="Old Price"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="text-primary font-bold">৳{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through ml-2">৳{product.originalPrice}</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editForm.unit || ''}
                          onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                          className="w-24 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                      ) : (
                        <span className="text-slate-500">{product.unit}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <button onClick={saveEdit} className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => startEditing(product)} className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-xs font-bold">
                        ORDER #{order.id}
                      </span>
                      <span className="text-slate-400 text-xs font-bangla">
                        {new Date(order.createdAt).toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bangla font-bold text-slate-900">{order.customerName}</h3>
                    <p className="text-slate-500 font-bangla text-sm">{order.phone} | {order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">৳{order.total}</p>
                    <div className={`flex items-center gap-2 font-bangla text-sm mt-1 ${
                      order.status === 'pending' ? 'text-orange-500' : 
                      order.status === 'shipped' ? 'text-blue-500' : 
                      order.status === 'delivered' ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {order.status === 'pending' && <Clock className="w-4 h-4" />}
                      {order.status === 'shipped' && <Package className="w-4 h-4" />}
                      {order.status === 'delivered' && <CheckCircle className="w-4 h-4" />}
                      <span>
                        {order.status === 'pending' ? 'পেন্ডিং' : 
                         order.status === 'shipped' ? 'শিপড' : 
                         order.status === 'delivered' ? 'ডেলিভারড' : 'বাতিল'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h4 className="font-bangla font-bold text-sm text-slate-700 mb-3">অর্ডার আইটেম:</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {JSON.parse(order.items).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100">
                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bangla font-bold text-xs text-slate-800 line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-bangla">{item.quantity} x ৳{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="px-6 py-2 bg-orange-500 text-white rounded-xl font-bangla font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                    >
                      শিপিং শুরু করুন
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bangla font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                    >
                      ডেলিভারি সম্পন্ন
                    </button>
                  )}
                  {order.status !== 'delivered' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-6 py-2 border border-red-200 text-red-500 rounded-xl font-bangla font-bold hover:bg-red-50"
                    >
                      বাতিল করুন
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-bangla font-bold">
                      <CheckCircle className="w-5 h-5" />
                      অর্ডারটি সফলভাবে সম্পন্ন হয়েছে
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="font-bangla text-slate-400">এখনও কোনো অর্ডার আসেনি!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bangla font-bold text-slate-900">সাধারণ সেটিংস</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bangla text-sm font-semibold text-slate-700">ওয়েবসাইট টাইটেল</label>
                  <input 
                    type="text" 
                    value={settings.site_title || ''}
                    onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bangla"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-bangla text-sm font-semibold text-slate-700">লোগো</label>
                    <div className="flex flex-col gap-3">
                      {settings.site_logo && (
                        <img src={settings.site_logo} className="h-12 object-contain bg-slate-100 rounded-lg p-2" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'site_logo')}
                        className="text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-bangla text-sm font-semibold text-slate-700">ফেভিকন</label>
                    <div className="flex flex-col gap-3">
                      {settings.site_favicon && (
                        <img src={settings.site_favicon} className="w-8 h-8 object-contain bg-slate-100 rounded-lg p-1" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'site_favicon')}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Settings */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bangla font-bold text-slate-900">যোগাযোগের তথ্য</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bangla text-sm font-semibold text-slate-700">ফোন নম্বর</label>
                  <input 
                    type="text" 
                    value={settings.contact_phone || ''}
                    onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bangla"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bangla text-sm font-semibold text-slate-700">ইমেইল</label>
                  <input 
                    type="email" 
                    value={settings.contact_email || ''}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bangla"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bangla text-sm font-semibold text-slate-700">ঠিকানা</label>
                  <textarea 
                    value={settings.contact_address || ''}
                    onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bangla h-24"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bangla font-bold text-slate-900">অ্যাডভান্সড সেটিংস (Tracking Code)</h2>
              </div>
              
              <div className="space-y-2">
                <label className="font-bangla text-sm font-semibold text-slate-700">Google Analytics / Pixel Tracking Code (Head Section)</label>
                <textarea 
                  value={settings.tracking_code || ''}
                  onChange={(e) => setSettings({ ...settings, tracking_code: e.target.value })}
                  placeholder="<script>...</script>"
                  className="w-full px-4 py-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono text-sm h-48"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={saveSettings}
                  disabled={isSavingSettings}
                  className="btn-primary px-12 py-4 flex items-center gap-2 shadow-xl shadow-primary/20"
                >
                  {isSavingSettings ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  সব পরিবর্তন সেভ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
