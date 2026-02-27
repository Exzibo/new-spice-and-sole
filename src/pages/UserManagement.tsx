import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, X, User as UserIcon, Shield, Mail } from 'lucide-react';
import { User } from '../types/admin';
import { cn } from '../lib/utils';

export const UserManagement: React.FC = () => {
  const { adminUsers, addAdminUser, deleteAdminUser } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    password: '',
    role: 'Staff',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdminUser(formData);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', role: 'Staff' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-saffron text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-saffron/20 transition-all"
        >
          <Plus size={20} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-charcoal/5 relative group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-xl text-charcoal">{user.name}</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest",
                  user.role === 'Admin' ? "bg-saffron/10 text-saffron" : "bg-blue-100 text-blue-600"
                )}>
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-charcoal/60">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-charcoal/20" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-charcoal/20" />
                <span>Access: {user.role === 'Admin' ? 'Full' : 'Limited'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this user?')) {
                  deleteAdminUser(user.id);
                }
              }}
              className="absolute top-6 right-6 p-2 text-charcoal/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))}
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
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-charcoal/5 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-charcoal">Add New Admin User</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-charcoal/20 hover:text-charcoal transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-charcoal/40 ml-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-stone-50 px-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'Admin' })}
                    className={cn(
                      "py-4 rounded-2xl border font-bold text-sm transition-all",
                      formData.role === 'Admin' ? "bg-saffron border-saffron text-white shadow-lg" : "bg-stone-50 border-charcoal/5 text-charcoal/40"
                    )}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'Staff' })}
                    className={cn(
                      "py-4 rounded-2xl border font-bold text-sm transition-all",
                      formData.role === 'Staff' ? "bg-saffron border-saffron text-white shadow-lg" : "bg-stone-50 border-charcoal/5 text-charcoal/40"
                    )}
                  >
                    Staff
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-saffron text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-saffron/20 transition-all"
                >
                  Create User
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
