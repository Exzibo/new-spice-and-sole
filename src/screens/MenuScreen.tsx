import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Info, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { FoodItem } from '../types/admin';
import { cn } from '../lib/utils';

const categories = [
  { id: 'Starters', label: 'Starters', icon: '🥗' },
  { id: 'Main Course', label: 'Main Course', icon: '🍛' },
  { id: 'Drinks', label: 'Drinks', icon: '🥤' },
  { id: 'Desserts', label: 'Desserts', icon: '🍰' },
];

export const MenuScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const { items, addToCart, updateQuantity } = useCart();
  const { menuItems } = useData();

  const filteredMenu = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-charcoal text-cream pt-12 pb-6 px-6 sticky top-0 z-20 shadow-lg">
        <h1 className="font-serif text-3xl text-gold mb-6">Our Menu</h1>
        
        {/* Category Tabs */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300",
                activeCategory === cat.id 
                  ? "bg-saffron text-white shadow-lg scale-105" 
                  : "bg-charcoal/50 text-cream/60 border border-cream/10"
              )}
            >
              <span>{cat.icon}</span>
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-charcoal/5"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <div className={cn(
            "w-4 h-4 rounded-full border-2",
            item.isVeg !== false ? "bg-green-500 border-green-200" : "bg-red-500 border-red-200"
          )} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-charcoal">{item.name}</h3>
          <span className="text-saffron font-bold text-lg">₹{item.price}</span>
        </div>
        
        <p className="text-sm text-charcoal/60 mb-4 line-clamp-1">{item.description}</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Flame
                key={i}
                size={14}
                className={cn(i < (item.spiceLevel || 0) ? "text-saffron fill-saffron" : "text-charcoal/10")}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Spice Level</span>
        </div>

        <div className="flex justify-center">
          {!cartItem ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(item)}
              className="w-full bg-cream border border-saffron/20 text-saffron py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-saffron hover:text-white transition-colors"
            >
              <Plus size={18} />
              Add to Cart
            </motion.button>
          ) : (
            <div className="w-full flex items-center justify-between bg-saffron text-white p-1 rounded-2xl">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQuantity(item.id, -1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20"
              >
                <Minus size={18} />
              </motion.button>
              <span className="font-bold text-lg">{cartItem.quantity}</span>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQuantity(item.id, 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20"
              >
                <Plus size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
