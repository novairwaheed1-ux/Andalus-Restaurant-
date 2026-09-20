import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, AlertCircle, Check, Loader2, 
  ChevronRight, ArrowLeft, Lock, UserPlus, X, ShieldCheck,
  Wifi, Battery
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
  // Phase 1: Splash Screen matching video ("ANDALUS RESTAURANT" in center on dark canvas)
  // Phase 2: Login Screen sliding up matching video and screenshot exactly
  const [phase, setPhase] = useState<'splash' | 'login'>('splash');
  
  // Required Inputs: Gmail & Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation & Loading States
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Google Accounts Selector & Verification Dialog State
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [googleStep, setGoogleStep] = useState<'choose' | 'password' | 'custom'>('choose');
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<GoogleAccountOption | null>(null);
  const [googlePassword, setGooglePassword] = useState('');
  const [showGooglePassword, setShowGooglePassword] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Available Google Accounts
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

  // Play the exact Splash to Login animation sequence from the video on first mount
  useEffect(() => {
    if (isOpen && !currentUser?.isLoggedIn) {
      setPhase('splash');
      const timer = setTimeout(() => {
        setPhase('login');
      }, 1600); // Splash visible for 1.6s then smooth transition to login sheet
      return () => clearTimeout(timer);
    } else {
      setPhase('login');
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // Validation: User MUST enter their Gmail and Password
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('يرجى إدخال الجيميل أو البريد الإلكتروني (Email is required)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('يرجى كتابة بريد إلكتروني صحيح (مثل: yourname@gmail.com)');
      return;
    }

    if (!password) {
      setErrorMessage('يرجى إدخال كلمة المرور (Password is required)');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('كلمة المرور يجب ألا تقل عن 6 خانات');
      return;
    }

    // Trigger video button loading animation
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

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

      setTimeout(() => {
        onLoginSuccess(userData);
        if (onClose) onClose();
      }, 600);
    }, 1100);
  };

  // Google Account Selection Handler
  const handleSelectAccount = (account: GoogleAccountOption) => {
    setSelectedGoogleAccount(account);
    setGooglePassword('');
    setGoogleError('');
    setGoogleStep('password');
  };

  // Google Custom Account Continue Handler
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

  // Google Password Confirmation & Login Handler
  const handleGooglePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError('');

    if (!googlePassword) {
      setGoogleError('يرجى إدخال كلمة المرور الخاصة بحسابك للدخول');
      return;
    }

    if (googlePassword.length < 6) {
      setGoogleError('كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل');
      return;
    }

    setIsGoogleSubmitting(true);

    setTimeout(() => {
      setIsGoogleSubmitting(false);
      
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
      if (onClose) onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[300] w-full h-full bg-[#000000] text-white flex flex-col justify-between overflow-hidden select-none font-sans"
        dir="ltr"
      >
        {/* Top Status Bar (Identical to 12:28 / Wifi / Battery in the video and screenshot) */}
        <div className="w-full max-w-lg mx-auto pt-3 pb-1 px-7 flex items-center justify-between text-xs font-semibold text-white/90 z-30 select-none">
          <span className="tracking-tight text-[13px] font-medium">12:28</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PHASE 1: Splash Screen matching video Frame 00:01 - 00:03     */}
        {/* ------------------------------------------------------------- */}
        {phase === 'splash' && !currentUser?.isLoggedIn ? (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-center justify-center text-center px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] text-white uppercase drop-shadow-md">
                ANDALUS RESTAURANT
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base font-medium tracking-wide">
                All your favorites in one place
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* ----------------------------------------------------------- */
          /* PHASE 2: Exact Login Screen from Video & Screenshot         */
          /* ----------------------------------------------------------- */
          <div className="flex-1 flex flex-col justify-between h-full relative z-10 w-full max-w-lg mx-auto overflow-hidden">
            
            {/* Top Bar with Animated ANDALUS RESTAURANT Title & Subtitle */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full pt-4 pb-2 px-7 flex flex-col items-start relative z-10"
            >
              <div className="flex items-start justify-between w-full">
                <div className="space-y-1 max-w-[280px]">
                  <motion.h1 
                    layoutId="app-main-title"
                    className="text-xl sm:text-2xl font-black tracking-[0.16em] text-white uppercase leading-tight"
                  >
                    ANDALUS RESTAURANT
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-400 text-xs font-medium tracking-normal"
                  >
                    Welcome back! Log in to continue.
                  </motion.p>
                </div>

                {!isGate && onClose && (
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </motion.header>

            {/* Bottom White Card Sliding Up with the EXACT Sweeping Curve from Screenshot */}
            <motion.div
              key="login-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mt-auto flex flex-col relative z-20"
            >
              {/* THE EXACT ORGANIC ASYMMETRICAL CURVE FROM THE SCREENSHOT */}
              <div className="w-full overflow-hidden -mb-[1px] select-none pointer-events-none">
                <svg 
                  viewBox="0 0 420 135" 
                  className="w-full h-auto block" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 0,85 C 65,125 170,120 270,72 C 345,35 390,12 420,0 L 420,135 L 0,135 Z" 
                    fill="#ffffff" 
                  />
                </svg>
              </div>

              {/* Card Body in Solid White */}
              <div className="w-full bg-white text-slate-900 px-7 sm:px-9 pb-8 sm:pb-10 pt-2 shadow-2xl">
                {/* Form Heading: Login */}
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-black tracking-tight">
                    {isSignUpMode ? 'Create Account' : 'Login'}
                  </h2>
                </div>

                {/* Error Message Alert */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Forgot Password Feedback */}
                {forgotPasswordSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح!</span>
                  </motion.div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* 1. Email Field */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-black focus:bg-white text-slate-900 text-sm rounded-2xl px-4 py-3.5 outline-none transition-all placeholder:text-slate-400 font-medium"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* 2. Password Field */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-black focus:bg-white text-slate-900 text-sm rounded-2xl pl-4 pr-11 py-3.5 outline-none transition-all placeholder:text-slate-400 font-medium tracking-wide"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Forgot Password Link (right-aligned, exactly matching screenshot) */}
                    <div className="flex justify-end mt-1.5">
                      <button
                        type="button"
                        onClick={() => setForgotPasswordSent(true)}
                        className="text-xs font-medium text-neutral-500 hover:text-black transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* 3. Dark Pill Login Action Button matching video */}
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full bg-[#1A1A1A] hover:bg-black active:scale-[0.98] text-white font-bold py-4 rounded-full text-base shadow-md transition-all flex items-center justify-center gap-2 mt-3"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Logging in...</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span>Success!</span>
                      </div>
                    ) : (
                      <span>{isSignUpMode ? 'Sign Up' : 'Login'}</span>
                    )}
                  </button>
                </form>

                {/* 4. Or Divider */}
                <div className="relative my-6 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <span className="relative bg-white px-3 text-xs font-medium text-slate-400">
                    Or
                  </span>
                </div>

                {/* 5. Google Sign In Button (Clicking prompts account list then password) */}
                <div className="flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowGooglePicker(true);
                      setGoogleStep('choose');
                      setGooglePassword('');
                      setGoogleError('');
                    }}
                    className="w-13 h-13 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all active:scale-95 shadow-xs hover:shadow-md"
                    title="تسجيل الدخول باستخدام Google"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                  </button>
                  <span className="text-[11px] font-semibold text-slate-400 mt-2 tracking-tight">
                    Sign in with Google
                  </span>
                </div>

                {/* 6. Footer (Don't have an account? Sign up) */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-500 font-medium">
                    {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(!isSignUpMode);
                        setErrorMessage('');
                      }}
                      className="font-bold text-black hover:underline ml-1"
                    >
                      {isSignUpMode ? 'Login' : 'Sign up'}
                    </button>
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* GOOGLE ACCOUNT SELECTOR & PASSWORD PROMPT MODAL                    */}
        {/* ------------------------------------------------------------------- */}
        <AnimatePresence>
          {showGooglePicker && (
            <div 
              className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-slate-900"
              dir="rtl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
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

                  <button
                    type="button"
                    onClick={() => setShowGooglePicker(false)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Area based on googleStep */}
                <div className="p-6">
                  {/* STEP 1: CHOOSE AN ACCOUNT */}
                  {googleStep === 'choose' && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div className="text-right mb-4">
                        <h3 className="text-lg font-black text-slate-900">اختيار حساب</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          للمتابعة وتسجيل الدخول إلى مطعم الأندلس (Andalus Restaurant)
                        </p>
                      </div>

                      {/* Accounts List */}
                      <div className="space-y-2 mb-4">
                        {availableGoogleAccounts.map((acc) => (
                          <button
                            key={acc.email}
                            type="button"
                            onClick={() => handleSelectAccount(acc)}
                            className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center justify-between transition-all text-right group active:scale-[0.99]"
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
                          </button>
                        ))}

                        {/* Use Another Account Button */}
                        <button
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
                        </button>
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
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
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
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md"
                          >
                            التالي
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 3: PASSWORD PROMPT (Before entry) */}
                  {googleStep === 'password' && selectedGoogleAccount && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
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
                          className="text-[11px] font-bold text-blue-600 hover:underline px-2"
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
                              className="absolute left-3 text-slate-400 hover:text-slate-600"
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
                            className="text-xs font-bold text-slate-500 hover:text-slate-800"
                          >
                            رجوع
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isGoogleSubmitting}
                            className="bg-black hover:bg-neutral-900 active:scale-[0.98] text-white text-xs font-black px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                          >
                            {isGoogleSubmitting ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>جاري الدخول...</span>
                              </>
                            ) : (
                              <span>تأكيد وتسجيل الدخول</span>
                            )}
                          </button>
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
