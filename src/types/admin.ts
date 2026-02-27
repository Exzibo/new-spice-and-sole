export type UserRole = 'Admin' | 'Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main Course' | 'Drinks' | 'Desserts';
  image: string;
}

export type OrderStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Order {
  id: string;
  customerName: string;
  items: string; // Simplified for this demo
  totalPrice: number;
  date: string;
  status: OrderStatus;
}

export type ReservationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
}

export interface RestaurantSettings {
  name: string;
  logo: string;
  contactInfo: string;
  email: string;
}
