import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { DashboardOverview } from './pages/DashboardOverview';
import { MenuManagement } from './pages/MenuManagement';
import { OrdersManagement } from './pages/OrdersManagement';
import { ReservationsManagement } from './pages/ReservationsManagement';
import { UserManagement } from './pages/UserManagement';
import { SettingsPage } from './pages/SettingsPage';
import { CustomerApp } from './pages/CustomerApp';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <Routes>
              {/* Customer Facing App */}
              <Route path="/" element={<CustomerApp />} />

              {/* Admin Auth */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin/signup" element={<SignupPage />} />

              {/* Admin Dashboard */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<DashboardOverview />} />
                        <Route path="menu" element={<MenuManagement />} />
                        <Route path="orders" element={<OrdersManagement />} />
                        <Route path="reservations" element={<ReservationsManagement />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
