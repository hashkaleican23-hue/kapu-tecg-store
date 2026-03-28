import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LogIn, UserPlus, LogOut, User as UserIcon, Package, MapPin, Phone, Mail, ShieldCheck, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAuthLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          createdAt: new Date(),
          role: 'user'
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] p-12 border border-border-light shadow-[0_32px_64px_-16px_rgba(0,0,100,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary border border-primary/10">
              {isLogin ? <LogIn size={44} /> : <UserPlus size={44} />}
            </div>
            <h1 className="text-4xl font-black text-text-primary mb-3 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-text-secondary font-medium text-base">
              {isLogin ? 'Sign in to your KAPU Tech account' : 'Join the KAPU Tech community'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-8 relative z-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-6">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg-section border border-border-light rounded-[1.5rem] py-5 px-8 text-sm font-bold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                    placeholder="Enter your name"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-6">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-section border border-border-light rounded-[1.5rem] py-5 px-8 text-sm font-bold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-6">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-section border border-border-light rounded-[1.5rem] py-5 px-8 text-sm font-bold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-6 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {authLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!authLoading && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full lg:w-96 shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3.5rem] p-12 border border-border-light shadow-[0_32px_64px_-16px_rgba(0,0,100,0.05)] sticky top-40"
          >
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-primary border-4 border-white shadow-2xl">
                  <UserIcon size={64} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg border-4 border-white">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <h2 className="text-3xl font-black text-text-primary mb-2 tracking-tight">{user.displayName || 'User'}</h2>
              <p className="text-sm text-text-secondary font-bold tracking-tight">{user.email}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                Premium Member
              </div>
            </div>

            <nav className="space-y-3">
              {[
                { icon: Package, label: 'My Orders', active: true },
                { icon: MapPin, label: 'Addresses', active: false },
                { icon: ShieldCheck, label: 'Security', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] transition-all group",
                    item.active 
                      ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                      : "text-text-secondary hover:bg-bg-section border border-transparent hover:border-border-light"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} />
                    {item.label}
                  </div>
                  <ChevronRight size={18} className={cn("transition-transform", item.active ? "translate-x-1" : "group-hover:translate-x-1")} />
                </button>
              ))}
              <div className="pt-8 mt-8 border-t border-border-light">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </nav>
          </motion.div>
        </aside>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-16"
        >
          <section>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black text-text-primary tracking-tight">Recent Orders</h2>
              <div className="px-4 py-2 bg-bg-section rounded-full text-[10px] font-black uppercase tracking-widest text-text-secondary">
                Total Orders: 0
              </div>
            </div>
            <div className="bg-bg-section/50 rounded-[4rem] p-20 border-2 border-dashed border-border-light text-center group hover:border-primary/30 transition-colors">
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-text-secondary shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <Package size={40} />
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">No Orders Yet</h3>
              <p className="text-text-secondary font-medium text-lg mb-12 max-w-md mx-auto leading-relaxed">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button className="px-12 py-6 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 mx-auto group/btn">
                Browse Products
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[3.5rem] border border-border-light shadow-[0_16px_32px_-8px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/10">
                  <Mail size={28} />
                </div>
                <h3 className="text-2xl font-black text-text-primary tracking-tight">Contact Info</h3>
              </div>
              <div className="space-y-8">
                <div className="p-6 bg-bg-section rounded-3xl border border-border-light/50">
                  <p className="text-[10px] text-text-secondary uppercase font-black tracking-[0.2em] mb-2">Email Address</p>
                  <p className="text-base font-bold text-text-primary">{user.email}</p>
                </div>
                <div className="p-6 bg-bg-section rounded-3xl border border-border-light/50">
                  <p className="text-[10px] text-text-secondary uppercase font-black tracking-[0.2em] mb-2">Phone Number</p>
                  <p className="text-base font-bold text-text-secondary italic">Not provided</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-border-light shadow-[0_16px_32px_-8px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary border border-primary/10">
                  <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-black text-text-primary tracking-tight">Default Address</h3>
              </div>
              <div className="h-[184px] flex flex-col items-center justify-center bg-bg-section rounded-[2.5rem] border border-dashed border-border-light p-8 text-center">
                <p className="text-sm font-medium text-text-secondary italic mb-6">No address saved yet.</p>
                <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">
                  + Add New Address
                </button>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
