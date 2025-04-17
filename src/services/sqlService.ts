
import { query, syncFirebaseWithSql } from '@/config/sql-database';
import { Post, Comment } from '@/services/postService';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

// Convert Firebase timestamp to SQL date
const timestampToDate = (timestamp: Timestamp | null): string | null => {
  return timestamp ? new Date(timestamp.toMillis()).toISOString() : null;
};

// Sync a Firebase post with SQL database
export const syncPostToSql = async (post: Post): Promise<number> => {
  if (!post.id) {
    throw new Error('Post must have an ID to sync with SQL database');
  }
  
  const postData = {
    title: post.title,
    content: post.content,
    category_id: await getCategoryIdByName(post.category),
    author_id: post.author.uid,
    image_url: post.imageUrl || null,
    created_at: timestampToDate(post.createdAt),
    updated_at: timestampToDate(post.updatedAt),
    likes: post.likes || 0,
    comment_count: post.comments || 0
  };
  
  return await syncFirebaseWithSql(post.id, 'posts', postData);
};

// Sync a Firebase comment with SQL database
export const syncCommentToSql = async (comment: Comment): Promise<number> => {
  if (!comment.id) {
    throw new Error('Comment must have an ID to sync with SQL database');
  }
  
  const postIdQuery = await query('SELECT id FROM posts WHERE firebase_id = $1', [comment.postId]);
  const sqlPostId = postIdQuery.rowCount > 0 ? postIdQuery.rows[0].id : null;
  
  if (!sqlPostId) {
    throw new Error(`Post with Firebase ID ${comment.postId} not found in SQL database`);
  }
  
  const commentData = {
    post_id: sqlPostId,
    user_id: comment.author.uid,
    content: comment.content,
    created_at: timestampToDate(comment.createdAt)
  };
  
  return await syncFirebaseWithSql(comment.id, 'comments', commentData);
};

// Sync a Firebase user with SQL database
export const syncUserToSql = async (user: User): Promise<void> => {
  const userData = {
    id: user.uid,
    display_name: user.displayName || '',
    email: user.email || '',
    photo_url: user.photoURL || '',
    last_login: new Date().toISOString()
  };
  
  try {
    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE id = $1', [user.uid]);
    
    if (existingUser.rowCount > 0) {
      // Update user
      await query(
        'UPDATE users SET display_name = $1, email = $2, photo_url = $3, last_login = $4 WHERE id = $5',
        [userData.display_name, userData.email, userData.photo_url, userData.last_login, userData.id]
      );
    } else {
      // Insert user
      await query(
        'INSERT INTO users (id, display_name, email, photo_url, created_at, last_login) VALUES ($1, $2, $3, $4, $5, $6)',
        [userData.id, userData.display_name, userData.email, userData.photo_url, userData.last_login, userData.last_login]
      );
    }
  } catch (error) {
    console.error('Error syncing user to SQL:', error);
    throw error;
  }
};

// Get category ID by name (create if doesn't exist)
export const getCategoryIdByName = async (categoryName: string): Promise<number> => {
  try {
    // Try to find existing category
    const existingCategory = await query('SELECT id FROM categories WHERE name = $1', [categoryName]);
    
    if (existingCategory.rowCount > 0) {
      return existingCategory.rows[0].id;
    }
    
    // Create new category if doesn't exist
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const newCategory = await query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING id',
      [categoryName, slug]
    );
    
    return newCategory.rows[0].id;
  } catch (error) {
    console.error('Error getting category ID:', error);
    throw error;
  }
};

// Add or update newsletter subscriber
export const addNewsletterSubscriber = async (
  email: string, 
  name?: string, 
  userId?: string
): Promise<number> => {
  try {
    // Check if subscriber exists
    const existingSubscriber = await query('SELECT id FROM newsletter_subscribers WHERE email = $1', [email]);
    
    if (existingSubscriber.rowCount > 0) {
      // Update existing subscriber
      await query(
        'UPDATE newsletter_subscribers SET name = $1, user_id = $2, is_active = true WHERE email = $3',
        [name || '', userId || null, email]
      );
      
      return existingSubscriber.rows[0].id;
    }
    
    // Insert new subscriber
    const newSubscriber = await query(
      'INSERT INTO newsletter_subscribers (email, name, user_id) VALUES ($1, $2, $3) RETURNING id',
      [email, name || '', userId || null]
    );
    
    return newSubscriber.rows[0].id;
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error);
    throw error;
  }
};

// Record user like on post
export const recordUserLike = async (userId: string, postId: string): Promise<void> => {
  try {
    // Get SQL post ID from Firebase ID
    const postQuery = await query('SELECT id FROM posts WHERE firebase_id = $1', [postId]);
    
    if (postQuery.rowCount === 0) {
      throw new Error(`Post with Firebase ID ${postId} not found in SQL database`);
    }
    
    const sqlPostId = postQuery.rows[0].id;
    
    // Check if like already exists
    const existingLike = await query(
      'SELECT 1 FROM user_likes WHERE user_id = $1 AND post_id = $2',
      [userId, sqlPostId]
    );
    
    if (existingLike.rowCount === 0) {
      // Insert like if doesn't exist
      await query(
        'INSERT INTO user_likes (user_id, post_id) VALUES ($1, $2)',
        [userId, sqlPostId]
      );
      
      // Update post likes count
      await query(
        'UPDATE posts SET likes = likes + 1 WHERE id = $1',
        [sqlPostId]
      );
    }
  } catch (error) {
    console.error('Error recording user like:', error);
    throw error;
  }
};

// Remove user like from post
export const removeUserLike = async (userId: string, postId: string): Promise<void> => {
  try {
    // Get SQL post ID from Firebase ID
    const postQuery = await query('SELECT id FROM posts WHERE firebase_id = $1', [postId]);
    
    if (postQuery.rowCount === 0) {
      throw new Error(`Post with Firebase ID ${postId} not found in SQL database`);
    }
    
    const sqlPostId = postQuery.rows[0].id;
    
    // Check if like exists
    const existingLike = await query(
      'SELECT 1 FROM user_likes WHERE user_id = $1 AND post_id = $2',
      [userId, sqlPostId]
    );
    
    if (existingLike.rowCount > 0) {
      // Delete like
      await query(
        'DELETE FROM user_likes WHERE user_id = $1 AND post_id = $2',
        [userId, sqlPostId]
      );
      
      // Update post likes count
      await query(
        'UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = $1',
        [sqlPostId]
      );
    }
  } catch (error) {
    console.error('Error removing user like:', error);
    throw error;
  }
};

// Get all posts with SQL queries (with optional filtering)
export const getPosts = async (
  category?: string,
  limit: number = 10,
  offset: number = 0
): Promise<any[]> => {
  try {
    let queryText = `
      SELECT p.*, c.name as category_name, u.display_name as author_name, u.photo_url as author_photo
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.is_published = true
    `;
    
    const queryParams: any[] = [];
    
    if (category) {
      queryText += ' AND c.slug = $1';
      queryParams.push(category);
    }
    
    queryText += ' ORDER BY p.published_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, offset);
    
    const result = await query(queryText, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error getting posts from SQL:', error);
    throw error;
  }
};

// Get post by ID
export const getPostById = async (id: number): Promise<any | null> => {
  try {
    const result = await query(`
      SELECT p.*, c.name as category_name, u.display_name as author_name, u.photo_url as author_photo
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [id]);
    
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error getting post by ID from SQL:', error);
    throw error;
  }
};

// Get comments for post
export const getCommentsForPost = async (postId: number): Promise<any[]> => {
  try {
    const result = await query(`
      SELECT c.*, u.display_name as author_name, u.photo_url as author_photo
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1 AND c.is_approved = true
      ORDER BY c.created_at DESC
    `, [postId]);
    
    return result.rows;
  } catch (error) {
    console.error('Error getting comments from SQL:', error);
    throw error;
  }
};

export default {
  syncPostToSql,
  syncCommentToSql,
  syncUserToSql,
  addNewsletterSubscriber,
  recordUserLike,
  removeUserLike,
  getPosts,
  getPostById,
  getCommentsForPost
};
