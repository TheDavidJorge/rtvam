
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  updateDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/config/firebase';
import { User } from 'firebase/auth';

export interface Post {
  id?: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  author: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  likes: number;
  comments: number;
}

export interface Comment {
  id?: string;
  postId: string;
  content: string;
  createdAt: Timestamp | null;
  author: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
}

// Create a new post
export const createPost = async (post: Omit<Post, 'createdAt' | 'updatedAt' | 'id' | 'likes' | 'comments'>, image?: File): Promise<string> => {
  try {
    let imageUrl = post.imageUrl || '';
    
    // Upload image if provided
    if (image) {
      const storageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    
    const postData = {
      ...post,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: 0,
      comments: 0
    };
    
    const docRef = await addDoc(collection(db, 'posts'), postData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post));
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Get posts by category
export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, 'posts'), 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post));
  } catch (error) {
    console.error('Error getting posts by category:', error);
    throw error;
  }
};

// Get a single post by ID
export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
};

// Add a comment to a post
export const addComment = async (comment: Omit<Comment, 'createdAt' | 'id'>, user: User): Promise<string> => {
  try {
    // Add the comment
    const commentData = {
      ...comment,
      createdAt: serverTimestamp(),
      author: {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      }
    };
    
    const docRef = await addDoc(collection(db, 'comments'), commentData);
    
    // Update comment count on the post
    const postRef = doc(db, 'posts', comment.postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const postData = postSnap.data() as Post;
      await updateDoc(postRef, {
        comments: (postData.comments || 0) + 1
      });
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Get comments for a post
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const q = query(
      collection(db, 'comments'), 
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Comment));
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string, name?: string): Promise<string> => {
  try {
    const subscriberData = {
      email,
      name: name || '',
      createdAt: serverTimestamp(),
      active: true
    };
    
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), subscriberData);
    return docRef.id;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
