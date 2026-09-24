import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Loader2, 
  X, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Clock,
  MapPin,
  Sparkles,
  User,
  ChevronDown,
  ChevronUp,
  Receipt,
  Calendar,
  CreditCard
} from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup 
} from '../lib/firebase';
import { getStoredOrders, getUserOrderStats } from '../utils/orderStorage';
import type { OrderRecord } from '../types';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  provider?: 'google' | 'guest';
  isLoggedIn: boolean;
  rememberMe?: boolean;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Load orders whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredOrders();
      setOrders(stored);
      // Auto expand the most recent order if available
      if (stored.length > 0) {
        setExpandedOrderId(stored[0].id);
      }
    }
  }, [isOpen]);

  const stats = getUserOrderStats(orders);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const cleanDisplayName = (user.displayName && !user.displayName.includes('@')) 
        ? user.displayName 
        : '';
      const profile: UserProfile = {
        name: cleanDisplayName || 'عميل الأندلس',
        email: user.email || '',
        avatar: user.photoURL || undefined,
        provider: 'google',
        isLoggedIn: true,
        rememberMe: true,
      };

      try {
        localStorage.setItem('andalus_auth_token', btoa(JSON.stringify({
          email: profile.email,
          name: profile.name,
          provider: 'google',
          timestamp: Date.now(),
        })));
      } catch {}

      onLoginSuccess(profile);
    } catch (err: any) {
      setIsLoading(false);
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user') {
        setErrorMessage('تم إغلاق نافذة تسجيل الدخول بـ Google قبل إكمال العملية.');
      } else {
        setErrorMessage('تعذر الاتصال بـ Google. يرجى التأكد من اتصال الإنترنت والمحاولة مجدداً.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="login-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center p-0 sm:p-4" 
          dir="rtl"
        >
          {/* Backdrop */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            key="login-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[92vh] flex flex-col"
          >
            {/* Header with Luxury Dark Brand Aesthetic */}
            <div className="relative bg-[#0D1E3A] text-white pt-6 pb-5 px-6">
              <button
                onClick={onClose}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-xl shrink-0 shadow-inner">
                  {currentUser?.isLoggedIn ? (
                    currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'
                    )
                  ) : (
                    <User className="w-6 h-6 text-amber-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white truncate">
                      {currentUser?.isLoggedIn ? currentUser.name : 'حساب العميل • تصفح كزائر'}
                    </h2>
                    {currentUser?.isLoggedIn ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 shrink-0">
                        حساب معتمد
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30 shrink-0">
                        وضع الزائر
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {currentUser?.isLoggedIn ? currentUser.email : 'تصفح واطلب براحتك في أي وقت كزائر'}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 no-scrollbar">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Status Banner if Not Logged In */}
              {!currentUser?.isLoggedIn && (
                <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3.5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">أنت تتصفح حالياً كـ «زائر» (Guest)</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5 font-medium">
                        الطلب متاح ومباشر كزائر دون تسجيل. يمكنك تسجيل الدخول بـ Google في ثانية واحدة لحفظ طلباتك وعناوينك تلقائياً!
                      </p>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-900 font-black text-xs shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
                    ) : (
                      <>
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                          <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"/>
                          <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"/>
                        </svg>
                        <span>تسجيل الدخول السريع عبر Google</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Accurate Order Statistics Summary (كام مرة طلبت، السعر، والتاريخ) */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">مرات الطلب</div>
                  <div className="text-base sm:text-lg font-black text-slate-900">
                    {stats.totalOrders} <span className="text-[10px] text-slate-500 font-normal">مرات</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">إجمالي الحساب</div>
                  <div className="text-base sm:text-lg font-black text-[#0D1E3A]">
                    {stats.totalSpent} <span className="text-[10px] text-slate-500 font-normal">ج.م</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">آخر طلب</div>
                  <div className="text-xs font-black text-amber-600 truncate mt-0.5">
                    {stats.lastOrderNumber ? `#${stats.lastOrderNumber}` : 'لا يوجد'}
                  </div>
                </div>
              </div>

              {/* Detailed Orders History (سجل الطلبات الدقيق جداً) */}
              <div>
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-slate-700" />
                    <h3 className="font-black text-xs sm:text-sm text-slate-900">
                      سجل طلباتك وفواتيرك السابقة ({orders.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">محدث بالدقيقة</span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-bold">لم تقم بأي طلبات بعد</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">اطلب وجبتك المفضلة وسيتم حفظ الفاتورة هنا فوراً</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {orders.map((order) => {
                      const isExpanded = expandedOrderId === order.id;
                      return (
                        <div
                          key={order.id}
                          className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs transition-all hover:border-slate-300"
                        >
                          {/* Order Header Row */}
                          <div 
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="p-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-[#0D1E3A] text-amber-400 flex items-center justify-center font-black text-xs shrink-0 shadow-xs border border-amber-400/20">
                                <Receipt className="w-4 h-4 text-amber-400" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-xs text-slate-900">
                                    طلب #AND-{order.orderNumber}
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {order.status === 'delivered' ? 'مكتمل ومستلم' : 'جاري التنفيذ'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {order.formattedDate}
                                  </span>
                                  <span>•</span>
                                  <span>{order.itemsCount} صنف</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-left">
                                <span className="font-black text-sm text-[#0D1E3A]">
                                  {order.grandTotal}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 mr-1">ج.م</span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Order Details */}
                          {isExpanded && (
                            <div className="p-3.5 border-t border-slate-100 bg-white space-y-2.5 text-xs">
                              {/* Items List */}
                              <div className="space-y-1.5">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                  الأصناف المطلوبة بالتفصيل:
                                </div>
                                {order.items.map((it, idx) => (
                                  <div key={idx} className="flex items-start justify-between py-1 border-b border-dashed border-slate-100 last:border-none">
                                    <div>
                                      <div className="font-extrabold text-slate-900 text-xs">
                                        {it.quantity} × {it.name} {it.sizeName && `(${it.sizeName})`}
                                      </div>
                                      {it.toppings && it.toppings.length > 0 && (
                                        <div className="text-[10px] text-amber-700 font-bold mt-0.5">
                                          إضافات: {it.toppings.join(' • ')}
                                        </div>
                                      )}
                                    </div>
                                    <div className="font-black text-slate-800 text-xs shrink-0">
                                      {it.price * it.quantity} ج.م
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Price Calculation Breakdown */}
                              <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-[11px]">
                                <div className="flex justify-between text-slate-600">
                                  <span>حساب الأصناف:</span>
                                  <span className="font-bold">{order.subtotal} ج.م</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                  <span>خدمة التوصيل السريع:</span>
                                  <span className="font-bold">{order.deliveryFee} ج.م</span>
                                </div>
                                <div className="flex justify-between text-slate-900 font-black pt-1 border-t border-slate-200 text-xs">
                                  <span>المبلغ المدفوع كلياً:</span>
                                  <span className="text-[#0D1E3A]">{order.grandTotal} ج.م</span>
                                </div>
                              </div>

                              {/* Delivery & Payment Info */}
                              <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                                {order.address && (
                                  <div className="flex items-center gap-1.5 truncate">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>العنوان: {order.address}</span>
                                  </div>
                                )}
                                {order.paymentMethod && (
                                  <div className="flex items-center gap-1.5">
                                    <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>طريقة الدفع: {order.paymentMethod}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl bg-[#0D1E3A] hover:bg-[#1A3258] active:scale-[0.98] text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>تصفح قائمة الطعام والطلب</span>
                </button>

                {currentUser?.isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>تسجيل الخروج من الحساب</span>
                  </button>
                )}
              </div>

              {/* Trust Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>مطعم الأندلس • جميع أسعارك وطلباتك موثقة بدقة بالجنيه المصري</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
