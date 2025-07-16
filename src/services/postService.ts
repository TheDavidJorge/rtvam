
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
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Post } from './types';
import { uploadImage } from './storageService';

// Create a new post
export const createPost = async (post: Omit<Post, 'createdAt' | 'updatedAt' | 'id' | 'likes' | 'comments'>, image?: File): Promise<string> => {
  try {
    let imageUrl = post.imageUrl || '';
    
    // Upload image if provided
    if (image) {
      imageUrl = await uploadImage(image, 'posts');
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

// Update a post
export const updatePost = async (id: string, updates: Partial<Post>): Promise<void> => {
  try {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Like a post
export const likePost = async (postId: string): Promise<void> => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const postData = postSnap.data() as Post;
      await updateDoc(postRef, {
        likes: (postData.likes || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};
