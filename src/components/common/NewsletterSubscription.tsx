
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Mail } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/newsletterService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth2 } from '@/hooks/use-firebase';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth2();
  
  // Pre-fill fields if user is logged in
  React.useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.displayName || '');
    }
  }, [user]);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('error'),
        description: t('enter_email'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await subscribeToNewsletter(email, name);
      toast({
        title: t('success'),
        description: t('newsletter_success'),
      });
      
      // Only clear fields if user is not logged in
      if (!user) {
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: t('error'),
        description: t('newsletter_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {t('newsletter')}
        </CardTitle>
        <CardDescription>
          {t('newsletter_description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('your_name')}
              disabled={loading || (user && !!user.displayName)}
            />
          </div>
          <div>
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('your_email')}
              required
              disabled={loading || (user && !!user.email)}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            {t('subscribe')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;
