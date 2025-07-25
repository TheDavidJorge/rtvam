
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { commentsService, type Comment } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await commentsService.getByPostId(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmitComment = async () => {
    if (newComment.trim() === '' || authorName.trim() === '') {
      toast({
        title: "Erro",
        description: "Preencha seu nome e comentário",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setSubmitting(true);
      await commentsService.create({
        post_id: postId,
        content: newComment,
        author_name: authorName,
      });
      
      setNewComment('');
      setAuthorName('');
      toast({
        title: "Sucesso",
        description: "Comentário adicionado com sucesso",
      });
      
      // Reload comments
      loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erro",
        description: "Falha ao adicionar comentário",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: pt
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comentários ({comments.length})
      </h3>
      
      {/* Comment Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Seu nome</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rtam-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Comentário</label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              className="w-full resize-none"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment}
              disabled={submitting || newComment.trim() === '' || authorName.trim() === ''}
              className="flex items-center gap-2"
            >
              {submitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Publicar comentário
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{comment.author_name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{comment.author_name}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(comment.created_at!)}</div>
                  </div>
                  <p className="mt-1 text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </div>
      )}
    </div>
  );
};

export default CommentSection;
