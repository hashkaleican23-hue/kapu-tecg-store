import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { Package, ShoppingBag, Users, Star, Settings, LogOut, Search, Filter, CheckCircle, Truck, Clock, Trash2, Edit, ExternalLink, MessageCircle, AlertCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, cn } from '../utils';
import { WHATSAPP_NUMBER, SAMPLE_PRODUCTS } from '../constants';

export default function Admin() {
  const { user, profile, loading, logout, loginWithGoogle } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      fetchOrders();
    }
  }, [user, profile]);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const seedData = async () => {
    if (window.confirm('Are you sure you want to seed sample products? This will add them to your Firestore.')) {
      try {
        const productsRef = collection(db, 'products');
        for (const product of SAMPLE_PRODUCTS) {
          await addDoc(productsRef, product);
        }
        alert('Sample products seeded successfully!');
      } catch (err) {
        console.error('Error seeding data:', err);
        alert('Failed to seed data.');
      }
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const updateOrderStatus = async (orderId: string, docId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', docId), { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const deleteOrder = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteDoc(doc(db, 'orders', docId));
        setOrders(prev => prev.filter(o => o.id !== docId));
        fetchOrders();
      } catch (err) {
        console.error('Error deleting order:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-spin">
          <Clock size={40} />
        </div>
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-tighter">Loading Admin Panel...</h1>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
          <AlertCircle size={64} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Access Denied</h1>
          <p className="text-text-secondary font-bold text-lg">This area is restricted to administrators only. Please log in with an authorized account.</p>
        </div>
        <button 
          onClick={handleLogin}
          className="btn-primary px-12 py-4 text-lg flex items-center justify-center gap-3 mx-auto"
        >
          <Users size={24} />
          Login as Admin
        </button>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.phone.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center overflow-hidden border-2 border-primary">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt={profile.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Users size={20} className="text-white" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-black text-text-primary uppercase tracking-tight truncate">{profile?.displayName || 'Admin'}</h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Administrator</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'orders', icon: ShoppingBag, label: 'Orders' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-text-secondary hover:bg-bg-section"
                )}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-text-primary uppercase tracking-tighter">Manage Orders</h2>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-border-light rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:outline-none focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white p-8 rounded-3xl border border-border-light shadow-sm hover:shadow-md transition-all space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border-light pb-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black text-primary tracking-tight">{order.id}</span>
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                              order.status === 'Pending' ? "bg-orange-100 text-orange-600" :
                              order.status === 'Confirmed' ? "bg-blue-100 text-blue-600" :
                              "bg-green-100 text-green-600"
                            )}>{order.status}</span>
                          </div>
                          <p className="text-xs font-bold text-text-secondary">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateOrderStatus(order.id, order.id, 'Confirmed')}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                            title="Mark as Confirmed"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, order.id, 'Shipped')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all"
                            title="Mark as Shipped"
                          >
                            <Truck size={20} />
                          </button>
                          <button 
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                            title="Delete Order"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Customer</h4>
                          <div className="space-y-1 text-sm font-bold text-text-primary">
                            <p>{order.customerName}</p>
                            <p className="flex items-center gap-2 text-primary">
                              <MessageCircle size={14} />
                              {order.phone}
                            </p>
                            <p className="text-text-secondary text-xs">{order.address}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Payment</h4>
                          <div className="space-y-1 text-sm font-bold text-text-primary">
                            <p>{order.paymentMethod}</p>
                            <p className="text-lg font-black text-primary">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Items ({order.items.length})</h4>
                          <div className="space-y-2 max-h-[100px] overflow-y-auto no-scrollbar">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="text-xs font-bold text-text-secondary flex justify-between">
                                <span className="truncate flex-1 pr-2">{item.name}</span>
                                <span className="flex-shrink-0">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border-light flex items-center justify-between">
                        <a 
                          href={`https://wa.me/${order.phone.replace(/^0/, '94')}?text=${encodeURIComponent(`Hi ${order.customerName}, this is KAPU Tech regarding your order ${order.id}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest hover:bg-green-50 px-4 py-2 rounded-xl transition-all"
                        >
                          <MessageCircle size={16} />
                          Contact Customer
                        </a>
                        <Link 
                          to={`/track-order?id=${order.id}`}
                          className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5 px-4 py-2 rounded-xl transition-all"
                        >
                          <ExternalLink size={16} />
                          View Tracking
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-border-light space-y-4">
                    <div className="w-20 h-20 bg-bg-section rounded-full flex items-center justify-center mx-auto text-text-secondary">
                      <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">No orders found</h3>
                    <p className="text-text-secondary font-bold">Orders will appear here once customers start shopping.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-text-primary uppercase tracking-tighter">Manage Products</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Package size={20} />
                  Add New Product
                </button>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm text-center py-20 space-y-4">
                <div className="w-20 h-20 bg-bg-section rounded-full flex items-center justify-center mx-auto text-text-secondary">
                  <Package size={40} />
                </div>
                <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">Product Management Coming Soon</h3>
                <p className="text-text-secondary font-bold">You can currently manage products through the Firestore Console.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-text-primary uppercase tracking-tighter">Store Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-2">
                    <MessageCircle size={24} className="text-primary" />
                    WhatsApp Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">WhatsApp Number</label>
                      <input 
                        type="text" 
                        defaultValue={WHATSAPP_NUMBER}
                        className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button className="btn-primary w-full py-3 text-sm">Save Changes</button>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-2">
                    <CreditCard size={24} className="text-primary" />
                    Bank Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Account Info</label>
                      <textarea 
                        rows={4}
                        defaultValue="Bank: Commercial Bank\nAccount Name: KAPU TECH (PVT) LTD\nAccount Number: 1234567890\nBranch: Colombo 07"
                        className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <button className="btn-primary w-full py-3 text-sm">Save Changes</button>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-2">
                    <Package size={24} className="text-primary" />
                    Seed Sample Data
                  </h3>
                  <p className="text-xs font-bold text-text-secondary">Click below to populate your Firestore with sample products for testing.</p>
                  <button 
                    onClick={seedData}
                    className="bg-primary text-white w-full py-3 rounded-xl font-black text-sm hover:bg-primary-dark transition-all"
                  >
                    Seed Products
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
