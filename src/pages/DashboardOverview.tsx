import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { ShoppingBag, Utensils, CalendarCheck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const DashboardOverview: React.FC = () => {
  const { orders, reservations, menuItems } = useData();

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Pending Orders', value: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Approved Orders', value: orders.filter(o => o.status === 'Approved').length, icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Total Reservations', value: reservations.length, icon: CalendarCheck, color: 'bg-purple-500' },
    { label: 'Menu Items', value: menuItems.length, icon: Utensils, color: 'bg-saffron' },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] shadow-sm border border-charcoal/5 flex items-center gap-4"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-charcoal/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-serif text-charcoal">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[40px] shadow-sm border border-charcoal/5 overflow-hidden">
        <div className="p-8 border-b border-charcoal/5 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-charcoal">Recent Orders</h3>
          <button className="text-saffron font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-charcoal">{order.id}</td>
                  <td className="px-8 py-6 text-charcoal/60">{order.customerName}</td>
                  <td className="px-8 py-6 text-charcoal/60 max-w-xs truncate">{order.items}</td>
                  <td className="px-8 py-6 font-bold text-saffron">₹{order.totalPrice}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      order.status === 'Approved' ? "bg-green-100 text-green-600" :
                      order.status === 'Rejected' ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-600"
                    )}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
