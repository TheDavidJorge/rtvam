
import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  author: string | {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  likes: number;
  comments: number;
  status?: 'published' | 'draft';
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

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  createdAt: Timestamp | null;
  active: boolean;
}
