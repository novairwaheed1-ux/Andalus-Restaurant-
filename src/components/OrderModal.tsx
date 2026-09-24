import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Check, Phone, MapPin, Clock, CreditCard, Banknote, 
  Smartphone, Truck, ChevronLeft, AlertCircle, ShoppingBag, 
  Sparkles, Navigation, MessageCircle, ShieldCheck, User,
  Building, FileText, Copy, CheckCircle2, ArrowRight
} from 'lucide-react';
import type { CartItem, OrderRecord } from '../types';
import type { UserProfile } from './LoginModal';
import { saveOrderToHistory, getStoredOrders } from '../utils/orderStorage';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: UserProfile | null;
  onOrderCompleted: () => void;
  initialStep?: 'checkout' | 'tracking';
}

export default function OrderModal({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderCompleted,
  initialStep = 'checkout',
}: OrderModalProps) {
  const [step, setStep] = useState<'checkout' | 'tracking'>(initialStep);
  const [isOrderReceived, setIsOrderReceived] = useState(false);

  // Sync step if initialStep changes
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setIsOrderReceived(false);
    }
  }, [isOpen, initialStep]);

  // Customer Personal Details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [address, setAddress] = useState('');
  const [floorApartment, setFloorApartment] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'vodafone' | 'card'>('cash');

  // Form Validation Errors
  const [errors, setErrors] = useState<{
    customerName?: string;
    phone?: string;
    address?: string;
  }>({});

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [orderTimestamp, setOrderTimestamp] = useState('');

  // If currentUser has an actual human name from Google and customer hasn't typed yet, initialize with it
  useEffect(() => {
    if (
      currentUser?.name && 
      !customerName && 
      !currentUser.name.includes('@') && 
      !currentUser.name.includes('.com') &&
      currentUser.name !== 'مستخدم Google' &&
      currentUser.name !== 'عميل الأندلس' &&
      currentUser.name !== 'عميل Google المعتمد'
    ) {
      setCustomerName(currentUser.name);
    }
    if (currentUser?.phone && !phone) {
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      };
      setOrderTimestamp(now.toLocaleString('ar-EG', options));
    }
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Validation function
  const validateForm = () => {
    const newErrors: { customerName?: string; phone?: string; address?: string } = {};

    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 3) {
      newErrors.customerName = 'يرجى كتابة اسمك الكامل (ثنائي أو ثلاثي على الأقل)';
    }

    const trimmedPhone = phone.trim().replace(/\s+/g, '');
    const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!trimmedPhone) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف للتواصل وتأكيد الطلب';
    } else if (!egyptianPhoneRegex.test(trimmedPhone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح. يجب أن يتكون من 11 رقم ويبدأ بـ (010 أو 011 أو 012 أو 015)';
    }

    const trimmedAddress = address.trim();
    if (!trimmedAddress || trimmedAddress.length < 8) {
      newErrors.address = 'يرجى كتابة عنوان التوصيل بالتفصيل (المنطقة والشارع وأقرب علامة مميزة)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const copyVodafoneNumber = () => {
    navigator.clipboard.writeText('01008141062');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const createWhatsAppOrderUrl = () => {
    const restaurantPhone = '201008141062'; // رقم واتساب المطعم
    
    const paymentLabel = 
      paymentMethod === 'cash' ? 'كاش عند الاستلام' :
      paymentMethod === 'vodafone' ? 'فودافون كاش / إنستاباي' : 'فيزا / ماستر كارد عند الاستلام';
      
    let msg = `*طلب رسمي معتمد من موقع مطعم الأندلس*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*رقم الفاتورة:* #AND-${orderNumber}\n`;
    msg += `*وقت الطلب:* ${orderTimestamp || 'الآن'}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*بيانات المستلم:*\n`;
    msg += `• الاسم: *${customerName.trim()}*\n`;
    msg += `• رقم الهاتف: *${phone.trim()}*\n`;
    if (secondaryPhone.trim()) {
      msg += `• هاتف بديل / واتساب: ${secondaryPhone.trim()}\n`;
    }
    msg += `• العنوان بالتفصيل: *${address.trim()}*\n`;
    if (floorApartment.trim()) {
      msg += `• الدور / الشقة: ${floorApartment.trim()}\n`;
    }
    if (notes.trim()) {
      msg += `• ملاحظات خاصة: _${notes.trim()}_\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*طريقة الدفع:* ${paymentLabel}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*الأصناف المطلوبة (${items.length}):*\n`;
    items.forEach((item, idx) => {
      const toppingsText = item.toppings && item.toppings.length > 0 ? ` [إضافات: ${item.toppings.join('، ')}]` : '';
      msg += `${idx + 1}. *${item.name}* (${item.sizeName})${toppingsText}\n   الكمية: ${item.quantity} × السعر: ${item.price} ج.م = *${item.price * item.quantity} ج.م*\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `حساب الأصناف: ${subtotal} ج.م\n`;
    msg += `خدمة التوصيل السريع: ${deliveryFee} ج.م\n`;
    msg += `*الإجمالي المطلوب للدفع:* *${grandTotal} ج.م*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_تم تأكيد وإرسال هذا الطلب رسمياً عبر موقع مطعم الأندلس_`;

    return `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(msg)}`;
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Record order in persistent history for customer account
    try {
      const paymentLabel = paymentMethod === 'cash' 
        ? 'الدفع نقداً عند الاستلام' 
        : (paymentMethod === 'vodafone' ? 'فودافون كاش / إنستاباي' : 'بطاقة بنكية / فيزا');

      const orderRecord: OrderRecord = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        formattedDate: new Intl.DateTimeFormat('ar-EG', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
        items: items.map(it => ({
          name: it.name,
          quantity: it.quantity,
          price: it.price,
          sizeName: it.sizeName,
          toppings: it.toppings,
        })),
        itemsCount: items.reduce((s, it) => s + it.quantity, 0),
        subtotal,
        deliveryFee,
        grandTotal,
        status: 'preparing',
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        paymentMethod: paymentLabel,
        userEmail: currentUser?.email || undefined,
        isGuest: !currentUser?.isLoggedIn,
      };

      saveOrderToHistory(orderRecord);
    } catch (e) {
      console.error('Error saving order record:', e);
    }

    // Open WhatsApp order
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
    }, 600);
  };

  const isVisible = Boolean(isOpen && (step === 'tracking' || (items && items.length > 0)));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          key="order-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="order-modal-card"
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.8 }}
            className="relative z-10 w-full max-w-[480px] bg-white rounded-t-[36px] sm:rounded-[36px] max-h-[94vh] flex flex-col overflow-hidden shadow-2xl border border-slate-100"
            dir="rtl"
          >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3.5 border-b border-slate-100 bg-[#121316] text-white z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {step === 'checkout' ? 'تأكيد واعتماد الطلب' : 'تتبع حالة طلبك مباشرة'}
                  </h2>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                    #AND-{orderNumber}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {step === 'checkout' 
                    ? 'مطعم الأندلس • يرجى إدخال بياناتك بدقة لتأكيد الأوردر' 
                    : 'طلبك مسجل في النظام وجاري التنفيذ'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {step === 'checkout' ? (
              <>
                {/* 1. Order Summary Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                      <span>قائمة الأصناف المطلوبة ({items.length})</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      الإجمالي: {grandTotal} ج.م
                    </span>
                  </div>

                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-900 text-[11px] font-black flex items-center justify-center shrink-0">
                            {item.quantity}×
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800 line-clamp-1">{item.name}</span>
                              <span className="text-[10px] text-slate-400">({item.sizeName})</span>
                            </div>
                            {item.toppings && item.toppings.length > 0 && (
                              <div className="text-[10px] text-amber-700 font-bold">
                                + {item.toppings.join(' • ')}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="font-black text-slate-900 shrink-0">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>حساب الأصناف: {subtotal} ج.م</span>
                    <span className="text-amber-700">+ خدمة التوصيل: {deliveryFee} ج.م</span>
                  </div>
                </div>

                {/* 2. Customer Information Form */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>الاسم الكامل <span className="text-rose-500">*</span></span>
                    </label>
                    {currentUser?.isLoggedIn && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        عميل مسجل
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.customerName) setErrors(prev => ({ ...prev, customerName: undefined }));
                    }}
                    placeholder="اكتب اسمك الثلاثي للتسليم..."
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.customerName 
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-300' 
                        : 'border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200/50'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 -mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Numbers */}
                <div className="space-y-3.5">
                  <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>رقم الموبايل الأساسي للتواصل <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="010XXXXXXXX"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm font-black text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-right ${
                      errors.phone 
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-300' 
                        : 'border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200/50'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 -mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}

                  {/* Optional secondary phone */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      رقم هاتف إضافي أو رقم واتساب (اختياري)
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={secondaryPhone}
                      onChange={(e) => setSecondaryPhone(e.target.value)}
                      placeholder="011XXXXXXXX"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-3.5">
                  <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>عنوان التوصيل بالتفصيل <span className="text-rose-500">*</span></span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                    }}
                    placeholder="ديروط - الشارع، المنطقة، بجوار علامة مميزة..."
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all resize-none ${
                      errors.address 
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-300' 
                        : 'border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200/50'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 -mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.address}</span>
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={floorApartment}
                      onChange={(e) => setFloorApartment(e.target.value)}
                      placeholder="الدور / رقم الشقة"
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="ملاحظات (مثلاً: بدون بصل)"
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-amber-600" />
                    <span>طريقة الدفع</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-2xl border text-xs font-black flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Banknote className="w-4 h-4" />
                      <span>كاش عند الاستلام</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('vodafone')}
                      className={`p-3 rounded-2xl border text-xs font-black flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'vodafone'
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>فودافون كاش</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-xs font-black flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>فيزا / ماستر</span>
                    </button>
                  </div>

                  {paymentMethod === 'vodafone' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between text-red-900 font-bold">
                        <span>رقم محفظة فودافون كاش / إنستاباي:</span>
                        <button
                          type="button"
                          onClick={copyVodafoneNumber}
                          className="flex items-center gap-1 text-[11px] bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded-md text-red-800 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedNumber ? 'تم النسخ!' : 'نسخ الرقم'}</span>
                        </button>
                      </div>
                      <div className="text-base font-black text-red-700 tracking-wider text-center bg-white py-1.5 rounded-xl border border-red-200 select-all" dir="ltr">
                        01008141062
                      </div>
                      <p className="text-[11px] text-red-600">
                        حول المبلغ ({grandTotal} ج.م) وأرسل إشعار التحويل عبر الواتساب مع الطلب لتأكيد الحجز فوراً.
                      </p>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              /* TRACKING VIEW */
              (() => {
                const storedOrders = getStoredOrders();
                const activeRecord = storedOrders.length > 0 ? storedOrders[0] : null;
                const displayOrderNum = activeRecord ? activeRecord.orderNumber : orderNumber;
                const displayTotal = activeRecord ? activeRecord.grandTotal : grandTotal;
                const displayItems = activeRecord && activeRecord.items ? activeRecord.items : items;

                if (!activeRecord && (!items || items.length === 0)) {
                  return (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center mx-auto shadow-xs">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 mb-1">لا توجد طلبات جارية حالياً</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          اختر وجبتك المفضلة من قائمة طعام الأندلس، وسيمكنك متابعة حالة الطلب وتأكيد استلامه فوراً من هذه الأيقونة.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-[#0D1E3A] hover:bg-[#1A3258] text-white text-xs font-black px-6 py-2.5 rounded-full shadow-md active:scale-95 transition-transform cursor-pointer"
                      >
                        تصفح قائمة الطعام الآن
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4 py-2">
                    <div className="text-center space-y-1.5">
                      <div className="w-13 h-13 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-6 ring-emerald-50">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {isOrderReceived ? 'تم استلام الأوردر بنجاح!' : 'طلبك مسجل وجاري التنفيذ'}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        {isOrderReceived 
                          ? 'شكراً لثقتك بمطعم الأندلس ديروط، نتمنى لك وجبة شهية وهنيئة!'
                          : `رقم الفاتورة المعتمدة #AND-${displayOrderNum} • تم إرسال الطلب للمطبخ لبدء الشواء والطهي`}
                      </p>
                    </div>

                    {/* Tracking Stepper */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">تم استلام وتأكيد الطلب</h4>
                          <p className="text-[10.5px] text-slate-400">الفاتورة مؤكدة داخل سيستم مطعم الأندلس</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isOrderReceived ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                        }`}>
                          {isOrderReceived ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">جاري الطهي والتحضير</h4>
                          <p className="text-[10.5px] text-slate-400">داخل فرن المطبخ على أيدي شيفات الأندلس</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isOrderReceived ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isOrderReceived ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">خرج مع مندوب التوصيل</h4>
                          <p className="text-[10.5px] text-slate-400">الدليفري في الطريق إلى عنوانك</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isOrderReceived ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isOrderReceived ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">تأكيد الاستلام النهائي</h4>
                          <p className="text-[10.5px] text-slate-400">
                            {isOrderReceived ? 'تم الاستلام بنجاح وبألف هنا' : 'اضغط على زر تأكيد الاستلام عند وصول الأوردر'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary Snapshot */}
                    {displayItems && displayItems.length > 0 && (
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 text-xs">
                        <div className="flex justify-between font-bold text-slate-700 mb-1.5 pb-1 border-b border-slate-200/60">
                          <span>ملخص الوجبات ({displayItems.length} صنف)</span>
                          <span className="font-black text-slate-900">{displayTotal} ج.م</span>
                        </div>
                        <div className="space-y-1 max-h-24 overflow-y-auto text-[11px] text-slate-600">
                          {displayItems.map((it: any, idx: number) => (
                            <div key={idx} className="flex justify-between">
                              <span>{it.quantity}× {it.name} {it.sizeName ? `(${it.sizeName})` : ''}</span>
                              <span className="font-bold">{it.price * it.quantity} ج.م</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prominent Confirm Receipt Button */}
                    <div className="pt-1">
                      {isOrderReceived ? (
                        <div className="p-3.5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center justify-center gap-3 text-emerald-950">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                          <div className="text-right">
                            <div className="text-xs font-black">تم تأكيد استلام الأوردر رسمياً!</div>
                            <div className="text-[11px] text-emerald-700 font-bold">بألف هنا وشفا • نسعد بخدمتكم دائماً</div>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOrderReceived(true);
                            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                              try { navigator.vibrate([60, 40, 60]); } catch (e) {}
                            }
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-3 px-4 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span>تأكيد استلام الأوردر الآن</span>
                        </button>
                      )}
                    </div>

                    {/* Contact & Support */}
                    <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-2xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-black text-amber-950">خدمة عملاء مطعم الأندلس</span>
                        <p className="text-[10.5px] text-amber-800 font-medium">متاحون للرد على كافة استفساراتكم</p>
                      </div>
                      <a
                        href="tel:01008141062"
                        className="w-9 h-9 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center text-slate-900 shadow-xs active:scale-95 transition-transform"
                        title="اتصال بالمطعم"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Direct WhatsApp Link */}
                    <a
                      href={createWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white py-3 px-4 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>فتح محادثة الواتساب لتأكيد الاستلام</span>
                    </a>
                  </div>
                );
              })()
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-slate-100 bg-white">
            {step === 'checkout' ? (
              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="w-full bg-[#121316] hover:bg-black active:scale-[0.98] text-white py-4 rounded-2xl font-black text-base shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>تأكيد واعتماد الطلب رسمياً ({grandTotal} ج.م)</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-[#121316] hover:bg-black active:scale-[0.98] text-white py-4 rounded-2xl font-black text-base shadow-xl transition-all cursor-pointer"
              >
                العودة لقائمة الطعام
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
