import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { CATEGORIES, MENU_ITEMS } from './data/menuData';
import type { MenuItem, CartItem } from './types';
import { motion, AnimatePresence } from "motion/react";
import { Plus, Grid, Home, Package, ShoppingBag, User, MapPin, ChevronDown, Bell, Phone, LogIn } from 'lucide-react';
import MenuCard from './components/MenuCard';
import DishDetailModal from './components/DishDetailModal';
import CartDrawer from './components/CartDrawer';
import LoginModal, { type UserProfile } from './components/LoginModal';
import OrderModal from './components/OrderModal';
import { auth, onAuthStateChanged, fbSignOut } from './lib/firebase';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [spinningItemId, setSpinningItemId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Login & Order Modals State - Persistent login so the user is never kicked out
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('andalus_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isLoggedIn) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Login modal toggle
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Synchronize with real Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const user: UserProfile = {
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'مستخدم Google',
          email: fbUser.email || '',
          avatar: fbUser.photoURL || undefined,
          isLoggedIn: true,
          rememberMe: true,
        };
        setCurrentUser(user);
        try {
          localStorage.setItem('andalus_current_user', JSON.stringify(user));
        } catch (e) {
          console.error(e);
        }
        setIsLoginOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = useCallback((user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('andalus_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setIsLoginOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    fbSignOut(auth).catch(() => {});
    setCurrentUser(null);
    try {
      localStorage.removeItem('andalus_current_user');
    } catch (e) {
      console.error(e);
    }
    setIsLoginOpen(true);
  }, []);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  // Animation coordinates, cart jump and realistic physical vibration state
  const [flyStartCoords, setFlyStartCoords] = useState<{x: number, y: number, size?: number} | null>(null);
  const [flyEndCoords, setFlyEndCoords] = useState<{x: number, y: number} | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [flyingImage, setFlyingImage] = useState('');
  const [isCartJumping, setIsCartJumping] = useState(false);
  const [isCartVibrating, setIsCartVibrating] = useState(false);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const displayedItems = filteredItems;

  const handleItemClick = useCallback((item: MenuItem) => {
    // Immediate responsive transition without lagging
    setSpinningItemId(item.id);
    setSelectedItem(item);
  }, []);

  const handleAddToCart = useCallback((item: CartItem, startX: number, startY: number, startSize: number = 150, customImg?: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.menuItemId === item.menuItemId && i.sizeId === item.sizeId);
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    
    // Get exact target coordinates for the cart icon
    const cartIcon = document.querySelector('.cart-icon-target');
    let endX = window.innerWidth / 2;
    let endY = window.innerHeight - 50;
    
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      endX = rect.left + rect.width / 2;
      endY = rect.top + rect.height / 2;
    }
    
    // Prefer pre-cached thumbnail or currently loaded image src so image displays instantly with 0 decoding latency
    const resolvedImg = customImg || (item.image.startsWith('/items/') ? item.image.replace('/items/', '/thumbs/') : item.image);
    setFlyingImage(resolvedImg);
    setFlyStartCoords({ x: startX, y: startY, size: startSize });
    setFlyEndCoords({ x: endX, y: endY });
    setIsFlying(true);
    setIsCartJumping(false);
    setIsCartVibrating(false);

    // After 580ms of flight (in total 1.0s animation), the cart leaps up and grows big to catch the incoming dish!
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(() => {
      setIsCartJumping(true);
    }, 580);
    
    // Close modal immediately so there are no heavy layout/re-render spikes mid-flight
    setSelectedItem(null);
    setSpinningItemId(null);
  }, []);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col items-center selection:bg-[#0D1E3A] selection:text-white relative overflow-x-hidden font-sans" dir="rtl">
      
      {/* Top Header Section - Deep Navy Blue with smooth organic curved bottom */}
      <header className="w-full bg-[#0D1E3A] text-white pt-6 pb-7 px-4 sm:px-6 rounded-b-[42px] shadow-xl shadow-slate-950/20 relative z-10">
        <div className="w-full max-w-[460px] md:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Delivery Location & Direct Call Bar */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider leading-tight">التوصيل إلى</span>
                <div className="flex items-center gap-1 font-black text-sm text-white mt-0.5">
                  <span>ديروط - أول منزل أبو جبل</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="tel:01008141062" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors active:scale-95 shadow-xs"
                title="اتصال مباشر: 01008141062"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* User Avatar / Login Button */}
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center overflow-hidden active:scale-95 transition-transform shadow-xs cursor-pointer"
                title={currentUser?.isLoggedIn ? `مرحباً ${currentUser.name}` : "تسجيل الدخول"}
              >
                {currentUser?.isLoggedIn ? (
                  currentUser.avatar ? (
                    <img 
                      referrerPolicy="no-referrer"
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A3258] text-white flex items-center justify-center font-black text-sm shadow-inner">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-[25px] sm:text-[29px] font-black text-white tracking-tight leading-snug mb-4">
            جعان يا صحبي؟ <span className="text-amber-400">اطلب واستمتع 🍕</span>
          </h1>

          {/* Category Circles */}
          <div className="flex gap-3 sm:gap-3.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const catIcon = cat.icon.startsWith('/items/') ? cat.icon.replace('/items/', '/thumbs/') : cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform cursor-pointer"
                >
                  <div className={`w-[62px] h-[62px] rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white text-[#0D1E3A] shadow-xl shadow-slate-950/25 scale-105 ring-4 ring-white/30' 
                      : 'bg-white/90 text-slate-800 shadow-md hover:shadow-lg hover:bg-white border border-white/40'
                  }`}>
                    {cat.icon === 'grid' ? (
                      <Grid className={`w-6 h-6 ${isActive ? 'text-[#0D1E3A]' : 'text-slate-800'}`} />
                    ) : (
                      <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center">
                        <img 
                          referrerPolicy="no-referrer" 
                          src={catIcon} 
                          alt={cat.name} 
                          loading="eager"
                          className="w-full h-full object-cover p-1" 
                        />
                      </div>
                    )}
                  </div>
                  <span className={`text-[12px] whitespace-nowrap transition-colors mt-0.5 ${
                    isActive ? 'text-white font-black drop-shadow-xs' : 'text-slate-300 font-bold'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Food Section - Cleanly positioned on light background with generous spacing */}
      <main className="w-full max-w-[460px] md:max-w-2xl lg:max-w-4xl px-4 sm:px-6 pt-6 pb-32 relative z-10 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <span>الأكثر طلباً</span>
            <span className="text-lg">🔥</span>
          </h2>
          <span className="text-xs font-black text-[#0D1E3A] bg-blue-50/80 border border-blue-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
            {filteredItems.length} صنف جاهز للطلب
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {displayedItems.map((item, idx) => (
            <MenuCard 
              key={`${activeCategory}-${item.id}`} 
              item={item} 
              index={idx}
              isSpinning={spinningItemId === item.id}
              onClick={() => handleItemClick(item)}
              onAdd={(e) => {
                const cardEl = (e.currentTarget.closest('.menu-card') as HTMLElement) || (e.currentTarget as HTMLElement);
                const imgEl = cardEl?.querySelector('img');
                const rect = imgEl ? imgEl.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
                const startX = rect.left + rect.width / 2;
                const startY = rect.top + rect.height / 2;
                const startSize = rect.width || 140;
                
                const newItem: CartItem = {
                  id: Date.now().toString(),
                  menuItemId: item.id,
                  name: item.name,
                  image: item.image,
                  sizeId: item.sizes[0].id,
                  sizeName: item.sizes[0].name,
                  price: item.sizes[0].price,
                  quantity: 1,
                  description: item.description
                };
                
                const currentImgSrc = imgEl?.src || (item.image.startsWith('/items/') ? item.image.replace('/items/', '/thumbs/') : item.image);
                handleAddToCart(newItem, startX, startY, startSize, currentImgSrc);
              }}
            />
          ))}
        </div>
      </main>

      {/* Floating Bottom Nav - Identical on Mobile, iPad, Laptop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[380px] bg-[#0D1E3A] px-8 py-4 rounded-[40px] flex items-center justify-between shadow-2xl shadow-slate-950/40 z-[150] border border-white/10">
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-amber-400 transition-colors relative flex flex-col items-center"
          title="الرئيسية"
        >
          <Home className="w-6 h-6" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
        </button>

        {/* Orders & Live Tracking Button (Replacing Heart) */}
        <button 
          onClick={() => setIsOrderModalOpen(true)}
          className="text-slate-400 hover:text-white transition-colors relative active:scale-90"
          title="تتبع الطلب والأوردرات"
        >
          <Package className="w-6 h-6" />
        </button>

        {/* Cart Button with Mid-Air Jump & Catch */}
        <button 
          className="text-slate-400 hover:text-white transition-colors relative cart-icon-target active:scale-90"
          onClick={() => setIsCartOpen(true)}
          title="سلة المشتريات"
        >
          {/* Catch Ripple Burst when dish lands */}
          {isCartVibrating && (
            <span className="absolute -inset-4 rounded-full bg-amber-400/70 animate-ping pointer-events-none" />
          )}

          {/* Jump Aura when cart leaps into the air and grows big */}
          {isCartJumping && (
            <span className="absolute -inset-3.5 rounded-full bg-amber-400/50 animate-pulse pointer-events-none" />
          )}

          <motion.div
            animate={
              isCartVibrating ? { 
                y: [-46, -48, 5, -2, 0],
                scale: [2.1, 2.35, 0.85, 1.25, 0.95, 1],
                rotate: [-10, 14, -8, 4, 0]
              } : isCartJumping ? {
                y: -46,
                scale: 2.1,
                rotate: -10
              } : { 
                y: 0, 
                scale: 1, 
                rotate: 0 
              }
            }
            transition={
              isCartVibrating ? { 
                duration: 0.65, 
                ease: "easeOut"
              } : isCartJumping ? {
                type: "spring",
                stiffness: 450,
                damping: 15
              } : { 
                duration: 0.25 
              }
            }
            className="relative will-change-transform"
          >
            <ShoppingBag className={`w-6 h-6 transition-colors duration-150 ${
              isCartJumping || isCartVibrating 
                ? 'text-amber-400 drop-shadow-[0_0_18px_rgba(251,191,36,1)] scale-110' 
                : ''
            }`} />
            {cartItemCount > 0 && (
              <motion.span 
                animate={isCartVibrating ? { scale: [1, 2.2, 1.15], y: [-8, 0] } : isCartJumping ? { scale: 1.3 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute -top-1.5 -right-2 bg-amber-400 text-[#0D1E3A] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md"
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.div>
        </button>

        {/* User Profile & Login Button */}
        <button 
          onClick={() => setIsLoginOpen(true)}
          className="text-slate-400 hover:text-white transition-colors relative active:scale-90"
          title={currentUser?.isLoggedIn ? `حسابي (${currentUser.name})` : "تسجيل الدخول"}
        >
          {currentUser?.isLoggedIn ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-amber-400">
              {currentUser.avatar ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#1A3258] text-white flex items-center justify-center font-bold text-[10px]">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black" />
            </div>
          ) : (
            <User className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DishDetailModal 
            item={selectedItem} 
            onClose={() => {
              setSelectedItem(null);
              setSpinningItemId(null);
            }} 
            onAdd={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer with onCheckout handler for 'يقين الاوردر' */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Login & Profile Modal */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Order Confirmation & Live Tracking Modal for 'يقين الاوردر' */}
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={cartItems}
        currentUser={currentUser}
        onOrderCompleted={() => {
          setCartItems([]);
        }}
      />

      {/* Fly to Cart Animation - Exactly 1.0s duration, shrinking gradually step-by-step ("سنة سنة") while cart leaps high and expands to catch it */}
      <AnimatePresence>
        {isFlying && flyStartCoords && flyEndCoords && (() => {
          const startX = flyStartCoords.x;
          const startY = flyStartCoords.y;
          const dishSize = flyStartCoords.size || 150;
          const endX = flyEndCoords.x;
          const endY = flyEndCoords.y;
          
          // Parabolic curve apex (lifts up prominently over the dish before plunging)
          const midX = startX + (endX - startX) * 0.45;
          const apexY = Math.min(startY, endY) - 95;

          // Target final scale so it shrinks right into the cart opening (~24px)
          const finalScale = Math.max(0.09, 24 / dishSize);

          // The cart leaps 46px into the air and expands big to catch the item, so intercept it at endY - 46!
          const interceptY = endY - 46;

          return (
            <motion.div
              key="flying-cart-item"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: dishSize,
                height: dishSize,
                zIndex: 9999,
                pointerEvents: 'none',
                willChange: 'transform',
                transformOrigin: 'center center',
              }}
              initial={{ 
                x: startX - dishSize / 2, 
                y: startY - dishSize / 2, 
                scale: 1, 
                opacity: 1,
                rotate: 0
              }}
              animate={{ 
                x: [
                  startX - dishSize / 2, 
                  midX - dishSize / 2, 
                  endX - dishSize / 2
                ],
                y: [
                  startY - dishSize / 2, 
                  apexY - dishSize / 2, 
                  interceptY - dishSize / 2
                ], 
                scale: [1, 0.92, 0.78, 0.58, 0.35, finalScale],
                opacity: [1, 1, 1, 1, 1, 0], 
                rotate: [0, 45, 130, 240, 360, 450]
              }}
              transition={{
                duration: 1.0,
                times: [0, 0.25, 0.52, 0.75, 0.90, 1],
                ease: [0.2, 0.75, 0.25, 1]
              }}
              onAnimationComplete={() => {
                setIsFlying(false);
                setFlyStartCoords(null);
                setFlyEndCoords(null);
                setIsCartJumping(false);
                
                // Crisp physical cart catch impact and landing recoil
                setIsCartVibrating(true);
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                  try {
                    navigator.vibrate([60, 40, 60]);
                  } catch (e) {}
                }
                setTimeout(() => setIsCartVibrating(false), 650);
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.38)] ring-3 ring-white bg-white flex items-center justify-center">
                <img 
                  referrerPolicy="no-referrer"
                  src={flyingImage}
                  alt="Flying Dish"
                  loading="eager"
                  decoding="sync"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/thumbs/')) {
                      target.src = target.src.replace('/thumbs/', '/items/');
                    }
                  }}
                  className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
