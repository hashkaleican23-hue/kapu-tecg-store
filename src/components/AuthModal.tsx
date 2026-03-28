import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Chrome, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { ConfirmationResult } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginWithGoogle, sendOtp, verifyOtp } = useAuth();
  const [authMode, setAuthMode] = useState<'selection' | 'phone' | 'otp'>('selection');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setAuthMode('selection');
      setPhoneNumber('');
      setOtp('');
      setConfirmationResult(null);
      setError(null);
    }
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      // Don't show error if user just closed the popup
      if (err.code === 'auth/popup-closed-by-user') {
        return;
      }
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await sendOtp(phoneNumber, 'recaptcha-container');
      setConfirmationResult(result);
      setAuthMode('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !confirmationResult) return;

    setLoading(true);
    setError(null);
    try {
      await verifyOtp(confirmationResult, otp);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-2 hover:bg-bg-section rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20">
                  <span className="text-white font-black text-3xl">KT</span>
                </div>
                <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">Welcome Back</h2>
                <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest mt-1">Premium Tech Store</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">{error}</p>
                </motion.div>
              )}

              {authMode === 'selection' && (
                <div className="space-y-4">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-border-light rounded-2xl font-black text-xs uppercase tracking-widest hover:border-primary hover:bg-bg-section transition-all group disabled:opacity-50"
                  >
                    <Chrome size={20} className="text-primary group-hover:scale-110 transition-transform" />
                    Continue with Google
                  </button>
                  <button
                    onClick={() => setAuthMode('phone')}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-text-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all group disabled:opacity-50"
                  >
                    <Phone size={20} className="group-hover:scale-110 transition-transform" />
                    Continue with Phone
                  </button>
                </div>
              )}

              {authMode === 'phone' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type="tel"
                        placeholder="+94 70 000 0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-bg-section border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div id="recaptcha-container"></div>
                  <button
                    type="submit"
                    disabled={loading || !phoneNumber}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('selection')}
                    className="w-full text-[10px] font-black text-text-secondary uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Back to options
                  </button>
                </form>
              )}

              {authMode === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Verification Code</label>
                    <div className="relative">
                      <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-bg-section border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary focus:bg-white transition-all tracking-[0.5em] text-center"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('phone')}
                    className="w-full text-[10px] font-black text-text-secondary uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Resend code
                  </button>
                </form>
              )}

              <div className="mt-8 pt-8 border-t border-border-light text-center">
                <p className="text-[10px] text-text-secondary font-medium leading-relaxed">
                  By continuing, you agree to our <br />
                  <span className="text-text-primary font-bold underline cursor-pointer">Terms of Service</span> and <span className="text-text-primary font-bold underline cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
