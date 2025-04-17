
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth2 } from '@/hooks/use-firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn } from 'lucide-react';
import GoogleLogin from './GoogleLogin';
import EmailPasswordAuth from './EmailPasswordAuth';

const AuthModal = () => {
  const { user } = useAuth2();
  const { t } = useLanguage();
  
  if (user) {
    return null; // Don't show the modal if user is logged in
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          {t('login')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('account_access')}</DialogTitle>
          <DialogDescription>
            {t('account_access_description')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="email" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">{t('email')}</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="py-4">
            <EmailPasswordAuth />
          </TabsContent>
          
          <TabsContent value="google" className="py-4 flex justify-center">
            <div className="py-8">
              <GoogleLogin />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
