import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  sendPasswordResetEmail, 
  updateProfile,
  onAuthStateChanged,
  Auth,
  User
} from 'firebase/auth';

const firebaseConfig = {
  projectId: "adroit-parser-txctm",
  appId: "1:422935083461:web:c9f35014b19885adcbf3ac",
  apiKey: "AIzaSyBGYESuwa4y4HEbXKze4BYVxr9B2V6UctA",
  authDomain: "adroit-parser-txctm.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-alandalous-88e26461-3a3c-4eb6-beb7-1e18971b2dc9",
  storageBucket: "adroit-parser-txctm.firebasestorage.app",
  messagingSenderId: "422935083461",
  measurementId: "",
  oAuthClientId: "422935083461-ohoqapahse1b87h8h9vm9sbkfl6nunud.apps.googleusercontent.com"
};

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: 'popup'
});

export { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  fbSignOut, 
  sendPasswordResetEmail, 
  updateProfile,
  onAuthStateChanged 
};
export type { User };
