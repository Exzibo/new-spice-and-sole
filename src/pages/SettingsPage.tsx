import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { Save, Building, Phone, Mail, Image as ImageIcon } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[40px] shadow-sm border border-charcoal/5 overflow-hidden">
        <div className="p-10 border-b border-charcoal/5">
          <h3 className="font-serif text-3xl text-charcoal">Restaurant Settings</h3>
          <p className="text-charcoal/40 text-sm mt-2">Manage your restaurant's public identity and contact information.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Restaurant Name</label>
              <div className="relative">
                <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Logo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Contact Phone</label>
              <div className="relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Public Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            {isSaved && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald font-bold text-sm"
              >
                Settings updated successfully!
              </motion.p>
            )}
            <button
              type="submit"
              className="ml-auto bg-saffron text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-saffron/20 transition-all"
            >
              <Save size={20} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
