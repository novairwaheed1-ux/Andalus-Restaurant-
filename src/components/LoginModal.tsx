import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, AlertCircle, Check, Loader2, 
  ChevronRight, ArrowLeft, Lock, UserPlus, X, ShieldCheck,
  Sparkles, LogOut, User
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isLoggedIn: boolean;
  rememberMe?: boolean;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  isGate?: boolean;
}

interface GoogleAccountOption {
  name: string;
  email: string;
  initial: string;
  bgColor: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  isGate = false,
}: LoginModalProps) {
  // State: 'splash' -> 'login'
  const [isSplashing, setIsSplashing] = useState(true);

  // Inputs & Focus States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);

  // Feedback, Errors, Loading & Mind-Blowing Dual Balls Fusion Animation
  type BallAnimState = 'idle' | 'green-approaching' | 'green-merged' | 'red-approaching' | 'red-merged';
  const [btnAnimState, setBtnAnimState] = useState<BallAnimState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Google Modal State
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [googleStep, setGoogleStep] = useState<'choose' | 'password' | 'custom'>('choose');
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<GoogleAccountOption | null>(null);
  const [googlePassword, setGooglePassword] = useState('');
  const [showGooglePassword, setShowGooglePassword] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [googleBtnAnimState, setGoogleBtnAnimState] = useState<BallAnimState>('idle');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Preset Google Accounts
  const availableGoogleAccounts: GoogleAccountOption[] = [
    {
      name: 'Novair Waheed',
      email: 'novairwaheed1@gmail.com',
      initial: 'N',
      bgColor: 'bg-blue-600',
    },
    {
      name: 'عميل الأندلس',
      email: 'andalus.customer@gmail.com',
      initial: 'A',
      bgColor: 'bg-emerald-600',
    },
  ];

  // Splash to Login sequence:
  // Starts centered for 1.4s, then smoothly slides to top-left and slides up the curved white card
  useEffect(() => {
    if (isOpen && !currentUser?.isLoggedIn) {
      setIsSplashing(true);
      const timer = setTimeout(() => {
        setIsSplashing(false);
      }, 1450);
      return () => clearTimeout(timer);
    } else {
      setIsSplashing(false);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // Form submit handler with the two glowing green/red balls fusion animation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // If currently playing the balls animation, ignore rapid duplicate clicks
    if (btnAnimState !== 'idle') return;

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isError = false;
    let errText = '';

    if (!trimmedEmail) {
      isError = true;
      errText = 'يرجى إدخال الجيميل أو البريد الإلكتروني (Email is required)';
    } else if (!emailRegex.test(trimmedEmail)) {
      isError = true;
      errText = 'يرجى كتابة بريد إلكتروني صحيح (مثل: yourname@gmail.com)';
    } else if (!password) {
      isError = true;
      errText = 'يرجى إدخال كلمة المرور (Password is required)';
    } else if (password.length < 6) {
      isError = true;
      errText = 'كلمة المرور يجب ألا تقل عن 6 خانات';
    }

    if (isError) {
      // 1. Text instantly disappears, two glowing red balls race in at hypersonic speed
      setBtnAnimState('red-approaching');

      // 2. High-speed collision (200ms) -> Violent Shake + Red 'X' + 'Failed' + Sparks
      setTimeout(() => {
        setBtnAnimState('red-merged');
        setShakeKey(prev => prev + 1);
        setErrorMessage(errText);
      }, 200);

      // 3. Smoothly restore word "Login" after showing the Failed state
      setTimeout(() => {
        setBtnAnimState('idle');
      }, 1600);
      return;
    }

    // SUCCESS FLOW:
    // 1. Text disappears, two glowing green balls race in at lightning speed
    setBtnAnimState('green-approaching');

    // 2. High-speed collision (200ms) -> Green Checkmark + 'Success!' + Sparks + Shockwave
    setTimeout(() => {
      setBtnAnimState('green-merged');
    }, 200);

    // 3. Rapid transition directly into the app (smooth and snappy)
    setTimeout(() => {
      const usernamePart = trimmedEmail.split('@')[0];
      const formattedName = usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);

      const userData: UserProfile = {
        name: formattedName,
        email: trimmedEmail,
        isLoggedIn: true,
      };

      try {
        localStorage.setItem('dairot_last_email', trimmedEmail);
      } catch {}

      onLoginSuccess(userData);
    }, 650);
  };

  const handleSelectAccount = (account: GoogleAccountOption) => {
    setSelectedGoogleAccount(account);
    setGooglePassword('');
    setGoogleError('');
    setGoogleStep('password');
  };

  const handleCustomAccountContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = customGoogleEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setGoogleError('يرجى إدخال عنوان بريد Google صالح');
      return;
    }
    const usernamePart = cleanEmail.split('@')[0];
    const newAccount: GoogleAccountOption = {
      name: usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1),
      email: cleanEmail,
      initial: cleanEmail.charAt(0).toUpperCase(),
      bgColor: 'bg-purple-600',
    };
    setSelectedGoogleAccount(newAccount);
    setGooglePassword('');
    setGoogleError('');
    setGoogleStep('password');
  };

  const handleGooglePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError('');

    if (googleBtnAnimState !== 'idle') return;

    if (!googlePassword) {
      setGoogleBtnAnimState('red-approaching');
      setTimeout(() => {
        setGoogleBtnAnimState('red-merged');
        setGoogleError('يرجى إدخال كلمة المرور الخاصة بحسابك للدخول');
      }, 200);
      setTimeout(() => {
        setGoogleBtnAnimState('idle');
      }, 1600);
      return;
    }

    if (googlePassword.length < 6) {
      setGoogleBtnAnimState('red-approaching');
      setTimeout(() => {
        setGoogleBtnAnimState('red-merged');
        setGoogleError('كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل');
      }, 200);
      setTimeout(() => {
        setGoogleBtnAnimState('idle');
      }, 1600);
      return;
    }

    // SUCCESS FLOW:
    setGoogleBtnAnimState('green-approaching');
    setTimeout(() => {
      setGoogleBtnAnimState('green-merged');
    }, 200);

    setTimeout(() => {
      const loggedInEmail = selectedGoogleAccount?.email || 'novairwaheed1@gmail.com';
      const loggedInName = selectedGoogleAccount?.name || 'Novair Waheed';

      const userData: UserProfile = {
        name: loggedInName,
        email: loggedInEmail,
        isLoggedIn: true,
      };

      try {
        localStorage.setItem('dairot_last_email', loggedInEmail);
      } catch {}

      setShowGooglePicker(false);
      onLoginSuccess(userData);
    }, 650);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[300] w-full h-full bg-[#000000] text-white flex flex-col justify-between overflow-hidden select-none font-sans"
        dir="ltr"
      >
        {/* Ambient Atmospheric Glow (Zero CPU/GPU Overhead) */}
        <div 
          className="absolute inset-0 pointer-events-none transform-gpu"
          style={{
            background: 'radial-gradient(circle at 10% 10%, rgba(217, 119, 6, 0.16) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(51, 65, 85, 0.20) 0%, transparent 55%)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        >
          {/* Constellation particle dust (Animation 3) */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03]" />
        </div>

        {/* -------------------------------------------------------------------------------- */}
        {/* SEAMLESS CONTINUOUS TITLE CONTAINER (Animations 4, 5, 6, 7, 8)                    */}
        {/* Glides seamlessly from screen center (Splash) to top-left (Login Header)         */}
        {/* -------------------------------------------------------------------------------- */}
        <div className="w-full max-w-lg mx-auto relative z-10 px-7 pointer-events-none">
          <motion.div
            initial={false}
            animate={{
              y: isSplashing ? '38vh' : '4vh',
              alignItems: isSplashing ? 'center' : 'flex-start',
              textAlign: isSplashing ? 'center' : 'left',
            }}
            transition={{
              duration: 1.05,
              ease: [0.19, 1, 0.22, 1], // Ultra-silky Apple-style easing
            }}
            className="flex flex-col w-full relative pointer-events-auto"
          >
            {/* Header Flex Row: Title + Close Button */}
            <div className="flex items-start justify-between w-full">
              <div className="space-y-1.5 max-w-[340px]">
                {/* Brand Title: continuous spring scaling and kerning */}
                <motion.h1 
                  animate={{
                    fontSize: isSplashing ? '2.15rem' : '1.35rem',
                    letterSpacing: isSplashing ? '0.22em' : '0.15em',
                  }}
                  transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
                  className="font-black text-white uppercase leading-tight drop-shadow-[0_4px_24px_rgba(255,255,255,0.14)] relative"
                >
                  ANDALUS RESTAURANT
                  
                  {/* Micro Gold Accent Underline that unfolds on login (Animation 9) */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      scaleX: isSplashing ? 0 : 1,
                      opacity: isSplashing ? 0 : 1
                    }}
                    transition={{ delay: 0.25, duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
                    className="h-[2px] w-12 bg-gradient-to-r from-amber-400 to-transparent mt-1 origin-left"
                  />
                </motion.h1>

                {/* Subtitle Morph (Animation 10): "All your favorites..." -> "Welcome back!..." */}
                <div className="relative h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isSplashing ? (
                      <motion.p
                        key="splash-sub"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4 }}
                        className="text-neutral-400 text-xs sm:text-sm font-medium tracking-wide"
                      >
                        All your favorites in one place
                      </motion.p>
                    ) : (
                      <motion.p
                        key="login-sub"
                        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-neutral-400 text-xs font-medium tracking-normal"
                      >
                        Welcome back! Log in to continue.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Close Button on Login (Animation 11) */}
              {!isGate && onClose && !isSplashing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors text-xs shadow-lg border border-white/10"
                >
                  ✕
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* -------------------------------------------------------------------------------- */}
        {/* BOTTOM WHITE SHEET WITH THE EXACT ORGANIC CURVE (Animations 12 to 38)            */}
        {/* Slides up in tandem with the title gliding to top-left                           */}
        {/* -------------------------------------------------------------------------------- */}
        <motion.div
          initial={false}
          animate={{
            y: isSplashing ? '105%' : '0%',
            opacity: isSplashing ? 0 : 1,
          }}
          transition={{
            duration: 1.05,
            ease: [0.19, 1, 0.22, 1], // Matches top title physics for cohesive kinetic harmony
          }}
          className="w-full max-w-lg mx-auto mt-auto flex flex-col relative z-20"
        >
          {/* THE EXACT ASYMMETRICAL ORGANIC CURVE FROM THE USER'S SCREENSHOT (Animation 12) */}
          <div className="w-full overflow-hidden -mb-[1px] select-none pointer-events-none relative">
            <svg 
              viewBox="0 0 420 135" 
              className="w-full h-auto block transform-gpu" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cardSurfaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fafafa" />
                </linearGradient>
              </defs>
              <path 
                d="M 0,85 C 65,125 170,120 270,72 C 345,35 390,12 420,0 L 420,135 L 0,135 Z" 
                fill="url(#cardSurfaceGradient)" 
              />
            </svg>
          </div>

          {/* White Card Body with Staggered Cascading Elements (Animations 13 to 38) */}
          <div className="w-full bg-[#fafafa] text-slate-900 px-7 sm:px-9 pb-8 sm:pb-10 pt-2 shadow-[0_-25px_60px_rgba(0,0,0,0.45)]">
            
            {/* If user is already logged in, show their luxury profile card instead of login form */}
            {currentUser?.isLoggedIn ? (
              <div className="py-2 text-center" dir="rtl">
                <div className="w-18 h-18 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-[#FF5B2E] text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-orange-500/25 mb-3 border-4 border-white">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                  أهلاً بك، {currentUser.name} 👋
                </h2>
                
                <p className="text-xs text-slate-500 font-medium mb-4" dir="ltr">
                  {currentUser.email}
                </p>

                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl p-3 mb-6 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>حسابك نشط ومحفوظ في مطعم الأندلس</span>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-13 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>متابعة تصفح قائمة الطعام والطلب 🍕</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onLogout) onLogout();
                    }}
                    className="w-full h-12 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-full text-xs border border-red-200/80 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج من الحساب</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
            {/* Form Title & Active Indicator (Animations 13 & 14) */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="text-3xl font-black text-black tracking-tight flex items-center gap-2"
                >
                  <span>{isSignUpMode ? 'Create Account' : 'Login'}</span>
                </motion.h2>
                <motion.div 
                  layoutId="active-mode-underline"
                  className="h-[3px] w-9 bg-black rounded-full mt-1.5" 
                />
              </div>
            </div>

            {/* Error Message with Elastic Slide & Bounce (Animation 15) */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.94, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, scale: 0.94, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="p-3.5 bg-red-50/90 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500 animate-pulse" />
                    <span>{errorMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Reset Feedback (Animation 16) */}
            <AnimatePresence>
              {forgotPasswordSent && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.94, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, scale: 0.94, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xs">
                    <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form with Violent Physics Shake on Error (High-Intensity Shock Tremor) */}
            <motion.form 
              key={shakeKey}
              onSubmit={handleLoginSubmit} 
              animate={shakeKey > 0 ? { 
                x: [-24, 24, -20, 20, -14, 14, -8, 8, -3, 3, 0],
                y: [-5, 5, -3, 3, 0],
                rotate: [-1.8, 1.8, -1.2, 1.2, 0]
              } : {}}
              transition={{ duration: 0.48, ease: 'easeInOut' }}
              className="space-y-4"
            >
              {/* 1. Email Field with Focus Bloom & Lift (Animations 18, 19, 20) */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5 transition-colors">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full bg-[#F3F5F8] border text-slate-900 text-sm rounded-2xl px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-slate-400 font-medium ${
                      focusedField === 'email'
                        ? 'border-black bg-white ring-4 ring-black/5 shadow-md -translate-y-0.5'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* 2. Password Field with Focus Bloom & Interactive Eye (Animations 21, 22, 23, 24) */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5 transition-colors">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-[#F3F5F8] border text-slate-900 text-sm rounded-2xl pl-4 pr-11 py-3.5 outline-none transition-all duration-300 placeholder:text-slate-400 font-medium tracking-wide ${
                      focusedField === 'password'
                        ? 'border-black bg-white ring-4 ring-black/5 shadow-md -translate-y-0.5'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                    autoComplete="current-password"
                  />
                  
                  {/* Eye Toggle with Rotation & Scale (Animations 23 & 24) */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {showPassword ? (
                        <motion.div
                          key="eye-off"
                          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                        >
                          <EyeOff className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye-on"
                          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Forgot Password Link with Micro-Slide (Animation 25) */}
                <div className="flex justify-end mt-1.5">
                  <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setForgotPasswordSent(true)}
                    className="text-xs font-medium text-neutral-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </motion.button>
                </div>
              </div>

              {/* 3. Luxury Dark Pill Login Button with Dual Glowing Balls Fusion Animation */}
              <div className="pt-2">
                <motion.button
                  whileHover={btnAnimState === 'idle' ? { scale: 1.015, y: -2 } : {}}
                  whileTap={btnAnimState === 'idle' ? { scale: 0.975 } : {}}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  type="submit"
                  disabled={btnAnimState !== 'idle'}
                  className={`w-full h-14 relative overflow-hidden text-white font-bold rounded-full text-base transition-all duration-300 flex items-center justify-center cursor-pointer select-none ${
                    btnAnimState === 'green-approaching' || btnAnimState === 'green-merged'
                      ? 'bg-[#062419] border-2 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)]'
                      : btnAnimState === 'red-approaching' || btnAnimState === 'red-merged'
                      ? 'bg-[#29080c] border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.45)]'
                      : 'bg-[#161618] hover:bg-black border border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.28)]'
                  }`}
                >
                  {/* Idle Light Sheen Sweep */}
                  {btnAnimState === 'idle' && (
                    <motion.div 
                      initial={{ x: '-120%' }}
                      whileHover={{ x: '120%' }}
                      transition={{ duration: 0.75, ease: 'easeInOut' }}
                      className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {/* STATE 1: IDLE - Clean Text, never shows success until user clicks Login */}
                    {btnAnimState === 'idle' && (
                      <motion.span
                        key="btn-label-idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4, filter: 'blur(8px)' }}
                        transition={{ duration: 0.18 }}
                        className="tracking-wide font-bold"
                      >
                        {isSignUpMode ? 'Sign Up' : 'Login'}
                      </motion.span>
                    )}

                    {/* STATE 2: SUCCESS - Two Glowing Green Balls Rushing from Edges to Center at Hypersonic Speed */}
                    {btnAnimState === 'green-approaching' && (
                      <motion.div
                        key="green-approaching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center justify-center w-full h-full"
                      >
                        {/* Left Green Orb with Hypersonic Plasma Tail */}
                        <motion.div
                          initial={{ x: -70, scale: 0.4, opacity: 0.4 }}
                          animate={{ x: 0, scale: 1.1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-100 shadow-[0_0_20px_#10B981,0_0_40px_#059669]"
                        >
                          {/* Light comet tail */}
                          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-5 h-2 bg-gradient-to-l from-emerald-400 to-transparent blur-[1px] rounded-full" />
                          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white opacity-95" />
                        </motion.div>

                        {/* Right Green Orb with Hypersonic Plasma Tail */}
                        <motion.div
                          initial={{ x: 70, scale: 0.4, opacity: 0.4 }}
                          animate={{ x: 0, scale: 1.1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute w-5 h-5 rounded-full bg-gradient-to-l from-emerald-400 via-emerald-300 to-green-100 shadow-[0_0_20px_#10B981,0_0_40px_#059669]"
                        >
                          {/* Light comet tail */}
                          <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-2 bg-gradient-to-r from-emerald-400 to-transparent blur-[1px] rounded-full" />
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white opacity-95" />
                        </motion.div>
                      </motion.div>
                    )}

                    {/* STATE 3: SUCCESS - Fusion Explosion, 8-Direction Spark Burst & Green Checkmark */}
                    {btnAnimState === 'green-merged' && (
                      <motion.div
                        key="green-merged"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center justify-center gap-3"
                      >
                        {/* Expanding Shockwave Ring 1 */}
                        <motion.div
                          initial={{ scale: 0.1, opacity: 1 }}
                          animate={{ scale: 4.2, opacity: 0 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="absolute w-7 h-7 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_#10B981] pointer-events-none"
                        />

                        {/* Expanding Shockwave Ring 2 */}
                        <motion.div
                          initial={{ scale: 0.1, opacity: 0.8 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                          className="absolute w-7 h-7 rounded-full border border-green-200 blur-[1px] pointer-events-none"
                        />

                        {/* 8-Direction Flying Energy Sparks */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                          const rad = (deg * Math.PI) / 180;
                          const dist = 32;
                          return (
                            <motion.div
                              key={`green-spark-${idx}`}
                              initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                              animate={{ 
                                x: Math.cos(rad) * dist, 
                                y: Math.sin(rad) * dist, 
                                scale: 0, 
                                opacity: 0 
                              }}
                              transition={{ duration: 0.38, ease: 'easeOut' }}
                              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#34D399]"
                            />
                          );
                        })}

                        {/* Core Checkmark Emblem with High-Tension Spring Pop */}
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 14, bounce: 0.5 }}
                          className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_25px_#10B981,0_0_45px_#059669] relative z-10"
                        >
                          <Check className="w-5 h-5 stroke-[3.5]" />
                        </motion.div>

                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08, duration: 0.2 }}
                          className="text-emerald-300 font-black text-base tracking-wider uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                        >
                          Success!
                        </motion.span>
                      </motion.div>
                    )}

                    {/* STATE 4: ERROR - Two Glowing Red Balls Rushing from Edges to Center at Hypersonic Speed */}
                    {btnAnimState === 'red-approaching' && (
                      <motion.div
                        key="red-approaching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center justify-center w-full h-full"
                      >
                        {/* Left Red Orb with Fiery Comet Tail */}
                        <motion.div
                          initial={{ x: -70, scale: 0.4, opacity: 0.4 }}
                          animate={{ x: 0, scale: 1.1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-red-500 via-rose-400 to-red-100 shadow-[0_0_20px_#EF4444,0_0_40px_#DC2626]"
                        >
                          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-5 h-2 bg-gradient-to-l from-red-500 to-transparent blur-[1px] rounded-full" />
                          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white opacity-95" />
                        </motion.div>

                        {/* Right Red Orb with Fiery Comet Tail */}
                        <motion.div
                          initial={{ x: 70, scale: 0.4, opacity: 0.4 }}
                          animate={{ x: 0, scale: 1.1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute w-5 h-5 rounded-full bg-gradient-to-l from-red-500 via-rose-400 to-red-100 shadow-[0_0_20px_#EF4444,0_0_40px_#DC2626]"
                        >
                          <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-2 bg-gradient-to-r from-red-500 to-transparent blur-[1px] rounded-full" />
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white opacity-95" />
                        </motion.div>
                      </motion.div>
                    )}

                    {/* STATE 5: ERROR - Violent Collision, 8-Direction Fiery Sparks, Red 'X' & 'Failed' */}
                    {btnAnimState === 'red-merged' && (
                      <motion.div
                        key="red-merged"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center justify-center gap-3"
                      >
                        {/* Expanding Fiery Shockwave Ring 1 */}
                        <motion.div
                          initial={{ scale: 0.1, opacity: 1 }}
                          animate={{ scale: 4.2, opacity: 0 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="absolute w-7 h-7 rounded-full border-2 border-red-500 shadow-[0_0_30px_#EF4444] pointer-events-none"
                        />

                        {/* Expanding Shockwave Ring 2 */}
                        <motion.div
                          initial={{ scale: 0.1, opacity: 0.8 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                          className="absolute w-7 h-7 rounded-full border border-rose-300 blur-[1px] pointer-events-none"
                        />

                        {/* 8-Direction Fiery Sparks */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                          const rad = (deg * Math.PI) / 180;
                          const dist = 32;
                          return (
                            <motion.div
                              key={`red-spark-${idx}`}
                              initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                              animate={{ 
                                x: Math.cos(rad) * dist, 
                                y: Math.sin(rad) * dist, 
                                scale: 0, 
                                opacity: 0 
                              }}
                              transition={{ duration: 0.38, ease: 'easeOut' }}
                              className="absolute w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_#F43F5E]"
                            />
                          );
                        })}

                        {/* Core X Emblem with Spring Pop & Counter-Rotation */}
                        <motion.div
                          initial={{ scale: 0, rotate: 45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 14, bounce: 0.5 }}
                          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_0_25px_#EF4444,0_0_45px_#DC2626] relative z-10"
                        >
                          <X className="w-5 h-5 stroke-[3.5]" />
                        </motion.div>

                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08, duration: 0.2 }}
                          className="text-red-400 font-black text-base tracking-wider uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                        >
                          Failed
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.form>

            {/* 4. Or Divider with Center Expansion (Animations 31 & 32) */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  className="w-full border-t border-slate-200" 
                />
              </div>
              <span className="relative bg-[#fafafa] px-4 text-xs font-semibold text-slate-400">
                Or
              </span>
            </div>

            {/* 5. Google Sign In Button with Magnetic Float & Pulse Aura (Animations 33, 34, 35) */}
            <div className="flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                type="button"
                onClick={() => {
                  setShowGooglePicker(true);
                  setGoogleStep('choose');
                  setGooglePassword('');
                  setGoogleError('');
                }}
                className="w-13 h-13 rounded-full border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-xs hover:shadow-xl transition-all relative group cursor-pointer"
                title="تسجيل الدخول باستخدام Google"
              >
                {/* Floating Radial Halo (Animation 34) */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 scale-90 group-hover:scale-120 transition-transform duration-300 opacity-0 group-hover:opacity-100" />

                <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </motion.button>
              <span className="text-[11px] font-semibold text-slate-400 mt-2 tracking-tight">
                Sign in with Google
              </span>
            </div>

            {/* 6. Footer (Don't have an account? Sign up) (Animations 36, 37, 38) */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 font-medium">
                {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUpMode(!isSignUpMode);
                    setErrorMessage('');
                  }}
                  className="font-bold text-black hover:underline ml-1 cursor-pointer transition-all"
                >
                  {isSignUpMode ? 'Login' : 'Sign up'}
                </button>
              </p>
            </div>
            </>
            )}
          </div>
        </motion.div>

        {/* -------------------------------------------------------------------------------- */}
        {/* GOOGLE ACCOUNT SELECTOR & PASSWORD PROMPT MODAL (Animations 39 to 52)            */}
        {/* -------------------------------------------------------------------------------- */}
        <AnimatePresence>
          {showGooglePicker && (
            <div 
              className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md text-slate-900"
              dir="rtl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 25 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                className="w-full max-w-md bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100 overflow-hidden"
              >
                {/* Google Brand Header */}
                <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span className="font-bold text-slate-800 text-sm">تسجيل الدخول بحساب Google</span>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowGooglePicker(false)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* STEP 1: CHOOSE AN ACCOUNT */}
                  {googleStep === 'choose' && (
                    <motion.div
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="text-right mb-4">
                        <h3 className="text-lg font-black text-slate-900">اختيار حساب</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          للمتابعة وتسجيل الدخول إلى مطعم الأندلس (Andalus Restaurant)
                        </p>
                      </div>

                      {/* Accounts List with Staggered Slide */}
                      <div className="space-y-2 mb-4">
                        {availableGoogleAccounts.map((acc, index) => (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.3 }}
                            whileHover={{ scale: 1.015, x: -2 }}
                            whileTap={{ scale: 0.98 }}
                            key={acc.email}
                            type="button"
                            onClick={() => handleSelectAccount(acc)}
                            className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center justify-between transition-all text-right group shadow-2xs hover:shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full ${acc.bgColor} text-white flex items-center justify-center font-black text-sm shadow-xs`}>
                                {acc.initial}
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                  {acc.name}
                                </div>
                                <div className="text-xs text-slate-500" dir="ltr">
                                  {acc.email}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 rotate-180 transition-colors" />
                          </motion.button>
                        ))}

                        {/* Use Another Account Button */}
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => {
                            setGoogleStep('custom');
                            setCustomGoogleEmail('');
                            setGoogleError('');
                          }}
                          className="w-full p-3.5 rounded-2xl border border-dashed border-slate-300 hover:border-slate-500 hover:bg-slate-50 flex items-center gap-3 transition-all text-right"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                            <UserPlus className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">استخدام حساب Google آخر</div>
                            <div className="text-[11px] text-slate-400">إدخال بريد جيميل مختلف</div>
                          </div>
                        </motion.button>
                      </div>

                      <div className="text-center pt-2">
                        <span className="text-[11px] text-slate-400">
                          بالمتابعة، ستشارك اسمك وعنوان بريدك الإلكتروني مع مطعم الأندلس
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: CUSTOM GMAIL INPUT */}
                  {googleStep === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center gap-2 mb-4 text-right">
                        <button
                          type="button"
                          onClick={() => setGoogleStep('choose')}
                          className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
                        >
                          <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">إدخال حساب Google</h3>
                          <p className="text-xs text-slate-500">أدخل عنوان بريدك الإلكتروني</p>
                        </div>
                      </div>

                      {googleError && (
                        <div className="mb-3 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                          {googleError}
                        </div>
                      )}

                      <form onSubmit={handleCustomAccountContinue} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 text-right">
                            البريد الإلكتروني (Gmail)
                          </label>
                          <input
                            type="email"
                            value={customGoogleEmail}
                            onChange={(e) => setCustomGoogleEmail(e.target.value)}
                            placeholder="username@gmail.com"
                            dir="ltr"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-900 text-sm rounded-xl px-4 py-3 outline-none transition-all"
                            autoFocus
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setGoogleStep('choose')}
                            className="text-xs font-bold text-slate-500 hover:text-slate-800"
                          >
                            رجوع للقائمة
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                          >
                            التالي
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 3: PASSWORD PROMPT */}
                  {googleStep === 'password' && selectedGoogleAccount && (
                    <motion.div
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Account Selected Pill Header */}
                      <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${selectedGoogleAccount.bgColor} text-white flex items-center justify-center font-black text-xs`}>
                            {selectedGoogleAccount.initial}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-800 text-xs">{selectedGoogleAccount.name}</div>
                            <div className="text-[11px] text-slate-500" dir="ltr">{selectedGoogleAccount.email}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setGoogleStep('choose')}
                          className="text-[11px] font-bold text-blue-600 hover:underline px-2 cursor-pointer"
                        >
                          تغيير الحساب
                        </button>
                      </div>

                      <div className="text-right mb-4">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-slate-500" />
                          <span>أدخل كلمة المرور الخاصة بك</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          لتأكيد هويتك وتسجيل الدخول بحساب Google المحدد
                        </p>
                      </div>

                      {googleError && (
                        <div className="mb-3 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                          <span>{googleError}</span>
                        </div>
                      )}

                      <form onSubmit={handleGooglePasswordSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 text-right">
                            كلمة المرور (Password)
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type={showGooglePassword ? 'text' : 'password'}
                              value={googlePassword}
                              onChange={(e) => setGooglePassword(e.target.value)}
                              placeholder="أدخل كلمة المرور..."
                              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                              dir="ltr"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => setShowGooglePassword(!showGooglePassword)}
                              className="absolute left-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showGooglePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تسجيل دخول مشفر وآمن عبر بوابة Google</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setGoogleStep('choose')}
                            className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            رجوع
                          </button>
                          
                          <motion.button
                            whileHover={googleBtnAnimState === 'idle' ? { scale: 1.02 } : {}}
                            whileTap={googleBtnAnimState === 'idle' ? { scale: 0.97 } : {}}
                            type="submit"
                            disabled={googleBtnAnimState !== 'idle'}
                            className={`min-w-[140px] h-11 text-xs font-black px-6 rounded-xl shadow-lg transition-all flex items-center justify-center relative overflow-hidden cursor-pointer select-none ${
                              googleBtnAnimState === 'green-approaching' || googleBtnAnimState === 'green-merged'
                                ? 'bg-[#062419] text-white border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                                : googleBtnAnimState === 'red-approaching' || googleBtnAnimState === 'red-merged'
                                ? 'bg-[#29080c] text-white border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                                : 'bg-black hover:bg-neutral-900 active:scale-[0.98] text-white'
                            }`}
                          >
                            <AnimatePresence mode="wait">
                              {googleBtnAnimState === 'idle' && (
                                <motion.span
                                  key="google-btn-idle"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
                                  transition={{ duration: 0.2 }}
                                >
                                  تأكيد وتسجيل الدخول
                                </motion.span>
                              )}

                              {googleBtnAnimState === 'green-approaching' && (
                                <motion.div
                                  key="google-green-approaching"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="relative flex items-center justify-center w-36 h-full"
                                >
                                  <motion.div
                                    initial={{ x: -45, scale: 0.3 }}
                                    animate={{ x: 0, scale: 1.1 }}
                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-100 shadow-[0_0_16px_#10B981]"
                                  />
                                  <motion.div
                                    initial={{ x: 45, scale: 0.3 }}
                                    animate={{ x: 0, scale: 1.1 }}
                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-4 h-4 rounded-full bg-gradient-to-l from-emerald-400 to-green-100 shadow-[0_0_16px_#10B981]"
                                  />
                                </motion.div>
                              )}

                              {googleBtnAnimState === 'green-merged' && (
                                <motion.div
                                  key="google-green-merged"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="relative flex items-center gap-2"
                                >
                                  {/* Expanding shockwave */}
                                  <motion.div
                                    initial={{ scale: 0.1, opacity: 1 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="absolute -inset-1 rounded-full border border-emerald-400 pointer-events-none"
                                  />
                                  <motion.div
                                    initial={{ scale: 0, rotate: -40 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 14, bounce: 0.5 }}
                                    className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_18px_#10B981]"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                  </motion.div>
                                  <span className="text-emerald-300 font-extrabold text-xs uppercase tracking-wider">Success!</span>
                                </motion.div>
                              )}

                              {googleBtnAnimState === 'red-approaching' && (
                                <motion.div
                                  key="google-red-approaching"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="relative flex items-center justify-center w-36 h-full"
                                >
                                  <motion.div
                                    initial={{ x: -45, scale: 0.3 }}
                                    animate={{ x: 0, scale: 1.1 }}
                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-rose-100 shadow-[0_0_16px_#EF4444]"
                                  />
                                  <motion.div
                                    initial={{ x: 45, scale: 0.3 }}
                                    animate={{ x: 0, scale: 1.1 }}
                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-4 h-4 rounded-full bg-gradient-to-l from-red-500 to-rose-100 shadow-[0_0_16px_#EF4444]"
                                  />
                                </motion.div>
                              )}

                              {googleBtnAnimState === 'red-merged' && (
                                <motion.div
                                  key="google-red-merged"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="relative flex items-center gap-2"
                                >
                                  {/* Expanding shockwave */}
                                  <motion.div
                                    initial={{ scale: 0.1, opacity: 1 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="absolute -inset-1 rounded-full border border-red-500 pointer-events-none"
                                  />
                                  <motion.div
                                    initial={{ scale: 0, rotate: 40 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 14, bounce: 0.5 }}
                                    className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_0_18px_#EF4444]"
                                  >
                                    <X className="w-3.5 h-3.5 stroke-[3.5]" />
                                  </motion.div>
                                  <span className="text-red-400 font-extrabold text-xs uppercase tracking-wider">Failed</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
}
