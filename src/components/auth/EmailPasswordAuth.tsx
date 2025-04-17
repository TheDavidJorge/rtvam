
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

const EmailPasswordAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('error'),
        description: t('enter_email_password'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      resetForm();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('error'),
        description: t('enter_email_password'),
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('error'),
        description: t('password_too_short'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      resetForm();
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin">
        <CardHeader>
          <CardTitle className="text-center">{t('account_access')}</CardTitle>
          <CardDescription className="text-center">
            {t('account_access_description')}
          </CardDescription>
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="signin">{t('login')}</TabsTrigger>
            <TabsTrigger value="signup">{t('register')}</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <TabsContent value="signin">
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={t('your_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder={t('your_password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <LogIn className="h-4 w-4 mr-2" />
                )}
                {t('login')}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t('your_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={t('your_password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('password_requirement')}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {t('register')}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default EmailPasswordAuth;
