import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const HomeScreen: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070"
          alt="Restaurant Interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-gold mb-4 drop-shadow-lg">
              Spice & Soul
            </h1>
            <p className="text-cream text-xl md:text-2xl font-light tracking-widest uppercase mb-8">
              Authentic Indian Flavors, Reimagined
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('menu')}
                className="bg-saffron text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl"
              >
                Explore Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('reservations')}
                className="bg-transparent border-2 border-gold text-gold px-10 py-4 rounded-full font-semibold text-lg backdrop-blur-sm"
              >
                Book a Table
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-cream opacity-60"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-20 px-6 mandala-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-saffron mb-6">Our Philosophy</h2>
          <p className="text-lg text-charcoal/80 leading-relaxed">
            At Spice & Soul, we believe that food is a journey through culture and time. 
            Our chefs blend traditional techniques with modern presentation to bring you 
            the most authentic flavors of India, served in a contemporary setting.
          </p>
        </div>
      </section>
    </div>
  );
};
