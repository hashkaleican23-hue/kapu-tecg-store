import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Settings as SettingsIcon, Save, Loader2, MessageCircle, CreditCard, Bell } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    whatsappNumber: '94729399609',
    bankName: 'Commercial Bank',
    accountNumber: '8012345678',
    accountName: 'KAPU TECH (PVT) LTD',
    freeDeliveryThreshold: 50000,
    announcement: 'Free delivery for orders over Rs. 50,000!'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      alert('Settings updated successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <SettingsIcon className="text-[#D4AF37]" size={24} />
          Store Settings
        </h2>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WhatsApp Settings */}
        <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-[#007BFF]">
            <MessageCircle size={20} />
            WhatsApp Integration
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">WhatsApp Number (with country code)</label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="e.g. 94729399609"
            />
          </div>
        </div>

        {/* Bank Settings */}
        <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-[#D4AF37]">
            <CreditCard size={20} />
            Bank Details
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">Bank Name</label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">Account Number</label>
              <input
                type="text"
                value={settings.accountNumber}
                onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">Account Name</label>
              <input
                type="text"
                value={settings.accountName}
                onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
                className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl space-y-6 md:col-span-2">
          <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-500">
            <Bell size={20} />
            Promotions & Announcements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">Free Delivery Threshold (LKR)</label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: parseInt(e.target.value) })}
                className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">Announcement Banner Text</label>
              <input
                type="text"
                value={settings.announcement}
                onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                className="w-full bg-[#050A18] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-12 py-4 bg-[#D4AF37] text-[#050A18] rounded-xl font-bold flex items-center gap-2 hover:bg-[#F5D76E] transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
