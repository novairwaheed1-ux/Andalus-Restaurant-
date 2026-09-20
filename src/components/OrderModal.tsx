import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Phone, MapPin, Clock, CreditCard, Banknote, 
  Smartphone, Truck, ChevronLeft, AlertCircle, ShoppingBag, 
  Sparkles, Navigation, MessageCircle
} from 'lucide-react';
import type { CartItem } from '../types';
import type { UserProfile } from './LoginModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: UserProfile | null;
  onOrderCompleted: () => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderCompleted,
}: OrderModalProps) {
  const [step, setStep] = useState<'checkout' | 'tracking'>('checkout');
  const [customerName, setCustomerName] = useState(currentUser?.name || 'عميل ديروط');
  const [phone, setPhone] = useState(currentUser?.phone || '01008141062');
  const [address, setAddress] = useState('ديروط - أول منزل أبو جبل');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'vodafone' | 'card'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));

  // Sync customer name if currentUser updates
  React.useEffect(() => {
    if (currentUser?.name) {
      setCustomerName(currentUser.name);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + deliveryFee;

  const createWhatsAppOrderUrl = () => {
    const restaurantPhone = '201008141062'; // رقم واتساب المطعم
    
    const paymentLabel = 
      paymentMethod === 'cash' ? 'كاش عند الاستلام' :
      paymentMethod === 'vodafone' ? 'فودافون كاش' : 'فيزا / بطاقة إلكترونية';
      
    let msg = `*طلب جديد من موقع مطعم ديروط* 🛵🍕\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *رقم الأوردر:* #${orderNumber}\n`;
    msg += `👤 *اسم العميل:* ${customerName.trim() || 'عميل ديروط'}\n`;
    msg += `📱 *رقم الهاتف:* ${phone.trim() || '01008141062'}\n`;
    msg += `📍 *عنوان التوصيل:* ${address.trim()}\n`;
    if (notes.trim()) {
      msg += `📝 *ملاحظات إضافية:* ${notes.trim()}\n`;
    }
    msg += `💳 *طريقة الدفع:* ${paymentLabel}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🛒 *تفاصيل الأصناف المطلوبة:*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.sizeName})\n   العدد: ${item.quantity} × السعر: ${item.price} ج.م = *${item.price * item.quantity} ج.م*\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *حساب الأصناف:* ${subtotal} ج.م\n`;
    msg += `🛵 *خدمة التوصيل:* ${deliveryFee} ج.م\n`;
    msg += `💰 *الإجمالي النهائي المطلوب:* *${grandTotal} ج.م*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `⏰ *الوقت:* ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}\n`;
    msg += `_تم إرسال هذا الطلب عبر موقع وتطبيق ديروط_`;

    return `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(msg)}`;
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    
    // إرسال تفاصيل الأوردر مباشرة لواتساب المطعم
    const whatsappUrl = createWhatsAppOrderUrl();
    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Error opening WhatsApp:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('tracking');
      onOrderCompleted();
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
          className="relative z-10 w-full max-w-[440px] bg-white rounded-t-[36px] sm:rounded-[36px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100 bg-white z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF5B2E]/10 flex items-center justify-center text-[#FF5B2E]">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {step === 'checkout' ? 'تأكيد واستلام الأوردر' : 'تتبع طلبك مباشر 🛵'}
                </h2>
                <p className="text-[11px] text-slate-400 font-bold">
                  {step === 'checkout' ? 'ديروط - خدمة توصيل سريعة' : `رقم الطلب #${orderNumber}`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            {step === 'checkout' ? (
              <>
                {/* Order Summary Chips */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-black text-slate-400 mb-2.5">عناصر الطلب ({items.length})</div>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-black flex items-center justify-center">
                            {item.quantity}×
                          </span>
                          <span className="font-bold text-slate-800 line-clamp-1">{item.name}</span>
                          <span className="text-[11px] text-slate-400">({item.sizeName})</span>
                        </div>
                        <span className="font-bold text-slate-900 shrink-0">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200/80 mt-3 pt-3 flex justify-between items-center">
                    <span className="font-black text-slate-800 text-sm">الإجمالي مع التوصيل:</span>
                    <span className="font-black text-lg text-[#FF5B2E]">{grandTotal} ج.م</span>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">اسم العميل</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:bg-white focus:border-[#FF5B2E] outline-none"
                      placeholder="أدخل اسمك"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">رقم الهاتف للتواصل</label>
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:bg-white focus:border-[#FF5B2E] outline-none"
                        placeholder="01008141062"
                        dir="ltr"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">عنوان التوصيل في ديروط</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:bg-white focus:border-[#FF5B2E] outline-none"
                        placeholder="العنوان بالتفصيل (شارع / علامة مميزة)"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">ملاحظات إضافية للكابتن (اختياري)</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium text-xs focus:bg-white focus:border-[#FF5B2E] outline-none"
                      placeholder="كاتشب زيادة / بدون شطة / رن الجرس..."
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-2">طريقة الدفع</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-[#FF5B2E] bg-[#FF5B2E]/5 text-[#FF5B2E] font-black'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <Banknote className="w-5 h-5" />
                      <span className="text-[11px]">كاش عند الاستلام</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('vodafone')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                        paymentMethod === 'vodafone'
                          ? 'border-[#FF5B2E] bg-[#FF5B2E]/5 text-[#FF5B2E] font-black'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-[11px]">فودافون كاش</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#FF5B2E] bg-[#FF5B2E]/5 text-[#FF5B2E] font-black'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-[11px]">فيزا / ماستر</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Live Tracking View matching Parcel App from Video (00:14 - 00:16) */
              <div className="space-y-5 text-center py-2">
                {/* Success Animation & Delivery Visual */}
                <div className="relative w-28 h-28 mx-auto bg-gradient-to-tr from-[#FFF1ED] to-white rounded-full flex items-center justify-center border-2 border-[#FF5B2E]/20 shadow-lg">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="text-4xl"
                  >
                    🛵
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">
                    ألف هنا يا صحبي! تم تأكيد طلبك
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    الكابتن بيجهز الأوردر وفي طريقه ليك في ديروط
                  </p>
                </div>

                {/* Tracking Progress Timeline */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-right space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">تم استلام وتأكيد الطلب</div>
                      <div className="text-[10px] text-slate-400">الآن</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FF5B2E] text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse shadow-sm shadow-[#FF5B2E]/30">
                      🍕
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#FF5B2E]">البيتزا في الفرن الإيطالي الآن</div>
                      <div className="text-[10px] text-slate-400">جاري الخبز والتسوية</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700">خرج مع مندوب التوصيل</div>
                      <div className="text-[10px] text-slate-400">متوقع خلال 15 دقيقة</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                      4
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700">تم التسليم أمام باب المنزل</div>
                      <div className="text-[10px] text-slate-400">أول منزل أبو جبل - ديروط</div>
                    </div>
                  </div>
                </div>

                {/* Driver / Restaurant Contact Card & WhatsApp */}
                <div className="bg-[#1A1A1A] text-white p-4 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="text-right">
                    <div className="text-[11px] text-[#FF5B2E] font-black uppercase tracking-wider">كابتن التوصيل</div>
                    <div className="font-bold text-sm">محمد السعيد (ديروط)</div>
                    <div className="text-[11px] text-slate-400">الوقت المقدر: 20 - 30 دقيقة</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={createWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                      title="محادثة الواتساب مع المطعم"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a
                      href="tel:01008141062"
                      className="w-11 h-11 bg-[#FF5B2E] hover:bg-[#ff4614] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                      title="اتصل بالمندوب"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp Confirmation Button */}
                <a
                  href={createWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl shadow-[#25D366]/25 flex items-center justify-center gap-2.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>فتح محادثة الواتساب لمتابعة طلبك مع المطعم 💬</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-slate-100 bg-white">
            {step === 'checkout' ? (
              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2.5"
              >
                {isSubmitting ? (
                  <span>جاري تحويلك إلى واتساب المطعم...</span>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>تأكيد وإرسال الطلب لواتساب المطعم ({grandTotal} ج.م)</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-[#1A1A1A] hover:bg-black active:scale-[0.98] text-white py-4 rounded-2xl font-black text-base shadow-xl transition-all"
              >
                العودة للصفحة الرئيسية
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
