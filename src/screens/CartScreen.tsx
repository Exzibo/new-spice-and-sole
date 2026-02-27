import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, X, Ticket, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { cn } from '../lib/utils';

export const CartScreen: React.FC<{ onBrowse: () => void }> = ({ onBrowse }) => {
  const { items, updateQuantity, removeFromCart, subtotal, gst, discount, total, applyCoupon, clearCart } = useCart();
  const { placeOrder } = useData();
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    const orderItems = items.map(i => `${i.name} x${i.quantity}`).join(', ');
    placeOrder({
      customerName: 'Guest Customer', // In a real app, this would come from user profile
      items: orderItems,
      totalPrice: total
    });
    setOrderPlaced(true);
  };

  const handleApplyCoupon = () => {
    const success = applyCoupon(coupon);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center mandala-pattern">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald rounded-full flex items-center justify-center text-white mb-6"
        >
          <ShoppingBag size={48} />
        </motion.div>
        <h2 className="font-serif text-3xl text-saffron mb-2">Order Placed!</h2>
        <p className="text-charcoal/60 mb-8">Your delicious meal is being prepared. Order ID: #SP{Math.floor(100000 + Math.random() * 900000)}</p>
        <button
          onClick={() => {
            clearCart();
            onBrowse();
          }}
          className="bg-saffron text-white px-8 py-3 rounded-full font-semibold"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-48 h-48 bg-cream rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={80} className="text-saffron/20" />
        </div>
        <h2 className="font-serif text-2xl text-charcoal mb-2">Your cart is empty</h2>
        <p className="text-charcoal/40 mb-8">Looks like you haven't added anything yet.</p>
        <button
          onClick={onBrowse}
          className="bg-saffron text-white px-10 py-4 rounded-full font-semibold shadow-lg"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="bg-charcoal text-cream pt-12 pb-6 px-6 sticky top-0 z-20">
        <h1 className="font-serif text-3xl text-gold">Your Cart</h1>
      </div>

      <div className="p-6 space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-charcoal/5"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-charcoal">{item.name}</h3>
              <p className="text-saffron font-bold">₹{item.price}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-saffron"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-saffron"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 p-2"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-6 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-charcoal/5">
          <div className="flex items-center gap-2 mb-4">
            <Ticket size={20} className="text-gold" />
            <input
              type="text"
              placeholder="Apply Coupon (SPICE10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={handleApplyCoupon}
              className="text-saffron font-bold text-sm"
            >
              Apply
            </button>
          </div>
          {couponError && <p className="text-red-500 text-xs mb-4">Invalid coupon code</p>}
          {discount > 0 && <p className="text-emerald text-xs mb-4">Coupon applied! 10% off</p>}

          <div className="space-y-3 pt-4 border-t border-charcoal/5">
            <div className="flex justify-between text-charcoal/60">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-charcoal/60">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-charcoal pt-3 border-t border-charcoal/5">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePlaceOrder}
          className="w-full bg-saffron text-white py-5 rounded-3xl font-bold text-lg shadow-xl flex items-center justify-center gap-3"
        >
          Place Order
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};
