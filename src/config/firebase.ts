
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { toast } from "@/hooks/use-toast";

// Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
};

// Handle Google sign-in
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    toast({
      title: "Login Error",
      description: "Could not sign in with Google. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Sign out user
export const signOut = async (): Promise<boolean> => {
  try {
    await auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    toast({
      title: "Error",
      description: "Could not sign out. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
