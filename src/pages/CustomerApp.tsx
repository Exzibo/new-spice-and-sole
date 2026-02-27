import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, UtensilsCrossed, ShoppingCart, CalendarDays } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { CartScreen } from '../screens/CartScreen';
import { ReservationsScreen } from '../screens/ReservationsScreen';
import { cn } from '../lib/utils';

const Navigation: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
  const { totalItems } = useCart();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: totalItems },
    { id: 'reservations', label: 'Book', icon: CalendarDays },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-charcoal/95 backdrop-blur-md border-t border-white/10 px-6 py-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex flex-col items-center gap-1 transition-all duration-300",
              activeTab === tab.id ? "text-gold scale-110" : "text-cream/40"
            )}
          >
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
            
            {tab.badge !== undefined && tab.badge > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={tab.badge}
                className="absolute -top-2 -right-2 bg-saffron text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-charcoal"
              >
                {tab.badge}
              </motion.span>
            )}
            
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-2 w-1 h-1 bg-gold rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export const CustomerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'menu':
        return <MenuScreen />;
      case 'cart':
        return <CartScreen onBrowse={() => setActiveTab('menu')} />;
      case 'reservations':
        return <ReservationsScreen />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-md min-h-screen bg-cream shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};
