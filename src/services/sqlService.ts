
import db from '@/config/sql-database';
import { Post, Comment, NewsletterSubscriber } from '@/services/types';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export const syncUserToSQL = async (user: User) => {
  try {
    await db.query(
      `INSERT INTO users (firebase_id, email, display_name, photo_url, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (firebase_id) DO UPDATE SET
       email = EXCLUDED.email,
       display_name = EXCLUDED.display_name,
       photo_url = EXCLUDED.photo_url,
       updated_at = EXCLUDED.updated_at`,
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
    await db.query(
      `INSERT INTO posts (firebase_id, title, content, author_uid, category, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (firebase_id) DO UPDATE SET
       title = EXCLUDED.title,
       content = EXCLUDED.content,
       category = EXCLUDED.category,
       updated_at = EXCLUDED.updated_at`,
      [
        post.id,
        post.title,
        post.content,
        post.author.uid,
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
    await db.query(
      `INSERT INTO comments (firebase_id, post_id, author_uid, content, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (firebase_id) DO UPDATE SET
       content = EXCLUDED.content,
       updated_at = EXCLUDED.updated_at`,
      [
        comment.id,
        comment.postId,
        comment.author.uid,
        comment.content,
        comment.createdAt instanceof Timestamp ? comment.createdAt.toDate().toISOString() : new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error('Error syncing comment to SQL:', error);
  }
};

export const syncNewsletterToSQL = async (subscription: NewsletterSubscriber) => {
  try {
    await db.query(
      `INSERT INTO newsletter_subscribers (firebase_id, email, name, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (firebase_id) DO UPDATE SET
       email = EXCLUDED.email,
       name = EXCLUDED.name,
       updated_at = EXCLUDED.updated_at`,
      [
        subscription.id,
        subscription.email,
        subscription.name,
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
    const result = await db.query(
      'SELECT * FROM posts WHERE author_uid = $1 ORDER BY created_at DESC',
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
    const result = await db.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
      [postId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching post comments from SQL:', error);
    return [];
  }
};
