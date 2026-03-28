import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { formatPrice, cn } from '../utils';
import { Package, Users, ShoppingCart, Clock, CheckCircle2, Truck, XCircle, LogIn, LogOut, Loader2, Search, Filter, Trash2, ExternalLink, ShieldCheck, MessageCircle, Settings as SettingsIcon } from 'lucide-react';
import AdminSettings from '../components/AdminSettings';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error('Firestore error:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    confirmed: orders.filter(o => o.status === 'Confirmed').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    revenue: orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A18]">
        <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A18] px-6">
        <div className="max-w-md w-full bg-[#1A1A1A] border border-white/10 p-12 rounded-3xl text-center">
          <div className="w-20 h-20 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-[#A0A0A0] mb-8">Please sign in with an authorized account to access the dashboard.</p>
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-[#D4AF37] text-[#050A18] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#F5D76E] transition-all"
          >
            <LogIn size={20} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Check if user is authorized (simple check for this demo)
  const isAuthorized = user.email === 'hashkaleican23@gmail.com';

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A18] px-6">
        <div className="max-w-md w-full bg-[#1A1A1A] border border-white/10 p-12 rounded-3xl text-center">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <XCircle size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-[#A0A0A0] mb-8">Your account ({user.email}) is not authorized to access this dashboard.</p>
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-white/5 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-[#A0A0A0]">Manage orders and monitor business performance.</p>
          </div>
          <div className="flex bg-[#1A1A1A] p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                activeTab === 'orders' ? "bg-[#D4AF37] text-[#050A18]" : "text-[#A0A0A0] hover:text-white"
              )}
            >
              Orders
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                activeTab === 'settings' ? "bg-[#D4AF37] text-[#050A18]" : "text-[#A0A0A0] hover:text-white"
              )}
            >
              Settings
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user.displayName}</p>
              <p className="text-xs text-[#A0A0A0]">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {activeTab === 'settings' ? (
          <AdminSettings />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center">
                <ShoppingCart size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500">+12%</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.total}</p>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-widest">Total Orders</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#007BFF]/10 text-[#007BFF] rounded-xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <span className="text-xs font-bold text-amber-500">{stats.pending} Pending</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.pending}</p>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-widest">Pending Orders</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500">Active</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.confirmed + stats.shipped}</p>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-widest">In Progress</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center">
                <Package size={24} />
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{formatPrice(stats.revenue)}</p>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-widest">Total Revenue</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={16} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-[#050A18] border border-white/10 rounded-xl py-2 pl-10 pr-8 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[#A0A0A0] text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Items</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center">
                      <Loader2 className="animate-spin text-[#D4AF37] mx-auto" size={32} />
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6 font-mono text-sm text-[#D4AF37]">{order.orderId}</td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold">{order.customerName}</p>
                        <p className="text-xs text-[#A0A0A0]">{order.phone}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-white">{order.items.length} items</p>
                        <p className="text-[10px] text-[#A0A0A0] line-clamp-1">{order.items.map((i: any) => i.name).join(', ')}</p>
                      </td>
                      <td className="px-8 py-6 font-bold">{formatPrice(order.total)}</td>
                      <td className="px-8 py-6">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={cn(
                            "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-transparent border cursor-pointer focus:outline-none",
                            order.status === 'Pending' && "text-amber-500 border-amber-500/20",
                            order.status === 'Confirmed' && "text-blue-500 border-blue-500/20",
                            order.status === 'Shipped' && "text-indigo-500 border-indigo-500/20",
                            order.status === 'Delivered' && "text-emerald-500 border-emerald-500/20",
                            order.status === 'Cancelled' && "text-red-500 border-red-500/20"
                          )}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${order.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(order.customerName)},%20this%20is%20KAPU%20Tech%20regarding%20your%20order%20%23${order.orderId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#007BFF] hover:bg-[#007BFF]/10 rounded-lg transition-colors"
                            title="Contact on WhatsApp"
                          >
                            <MessageCircle size={18} />
                          </a>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-[#A0A0A0]">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
