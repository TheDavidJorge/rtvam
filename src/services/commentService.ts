
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
  updateDoc
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { User } from 'firebase/auth';
import { Comment } from './types';

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
      const postData = postSnap.data();
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

// Delete a comment (optional function for future use)
export const deleteComment = async (commentId: string, postId: string): Promise<void> => {
  try {
    // This would implement comment deletion logic
    // Including updating the post's comment count
    console.log('Delete comment functionality to be implemented', commentId, postId);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
