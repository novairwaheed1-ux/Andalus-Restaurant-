import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from './data/menuData';
import type { MenuItem, CartItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus, Grid, Home, Heart, ShoppingBag, User, MapPin, ChevronDown, Bell, Phone } from 'lucide-react';
import MenuCard from './components/MenuCard';
import DishDetailModal from './components/DishDetailModal';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [spinningItemId, setSpinningItemId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Animation coordinates
  const [flyStartCoords, setFlyStartCoords] = useState<{x: number, y: number} | null>(null);
  const [flyEndCoords, setFlyEndCoords] = useState<{x: number, y: number} | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [flyingImage, setFlyingImage] = useState('');
  const [isCartBumping, setIsCartBumping] = useState(false);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeCategory === 'all') return matchesSearch;
      return item.category === activeCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleItemClick = (item: MenuItem) => {
    // Immediate responsive transition without lagging
    setSpinningItemId(item.id);
    setSelectedItem(item);
  };

  const handleAddToCart = (item: CartItem, startX: number, startY: number) => {
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
    
    setFlyingImage(item.image);
    setFlyStartCoords({ x: startX, y: startY });
    setFlyEndCoords({ x: endX, y: endY });
    setIsFlying(true);
    
    // Smooth, relaxed exit timing: allows the user to clearly see the flying animation before the modal closes
    setTimeout(() => {
      setSelectedItem(null);
      setSpinningItemId(null);
    }, 750);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex justify-center items-start selection:bg-[#FF5B2E]/20 relative overflow-x-hidden font-sans" dir="rtl">
      
      {/* Top 1/3 Harmonious Gradient: White -> Brand #FF5B2E -> Soft Pink #FFB6C1 (Zero-lag hardware composite for low-end & high-end devices) */}
      <div 
        className="absolute top-0 inset-x-0 h-80 sm:h-96 pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(255, 91, 46, 0.22) 0%, transparent 60%), radial-gradient(circle at 15% 35%, rgba(255, 182, 193, 0.4) 0%, transparent 65%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 91, 46, 0.12) 35%, rgba(255, 182, 193, 0.3) 70%, rgba(248, 250, 252, 0) 100%)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Consistent Responsive Container (Mobile, iPad, Laptop maintain exact proportional beauty) */}
      <div className="w-full max-w-[440px] md:max-w-[460px] min-h-screen relative flex flex-col z-10 pb-32">
        
        {/* Header Section matching Video Frame 00:00 */}
        <header className="px-5 pt-8 pb-3 relative z-10">
          
          {/* Delivery Location & Direct Call Bar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 flex items-center justify-center text-[#FF5B2E]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">التوصيل إلى</div>
                <div className="flex items-center gap-1 font-black text-sm text-slate-900">
                  <span>ديروط - أول منزل أبو جبل</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="tel:01008141062" 
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 hover:text-[#FF5B2E] transition-colors active:scale-95"
                title="اتصال مباشر: 01008141062"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button 
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 hover:text-[#FF5B2E] transition-colors active:scale-95"
                title="التنبيهات"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Headline from Video */}
          <h1 className="text-[32px] sm:text-[34px] font-black text-slate-900 tracking-tight leading-tight mb-5">
            جعان يا صحبي؟ <span className="text-[#FF5B2E]">اطلب واستمتع 🍕</span>
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              className="block w-full pr-11 pl-4 py-3.5 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[15px] font-semibold"
              placeholder="ابحث عن بيتزا، كريب، حواوشي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Circles matching Video Frame 00:00 */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center gap-2.5 shrink-0 group active:scale-95 transition-transform"
                >
                  <div className={`w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-[#1A1A1A] text-white shadow-xl shadow-black/20 scale-105' 
                      : 'bg-white/90 backdrop-blur-md border border-slate-100 text-slate-800 shadow-sm hover:shadow-md'
                  }`}>
                    {cat.icon === 'grid' ? (
                      <Grid className={`w-7 h-7 ${isActive ? 'text-white' : 'text-slate-800'}`} />
                    ) : (
                      <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center">
                        <img 
                          referrerPolicy="no-referrer" 
                          src={cat.icon} 
                          alt={cat.name} 
                          className="w-full h-full object-cover p-1.5" 
                        />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-black tracking-tight transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* 2-Column Food Grid matching Video */}
        <main className="px-5 relative z-10">
          <div className="flex items-center justify-between mb-4 mt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              الأصناف المتوفرة ({filteredItems.length})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
            {filteredItems.map(item => (
              <MenuCard 
                key={item.id} 
                item={item} 
                isSpinning={spinningItemId === item.id}
                onClick={() => handleItemClick(item)}
                onAdd={(e) => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  const startX = rect.left + rect.width / 2;
                  const startY = rect.top + rect.height / 2;
                  
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
                  
                  handleAddToCart(newItem, startX, startY);
                }}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Floating Bottom Nav - Identical on Mobile, iPad, Laptop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[380px] bg-[#1A1A1A] px-8 py-4 rounded-[40px] flex items-center justify-between shadow-2xl shadow-black/25 z-[150]">
        <button className="text-[#FF5B2E] transition-colors relative flex flex-col items-center">
          <Home className="w-6 h-6" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FF5B2E] rounded-full"></div>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Heart className="w-6 h-6" />
        </button>
        <button 
          className="text-slate-400 hover:text-white transition-colors relative cart-icon-target"
          onClick={() => setIsCartOpen(true)}
        >
          <motion.div
            animate={isCartBumping ? { scale: [1, 1.25, 1], x: [0, -4, 4, -4, 4, 0], rotate: [0, -15, 15, -15, 15, 0] } : { scale: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FF5B2E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </motion.div>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <User className="w-6 h-6" />
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

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />

      {/* Fly to Cart Animation - Slower, relaxed and graceful arc trajectory */}
      <AnimatePresence>
        {isFlying && flyStartCoords && flyEndCoords && (
          <motion.img 
            referrerPolicy="no-referrer"
            initial={{ 
              x: flyStartCoords.x - 65, 
              y: flyStartCoords.y - 65, 
              scale: 0.7, 
              opacity: 1,
              rotate: 0
            }}
            animate={{ 
              x: [flyStartCoords.x - 65, flyStartCoords.x - 65, flyEndCoords.x - 65],
              y: [flyStartCoords.y - 65, flyStartCoords.y - 130, flyEndCoords.y - 65], 
              scale: [0.7, 1.05, 0.15],
              opacity: [1, 1, 1, 0], 
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 0.95,
              times: [0, 0.45, 1],
              ease: [0.22, 1, 0.36, 1]
            }}
            onAnimationComplete={() => {
              setIsFlying(false);
              setFlyStartCoords(null);
              setFlyEndCoords(null);
              setIsCartBumping(true);
              setTimeout(() => setIsCartBumping(false), 500);
            }}
            src={flyingImage}
            decoding="async"
            className="fixed z-[250] w-36 h-36 object-cover drop-shadow-2xl pointer-events-none rounded-full will-change-transform"
            style={{ 
              top: 0,
              left: 0,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
