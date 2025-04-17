
-- Database Schema for RTVAM Web

-- Users Table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY, -- Firebase UID
  display_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Categories Table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(255) UNIQUE, -- Firebase document ID for sync
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  summary TEXT,
  category_id INTEGER REFERENCES categories(id),
  author_id VARCHAR(255) REFERENCES users(id),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  is_published BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0
);

-- Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(255) UNIQUE, -- Firebase document ID for sync
  post_id INTEGER REFERENCES posts(id),
  user_id VARCHAR(255) REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT TRUE
);

-- Tags Table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- Post Tags (Many-to-Many relationship)
CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  user_id VARCHAR(255) REFERENCES users(id),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  confirmation_token VARCHAR(255),
  confirmed_at TIMESTAMP
);

-- Newsletter Campaigns
CREATE TABLE newsletter_campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft',
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0
);

-- Campaign Tracking (which subscriber received which campaign)
CREATE TABLE campaign_tracking (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES newsletter_campaigns(id),
  subscriber_id INTEGER REFERENCES newsletter_subscribers(id),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP
);

-- Media Library
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  firebase_storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL,
  uploaded_by VARCHAR(255) REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  alt_text VARCHAR(255),
  caption TEXT
);

-- User Likes (for tracking which users liked which posts)
CREATE TABLE user_likes (
  user_id VARCHAR(255) REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id)
);

-- Football Teams (for football news and standings)
CREATE TABLE football_teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  short_name VARCHAR(20) NOT NULL,
  logo_url TEXT,
  country VARCHAR(100),
  league VARCHAR(100)
);

-- Football Matches
CREATE TABLE football_matches (
  id SERIAL PRIMARY KEY,
  home_team_id INTEGER REFERENCES football_teams(id),
  away_team_id INTEGER REFERENCES football_teams(id),
  home_score INTEGER,
  away_score INTEGER,
  match_date TIMESTAMP NOT NULL,
  venue VARCHAR(255),
  status VARCHAR(50) DEFAULT 'scheduled',
  league VARCHAR(100),
  season VARCHAR(50)
);

-- Football Standings
CREATE TABLE football_standings (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES football_teams(id),
  league VARCHAR(100) NOT NULL,
  season VARCHAR(50) NOT NULL,
  position INTEGER NOT NULL,
  played INTEGER DEFAULT 0,
  won INTEGER DEFAULT 0,
  drawn INTEGER DEFAULT 0,
  lost INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_newsletter_user ON newsletter_subscribers(user_id);
