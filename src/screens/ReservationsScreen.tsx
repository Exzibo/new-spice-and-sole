import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Star, MapPin, CheckCircle2, Plus, Minus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { cn } from '../lib/utils';

const reservationSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit number'),
  email: z.string().email('Invalid email address'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  guests: z.number().min(1).max(20),
  occasion: z.string().optional(),
  requests: z.string().optional(),
  seating: z.enum(['indoor', 'outdoor', 'private']),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export const ReservationsScreen: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const { addReservation } = useData();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      seating: 'indoor',
    },
  });

  const guests = watch('guests');
  const seating = watch('seating');

  const onSubmit = (data: ReservationForm) => {
    const newBookingId = Math.floor(100000 + Math.random() * 900000).toString();
    addReservation({
      customerName: data.fullName,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests
    });
    setBookingId(newBookingId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center mandala-pattern">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-white mb-8 shadow-2xl"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        
        <h2 className="font-serif text-4xl text-saffron mb-4">Table Reserved!</h2>
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gold/20 w-full max-w-md mb-8">
          <p className="text-charcoal/40 text-xs uppercase tracking-widest font-bold mb-2">Booking ID</p>
          <p className="text-3xl font-serif text-charcoal mb-6">#{bookingId}</p>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[10px] uppercase font-bold text-charcoal/40">Date</p>
              <p className="font-medium">{watch('date')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-charcoal/40">Time</p>
              <p className="font-medium">{watch('time')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-charcoal/40">Guests</p>
              <p className="font-medium">{watch('guests')} People</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-charcoal/40">Seating</p>
              <p className="font-medium capitalize">{watch('seating')}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="bg-charcoal text-white px-10 py-4 rounded-full font-semibold"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="bg-charcoal text-cream pt-12 pb-6 px-6 sticky top-0 z-20">
        <h1 className="font-serif text-3xl text-gold">Reservations</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-saffron border-b border-saffron/10 pb-2">Personal Details</h3>
          
          <div className="space-y-1">
            <input
              {...register('fullName')}
              placeholder="Full Name"
              className={cn(
                "w-full bg-white px-6 py-4 rounded-2xl border outline-none transition-all",
                errors.fullName ? "border-red-500" : "border-charcoal/5 focus:border-saffron"
              )}
            />
            {errors.fullName && <p className="text-red-500 text-xs ml-2">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/40 font-bold">+91</span>
                <input
                  {...register('phone')}
                  placeholder="Phone Number"
                  className={cn(
                    "w-full bg-white pl-16 pr-6 py-4 rounded-2xl border outline-none transition-all",
                    errors.phone ? "border-red-500" : "border-charcoal/5 focus:border-saffron"
                  )}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs ml-2">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <input
                {...register('email')}
                placeholder="Email Address"
                className={cn(
                  "w-full bg-white px-6 py-4 rounded-2xl border outline-none transition-all",
                  errors.email ? "border-red-500" : "border-charcoal/5 focus:border-saffron"
                )}
              />
              {errors.email && <p className="text-red-500 text-xs ml-2">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-saffron border-b border-saffron/10 pb-2">Booking Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <input
                type="date"
                {...register('date')}
                className={cn(
                  "w-full bg-white px-6 py-4 rounded-2xl border outline-none transition-all",
                  errors.date ? "border-red-500" : "border-charcoal/5 focus:border-saffron"
                )}
              />
              {errors.date && <p className="text-red-500 text-xs ml-2">{errors.date.message}</p>}
            </div>

            <div className="space-y-1">
              <select
                {...register('time')}
                className={cn(
                  "w-full bg-white px-6 py-4 rounded-2xl border outline-none transition-all appearance-none",
                  errors.time ? "border-red-500" : "border-charcoal/5 focus:border-saffron"
                )}
              >
                <option value="">Select Time</option>
                {['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && <p className="text-red-500 text-xs ml-2">{errors.time.message}</p>}
            </div>
          </div>

          {/* Guest Stepper */}
          <div className="bg-white p-6 rounded-3xl border border-charcoal/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="text-saffron" />
              <span className="font-medium">Number of Guests</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setValue('guests', Math.max(1, guests - 1))}
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-saffron"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-xl w-6 text-center">{guests}</span>
              <button
                type="button"
                onClick={() => setValue('guests', Math.min(20, guests + 1))}
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-saffron"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Seating Preference */}
          <div className="grid grid-cols-3 gap-2">
            {['indoor', 'outdoor', 'private'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue('seating', s as any)}
                className={cn(
                  "py-4 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all",
                  seating === s 
                    ? "bg-saffron border-saffron text-white shadow-lg" 
                    : "bg-white border-charcoal/5 text-charcoal/40"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-saffron border-b border-saffron/10 pb-2">Additional Info</h3>
          
          <select
            {...register('occasion')}
            className="w-full bg-white px-6 py-4 rounded-2xl border border-charcoal/5 outline-none appearance-none"
          >
            <option value="">Select Occasion</option>
            <option value="birthday">Birthday 🎂</option>
            <option value="anniversary">Anniversary 💍</option>
            <option value="business">Business Dinner 💼</option>
            <option value="casual">Casual Dining 🍽️</option>
          </select>

          <textarea
            {...register('requests')}
            placeholder="Special Requests (Optional)"
            rows={4}
            className="w-full bg-white px-6 py-4 rounded-2xl border border-charcoal/5 outline-none focus:border-saffron transition-all"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-saffron to-gold text-white py-5 rounded-3xl font-bold text-lg shadow-xl"
        >
          Reserve My Table
        </motion.button>
      </form>
    </div>
  );
};
