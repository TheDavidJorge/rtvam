
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailPassword,
  User,
  UserCredential
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { toast } from "@/hooks/use-toast";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDz9X55y5LsLIDlEMGabHFBRGarmIsdWiw",
  authDomain: "rtvamweb.firebaseapp.com",
  projectId: "rtvamweb",
  storageBucket: "rtvamweb.firebasestorage.app",
  messagingSenderId: "892179817803",
  appId: "1:892179817803:web:21c6200fe49cabce11b4ce"
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

// Handle Email/Password sign-up
export const signUpWithEmailPassword = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing up with email/password:', error);
    throw error;
  }
};

// Handle Email/Password sign-in
export const signInWithEmailPassword = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    return await firebaseSignInWithEmailPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in with email/password:', error);
    throw error;
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
