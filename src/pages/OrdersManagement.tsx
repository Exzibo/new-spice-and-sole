import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Trash2, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

export const OrdersManagement: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white pl-16 pr-6 py-4 rounded-2xl border border-charcoal/5 focus:border-saffron outline-none transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-charcoal text-white shadow-lg" 
                  : "bg-white text-charcoal/40 border border-charcoal/5"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-charcoal">{order.id}</td>
                  <td className="px-8 py-6 text-charcoal/60">{order.customerName}</td>
                  <td className="px-8 py-6 text-charcoal/60 max-w-xs truncate">{order.items}</td>
                  <td className="px-8 py-6 font-bold text-saffron">₹{order.totalPrice}</td>
                  <td className="px-8 py-6 text-charcoal/40 text-sm">{order.date}</td>
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
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {order.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Approved')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Rejected')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this order?')) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="p-2 text-charcoal/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-charcoal/20 font-serif text-2xl">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
