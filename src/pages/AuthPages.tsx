import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 mandala-pattern">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-saffron mb-2">Spice & Soul</h1>
            <p className="text-charcoal/40 uppercase tracking-widest text-xs font-bold">Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-saffron text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-saffron/20 transition-all flex items-center justify-center gap-3"
            >
              <LogIn size={20} />
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-charcoal/40 text-sm">
              Don't have an account?{' '}
              <Link to="/admin/signup" className="text-saffron font-bold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Staff'>('Staff');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await signup(name, username, password, role);
    if (success) {
      navigate('/admin/login');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 mandala-pattern">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-saffron mb-2">Spice & Soul</h1>
            <p className="text-charcoal/40 uppercase tracking-widest text-xs font-bold">Create Admin Account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={cn(
                  "py-4 rounded-2xl border font-bold text-sm transition-all",
                  role === 'Admin' ? "bg-saffron border-saffron text-white shadow-lg" : "bg-stone-50 border-charcoal/5 text-charcoal/40"
                )}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('Staff')}
                className={cn(
                  "py-4 rounded-2xl border font-bold text-sm transition-all",
                  role === 'Staff' ? "bg-saffron border-saffron text-white shadow-lg" : "bg-stone-50 border-charcoal/5 text-charcoal/40"
                )}
              >
                Staff
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-saffron text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-saffron/20 transition-all flex items-center justify-center gap-3"
            >
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-charcoal/40 text-sm">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-saffron font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
