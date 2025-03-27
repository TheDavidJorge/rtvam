
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Send } from 'lucide-react';

// Mock data for comments
const initialComments = [
  { id: '1', author: 'João Pedro', text: 'Black Bulls vai ser campeão este ano!', likes: 15, date: '2024-05-19' },
  { id: '2', author: 'Maria Sousa', text: 'Ferroviário de Maputo precisa melhorar a defesa.', likes: 8, date: '2024-05-18' },
  { id: '3', author: 'Carlos Matola', text: 'Estou ansioso para ver os jogos de qualificação para o Mundial.', likes: 12, date: '2024-05-17' }
];

const FootballComments = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '' || newCommentAuthor.trim() === '') return;
    
    const comment = {
      id: Date.now().toString(),
      author: newCommentAuthor,
      text: newComment,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setNewCommentAuthor('');
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader className="bg-rtam-blue text-white">
        <CardTitle>Comentários</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                id="author"
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Seu nome"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comentário
              </label>
              <Textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Deixe seu comentário sobre futebol..."
                className="w-full"
                rows={3}
              />
            </div>
            <Button 
              onClick={handleAddComment}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rtam-blue hover:bg-rtam-blue-dark"
            >
              <Send className="h-4 w-4" /> Enviar comentário
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-800">{comment.author}</h4>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-1 text-gray-700">{comment.text}</p>
              <div className="flex items-center mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(comment.id)}
                  className="text-gray-500 hover:text-rtam-blue flex items-center gap-1 p-0"
                >
                  <ThumbsUp className="h-4 w-4" /> {comment.likes}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FootballComments;
