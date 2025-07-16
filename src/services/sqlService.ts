
import { db } from '@/config/sql-database';
import { Post, Comment, NewsletterSubscription } from '@/services/types';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export const syncUserToSQL = async (user: User) => {
  try {
    await db.execute(
      `INSERT OR REPLACE INTO users (id, email, display_name, photo_url, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.uid,
        user.email,
        user.displayName,
        user.photoURL,
        new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error('Error syncing user to SQL:', error);
  }
};

export const syncPostToSQL = async (post: Post) => {
  try {
    await db.execute(
      `INSERT OR REPLACE INTO posts (id, title, content, author, category, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        post.id,
        post.title,
        post.content,
        post.author,
        post.category,
        post.createdAt instanceof Timestamp ? post.createdAt.toDate().toISOString() : new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error('Error syncing post to SQL:', error);
  }
};

export const syncCommentToSQL = async (comment: Comment) => {
  try {
    await db.execute(
      `INSERT OR REPLACE INTO comments (id, post_id, author, content, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        comment.id,
        comment.postId,
        comment.author,
        comment.content,
        comment.createdAt instanceof Timestamp ? comment.createdAt.toDate().toISOString() : new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error('Error syncing comment to SQL:', error);
  }
};

export const syncNewsletterToSQL = async (subscription: NewsletterSubscription) => {
  try {
    await db.execute(
      `INSERT OR REPLACE INTO newsletter_subscriptions (id, email, created_at, updated_at) 
       VALUES (?, ?, ?, ?)`,
      [
        subscription.id,
        subscription.email,
        subscription.createdAt instanceof Timestamp ? subscription.createdAt.toDate().toISOString() : new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error('Error syncing newsletter subscription to SQL:', error);
  }
};

export const getUserPostsFromSQL = async (userId: string) => {
  try {
    const result = await db.execute(
      'SELECT * FROM posts WHERE author = ? ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching user posts from SQL:', error);
    return [];
  }
};

export const getPostCommentsFromSQL = async (postId: string) => {
  try {
    const result = await db.execute(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC',
      [postId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching post comments from SQL:', error);
    return [];
  }
};
