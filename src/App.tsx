import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from './data/menuData';
import type { MenuItem, CartItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Grid, Home, Heart, ShoppingBag, User } from 'lucide-react';
import MenuCard from './components/MenuCard';
import DishDetailModal from './components/DishDetailModal';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
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
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeCategory === 'all') return matchesSearch;
      return item.category === activeCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
    
    // Delay closing modal slightly so the animation can be seen starting from the modal
    setTimeout(() => {
      setSelectedItem(null);
    }, 400);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32" dir="rtl">
      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        
        {/* Delivery Info Location */}
        <div className="flex flex-col gap-1 mb-6">
          <span className="text-xs font-bold text-slate-400 tracking-wider">التوصيل إلى</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 text-sm">ديروط - أول منزل أبو جبل</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180"><path d="M6 9L12 15L18 9" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        <h1 className="text-4xl text-slate-900 mt-2 mb-6 leading-tight">
          <span className="font-extrabold text-slate-900 tracking-tight block mb-1">جعان؟ </span>
          <span className="text-slate-400 font-medium">اطلب اللي نفسك فيه.</span>
        </h1>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-11 pl-4 py-4 bg-white border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] shadow-sm text-lg font-medium"
            placeholder="ابحث في المنيو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex flex-col items-center gap-3 shrink-0"
            >
              <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-md transition-all ${
                activeCategory === cat.id ? 'bg-[#1A1A1A] shadow-lg shadow-black/20' : 'bg-white border border-slate-100'
              }`}>
                {cat.icon === 'grid' ? (
                  <Grid className={`w-8 h-8 ${activeCategory === cat.id ? 'text-white' : 'text-slate-800'}`} />
                ) : (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img referrerPolicy="no-referrer" src={cat.icon} alt={cat.name} className="w-full h-full object-cover p-2" />
                  </div>
                )}
              </div>
              <span className={`text-sm font-semibold ${activeCategory === cat.id ? 'text-slate-900' : 'text-slate-500'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Menu Grid */}
      <main className="px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {filteredItems.map(item => (
            <MenuCard 
              key={item.id} 
              item={item} 
              onClick={() => setSelectedItem(item)}
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

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] px-8 py-4 rounded-[40px] flex items-center justify-center gap-10 shadow-2xl z-[150]">
        <button className="text-[#FF5B2E] transition-colors relative flex flex-col items-center">
          <Home className="w-6 h-6" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF5B2E] rounded-full"></div>
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
              <span className="absolute -top-1 -right-2 bg-[#FF5B2E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90">
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
            onClose={() => setSelectedItem(null)} 
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

      {/* Fly to Cart Animation - Enhanced Arcing & Scaling */}
      <AnimatePresence>
        {isFlying && flyStartCoords && flyEndCoords && (
          <motion.img referrerPolicy="no-referrer"
            initial={{ 
              x: flyStartCoords.x - 80, 
              y: flyStartCoords.y - 80, 
              scale: 0.5, 
              opacity: 1,
              rotate: 0
            }}
            animate={{ 
              x: [flyStartCoords.x - 80, flyStartCoords.x - 80, flyEndCoords.x - 80],
              y: [flyStartCoords.y - 80, flyStartCoords.y - 150, flyEndCoords.y - 80], 
              scale: [0.5, 1.1, 0.1], // Grows slightly then shrinks perfectly to cart size
              opacity: [1, 1, 1, 0], 
              rotate: [0, 360, 1080] // Spin effect while falling
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.4, 1], // The arc apex happens at 40% of the animation
              ease: "easeInOut"
            }}
            onAnimationComplete={() => {
              setIsFlying(false);
              setFlyStartCoords(null);
              setFlyEndCoords(null);
              setIsCartBumping(true);
              setTimeout(() => setIsCartBumping(false), 500);
            }}
            src={flyingImage}
            className="fixed z-[250] w-40 h-40 object-cover drop-shadow-2xl pointer-events-none"
            style={{ 
              clipPath: 'circle(48% at 50% 50%)',
              top: 0,
              left: 0,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
