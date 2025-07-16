
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pt, enUS } from 'date-fns/locale';
import { useAuth2 } from '@/hooks/use-firebase';
import { useComments } from '@/hooks/use-firebase';
import { addComment } from '@/services/commentService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthModal from '@/components/auth/AuthModal';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { comments, loading } = useComments(postId);
  const { user } = useAuth2();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: t('login_required'),
        description: t('login_to_comment'),
      });
      return;
    }
    
    if (newComment.trim() === '') return;
    
    try {
      setSubmitting(true);
      await addComment({
        postId,
        content: newComment,
        author: {
          uid: user.uid,
          displayName: user.displayName || 'Anonymous',
          photoURL: user.photoURL || '',
        }
      }, user);
      
      setNewComment('');
      toast({
        title: t('comment_added'),
        description: t('comment_success'),
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: t('error'),
        description: t('comment_error'),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: language === 'pt' ? pt : enUS
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{t('comments')} ({comments.length})</h3>
      
      {user ? (
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('write_comment')}
              className="w-full resize-none"
              rows={3}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmitComment}
                disabled={submitting || newComment.trim() === ''}
                className="flex items-center gap-2"
              >
                {submitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {t('post_comment')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="mb-4">{t('login_to_comment')}</p>
            <AuthModal />
          </CardContent>
        </Card>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.author.photoURL} alt={comment.author.displayName} />
                <AvatarFallback>{comment.author.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{comment.author.displayName}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                  </div>
                  <p className="mt-1 text-sm">{comment.content}</p>
                </div>
                <div className="flex items-center mt-1 ml-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {t('like')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground">
          {t('no_comments')}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
