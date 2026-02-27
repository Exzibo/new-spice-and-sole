import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Trash2, Search, Calendar, Users, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export const ReservationsManagement: React.FC = () => {
  const { reservations, updateReservationStatus, deleteReservation } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = reservations.filter(res => 
    res.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
          <input
            type="text"
            placeholder="Search reservations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReservations.map((res) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-charcoal/5 space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase font-bold text-charcoal/40 tracking-widest mb-1">{res.id}</p>
                <h3 className="font-serif text-2xl text-charcoal">{res.customerName}</h3>
                <p className="text-sm text-charcoal/40">{res.phone}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                res.status === 'Approved' ? "bg-green-100 text-green-600" :
                res.status === 'Rejected' ? "bg-red-100 text-red-600" :
                "bg-yellow-100 text-yellow-600"
              )}>
                {res.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-charcoal/5">
              <div className="space-y-1">
                <Calendar size={16} className="text-saffron" />
                <p className="text-xs font-bold text-charcoal">{res.date}</p>
              </div>
              <div className="space-y-1">
                <Clock size={16} className="text-saffron" />
                <p className="text-xs font-bold text-charcoal">{res.time}</p>
              </div>
              <div className="space-y-1">
                <Users size={16} className="text-saffron" />
                <p className="text-xs font-bold text-charcoal">{res.guests} Guests</p>
              </div>
            </div>

            <div className="flex gap-2">
              {res.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => updateReservationStatus(res.id, 'Approved')}
                    className="flex-1 bg-green-500 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    Approve
                  </button>
                  <button 
                    onClick={() => updateReservationStatus(res.id, 'Rejected')}
                    className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </>
              )}
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this reservation?')) {
                    deleteReservation(res.id);
                  }
                }}
                className="p-3 text-charcoal/20 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
        {filteredReservations.length === 0 && (
          <div className="col-span-full py-20 text-center text-charcoal/20 font-serif text-2xl">
            No reservations found
          </div>
        )}
      </div>
    </div>
  );
};
