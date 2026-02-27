import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Upload, Search } from 'lucide-react';
import { FoodItem } from '../types/admin';
import { cn } from '../lib/utils';

export const MenuManagement: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Main Course',
    image: 'https://picsum.photos/seed/food/200',
  });

  const handleOpenModal = (item?: FoodItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Main Course',
        image: 'https://picsum.photos/seed/food/200',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem({ ...formData, id: editingItem.id });
    } else {
      addMenuItem(formData);
    }
    setIsModalOpen(false);
  };

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all shadow-sm"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-saffron text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-saffron/20 transition-all"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Image</th>
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-8 py-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-charcoal">{item.name}</p>
                    <p className="text-xs text-charcoal/40 truncate max-w-[200px]">{item.description}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-stone-100 text-charcoal/60 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-bold text-saffron">₹{item.price}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this item?')) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-charcoal/5 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-charcoal">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-charcoal/20 hover:text-charcoal transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Item Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all appearance-none"
                    >
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Image URL</label>
                    <div className="relative">
                      <Upload className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-4 rounded-2xl font-bold text-charcoal/40 hover:bg-stone-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-saffron text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-saffron/20 transition-all"
                  >
                    {editingItem ? 'Save Changes' : 'Add Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
