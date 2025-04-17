
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommentSection from '@/components/common/CommentSection';
import { useLanguage } from '@/contexts/LanguageContext';

const FootballComments = () => {
  const { t } = useLanguage();

  return (
    <Card className="mb-8">
      <CardHeader className="bg-rtam-blue text-white">
        <CardTitle>{t('comments')}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <CommentSection postId="football-general" />
      </CardContent>
    </Card>
  );
};

export default FootballComments;
