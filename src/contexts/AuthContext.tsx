
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserCredential } from 'firebase/auth';
import { auth, signInWithEmailPassword, signUpWithEmailPassword } from '@/config/firebase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential | null>;
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  currentUser: null, 
  user: null,
  loading: true,
  signInWithEmail: async () => null,
  signUpWithEmail: async () => null,
  signOut: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
    try {
      const result = await signInWithEmailPassword(email, password);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      return result;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign in. Please check your credentials.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
    try {
      const result = await signUpWithEmailPassword(email, password);
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Welcome!",
      });
      return result;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create account.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        console.log('User is logged in:', user.displayName);
      } else {
        console.log('User is logged out');
      }
    }, (error) => {
      console.error('Auth state change error:', error);
      toast({
        title: "Authentication Error",
        description: "There was a problem with authentication. Please refresh the page.",
        variant: "destructive",
      });
      setLoading(false);
    });

    return unsubscribe;
  }, [toast]);

  const value = {
    currentUser,
    user: currentUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
