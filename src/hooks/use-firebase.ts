
import { useState, useEffect } from 'react';
import { 
  getPosts, 
  getPostsByCategory, 
  getPostById, 
  createPost, 
  addComment, 
  getCommentsByPostId,
  Post,
  Comment
} from '@/services/postService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle, signOut } from '@/config/firebase';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  return { posts, loading, error };
}

export function usePostsByCategory(category: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPostsByCategory(category);
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: `Failed to load posts for category: ${category}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchPosts();
    }
  }, [category, toast]);

  return { posts, loading, error };
}

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, toast]);

  return { post, loading, error };
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getCommentsByPostId(postId);
        setComments(fetchedComments);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: "Failed to load comments",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, toast]);

  return { comments, loading, error };
}

export function useAuth2() {
  const { currentUser, loading, signInWithEmail, signUpWithEmail } = useAuth();
  const [authError, setAuthError] = useState<Error | null>(null);
  const { toast } = useToast();

  const login = async () => {
    try {
      setAuthError(null);
      const user = await signInWithGoogle();
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome, ${user.displayName || 'User'}!`,
        });
      }
      return user;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setAuthError(error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setAuthError(error);
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const emailLogin = async (email: string, password: string) => {
    try {
      setAuthError(null);
      const result = await signInWithEmail(email, password);
      return result?.user || null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setAuthError(error);
      return null;
    }
  };

  const emailSignup = async (email: string, password: string) => {
    try {
      setAuthError(null);
      const result = await signUpWithEmail(email, password);
      return result?.user || null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setAuthError(error);
      return null;
    }
  };

  return { 
    user: currentUser, 
    loading, 
    error: authError, 
    login, 
    logout,
    emailLogin,
    emailSignup
  };
}
