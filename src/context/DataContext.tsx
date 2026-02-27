import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, Order, Reservation, RestaurantSettings, User } from '../types/admin';

interface DataContextType {
  menuItems: FoodItem[];
  orders: Order[];
  reservations: Reservation[];
  settings: RestaurantSettings;
  adminUsers: User[];
  addMenuItem: (item: Omit<FoodItem, 'id'>) => void;
  updateMenuItem: (item: FoodItem) => void;
  deleteMenuItem: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  deleteReservation: (id: string) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => void;
  updateSettings: (settings: RestaurantSettings) => void;
  addAdminUser: (user: Omit<User, 'id'>) => void;
  deleteAdminUser: (id: string) => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'date'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_MENU: FoodItem[] = [
  { id: 's1', name: 'Paneer Tikka', description: 'Succulent paneer cubes marinated in spiced yogurt and grilled to perfection.', price: 299, category: 'Starters', isVeg: true, spiceLevel: 2, image: 'https://picsum.photos/seed/paneertikka/400/300' },
  { id: 's2', name: 'Chicken Seekh Kebab', description: 'Minced chicken blended with aromatic spices and grilled on skewers.', price: 349, category: 'Starters', isVeg: false, spiceLevel: 2, image: 'https://picsum.photos/seed/chickenkebab/400/300' },
  { id: 's3', name: 'Hara Bhara Kebab', description: 'Healthy and delicious spinach and green pea patties.', price: 249, category: 'Starters', isVeg: true, spiceLevel: 1, image: 'https://picsum.photos/seed/harabhara/400/300' },
  { id: 'm1', name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato-based gravy.', price: 449, category: 'Main Course', isVeg: false, spiceLevel: 1, image: 'https://picsum.photos/seed/butterchicken/400/300' },
  { id: 'm2', name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter.', price: 349, category: 'Main Course', isVeg: true, spiceLevel: 1, image: 'https://picsum.photos/seed/dalmakhani/400/300' },
  { id: 'm5', name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with spiced chicken and herbs.', price: 499, category: 'Main Course', isVeg: false, spiceLevel: 2, image: 'https://picsum.photos/seed/chickenbiryani/400/300' },
  { id: 'd1', name: 'Mango Lassi', description: 'Refreshing yogurt-based drink with sweet mango pulp.', price: 149, category: 'Drinks', isVeg: true, spiceLevel: 0, image: 'https://picsum.photos/seed/mangolassi/400/300' },
  { id: 'd2', name: 'Masala Chai', description: 'Traditional Indian spiced tea with milk.', price: 79, category: 'Drinks', isVeg: true, spiceLevel: 0, image: 'https://picsum.photos/seed/masalachai/400/300' },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD001', customerName: 'John Doe', items: 'Butter Chicken x1, Naan x2', totalPrice: 550, date: '2026-02-27', status: 'Pending' },
  { id: 'ORD002', customerName: 'Jane Smith', items: 'Paneer Tikka x2', totalPrice: 598, date: '2026-02-27', status: 'Approved' },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'RES001', customerName: 'Alice Brown', phone: '9876543210', date: '2026-02-28', time: '19:00', guests: 4, status: 'Pending' },
];

const INITIAL_SETTINGS: RestaurantSettings = {
  name: 'Spice & Soul',
  logo: 'https://picsum.photos/seed/logo/100',
  contactInfo: '+91 98765 43210',
  email: 'contact@spiceandsoul.com',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>(() => JSON.parse(localStorage.getItem('admin_menu') || JSON.stringify(INITIAL_MENU)));
  const [orders, setOrders] = useState<Order[]>(() => JSON.parse(localStorage.getItem('admin_orders') || JSON.stringify(INITIAL_ORDERS)));
  const [reservations, setReservations] = useState<Reservation[]>(() => JSON.parse(localStorage.getItem('admin_reservations') || JSON.stringify(INITIAL_RESERVATIONS)));
  const [settings, setSettings] = useState<RestaurantSettings>(() => JSON.parse(localStorage.getItem('admin_settings') || JSON.stringify(INITIAL_SETTINGS)));
  const [adminUsers, setAdminUsers] = useState<User[]>(() => JSON.parse(localStorage.getItem('admin_users') || '[]'));

  useEffect(() => { localStorage.setItem('admin_menu', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('admin_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('admin_reservations', JSON.stringify(reservations)); }, [reservations]);
  useEffect(() => { localStorage.setItem('admin_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(adminUsers)); }, [adminUsers]);

  const addMenuItem = (item: Omit<FoodItem, 'id'>) => setMenuItems([...menuItems, { ...item, id: Date.now().toString() }]);
  const updateMenuItem = (item: FoodItem) => setMenuItems(menuItems.map(i => i.id === item.id ? item : i));
  const deleteMenuItem = (id: string) => setMenuItems(menuItems.filter(i => i.id !== id));

  const updateOrderStatus = (id: string, status: Order['status']) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  const deleteOrder = (id: string) => setOrders(orders.filter(o => o.id !== id));

  const updateReservationStatus = (id: string, status: Reservation['status']) => setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
  const deleteReservation = (id: string) => setReservations(reservations.filter(r => r.id !== id));

  const addReservation = (resData: Omit<Reservation, 'id' | 'status'>) => {
    const newRes: Reservation = {
      ...resData,
      id: `RES${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending'
    };
    setReservations([newRes, ...reservations]);
  };

  const updateSettings = (newSettings: RestaurantSettings) => setSettings(newSettings);

  const addAdminUser = (user: Omit<User, 'id'>) => setAdminUsers([...adminUsers, { ...user, id: Date.now().toString() }]);
  const deleteAdminUser = (id: string) => setAdminUsers(adminUsers.filter(u => u.id !== id));

  const placeOrder = (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <DataContext.Provider value={{
      menuItems, orders, reservations, settings, adminUsers,
      addMenuItem, updateMenuItem, deleteMenuItem,
      updateOrderStatus, deleteOrder,
      updateReservationStatus, deleteReservation, addReservation,
      updateSettings, addAdminUser, deleteAdminUser,
      placeOrder
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
