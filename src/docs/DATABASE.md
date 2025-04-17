
# Database Structure Documentation

This document outlines the database structure used in the RTVAM Web application.

## Hybrid Database Approach

This application uses a hybrid database approach combining:

1. **Firebase Firestore** - For real-time features and authentication
2. **SQL Database** - For complex queries, reporting, and structured data relationships

## SQL Database Schema

The SQL database structure consists of the following tables:

### Users
- Stores user information synced from Firebase Authentication
- Fields: id (Firebase UID), display_name, email, photo_url, created_at, last_login, is_admin

### Categories
- Stores content categories
- Fields: id, name, slug, description, created_at

### Posts
- Stores blog posts and news articles
- Fields: id, firebase_id, title, slug, content, summary, category_id, author_id, image_url, created_at, updated_at, published_at, is_published, likes, comment_count, view_count

### Comments
- Stores user comments on posts
- Fields: id, firebase_id, post_id, user_id, content, created_at, is_approved

### Tags and Post_Tags
- Provides a tagging system for posts
- Fields: 
  - tags: id, name, slug
  - post_tags: post_id, tag_id (many-to-many relationship)

### Newsletter Related Tables
- newsletter_subscribers: Stores newsletter subscriber information
- newsletter_campaigns: Stores newsletter campaign information
- campaign_tracking: Tracks which subscribers received which campaigns

### Media Library
- Stores information about uploaded media files
- Fields: id, firebase_storage_path, public_url, filename, mime_type, size_bytes, uploaded_by, uploaded_at, alt_text, caption

### User Interactions
- user_likes: Tracks which users liked which posts

### Football Related Tables
- football_teams: Information about football teams
- football_matches: Information about football matches
- football_standings: Current standings in leagues

## Data Synchronization

The application syncs data between Firebase and SQL:

1. When data changes in Firebase, it's synced to the SQL database
2. SQL is used for complex queries, reporting, and analytics
3. Firebase is used for real-time features like comments and user authentication

## How to Use the SQL Database

The application provides several utility functions in the `sqlService.ts` file:

### Syncing Data
- `syncPostToSql`: Syncs a post from Firebase to SQL
- `syncCommentToSql`: Syncs a comment from Firebase to SQL
- `syncUserToSql`: Syncs a user from Firebase to SQL

### Working with Posts and Comments
- `getPosts`: Gets all posts with optional filtering
- `getPostById`: Gets a single post by ID
- `getCommentsForPost`: Gets comments for a specific post

### Newsletter Management
- `addNewsletterSubscriber`: Add or update a newsletter subscriber

### User Interactions
- `recordUserLike`: Record a user liking a post
- `removeUserLike`: Remove a user like from a post

## Environment Variables

To connect to the SQL database, the following environment variables need to be set:

- `VITE_DB_USER`: Database username
- `VITE_DB_HOST`: Database host address
- `VITE_DB_NAME`: Database name
- `VITE_DB_PASSWORD`: Database password
- `VITE_DB_PORT`: Database port (default: 5432)

## Indexing Strategy

The database uses several indexes to improve query performance:

- `idx_posts_category`: Index on posts.category_id
- `idx_posts_author`: Index on posts.author_id
- `idx_comments_post`: Index on comments.post_id
- `idx_comments_user`: Index on comments.user_id
- `idx_newsletter_user`: Index on newsletter_subscribers.user_id

## Future Enhancements

Future database enhancements could include:

1. Full-text search capability
2. More detailed analytics tables
3. User preferences and settings
4. Content caching strategies
