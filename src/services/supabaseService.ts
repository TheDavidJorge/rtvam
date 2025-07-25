import { supabase } from '@/integrations/supabase/client';

export interface Post {
  id?: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  author_id?: string;
  author_name?: string;
  author_photo?: string;
  likes: number;
  comments_count: number;
  status?: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id?: string;
  post_id: string;
  content: string;
  author_id?: string;
  author_name: string;
  author_photo?: string;
  created_at?: string;
}

export interface RadioTvSettings {
  id?: string;
  type: 'radio' | 'tv';
  name: string;
  stream_url?: string;
  logo_url?: string;
  description?: string;
  frequency?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SlideData {
  id?: string;
  title: string;
  description?: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Posts Service
export const postsService = {
  async getAll(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Post[];
  },

  async getByCategory(category: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Post[];
  },

  async getById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Post;
  },

  async create(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes' | 'comments_count'>): Promise<string> {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...post,
        likes: 0,
        comments_count: 0
      })
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<Post>): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async like(id: string): Promise<void> {
    const { data: currentPost } = await supabase
      .from('posts')
      .select('likes')
      .eq('id', id)
      .single();
    
    if (currentPost) {
      const { error } = await supabase
        .from('posts')
        .update({ likes: currentPost.likes + 1 })
        .eq('id', id);
      if (error) throw error;
    }
  }
};

// Comments Service
export const commentsService = {
  async getByPostId(postId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(comment: Omit<Comment, 'id' | 'created_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Radio/TV Settings Service
export const radioTvService = {
  async getAll(): Promise<RadioTvSettings[]> {
    const { data, error } = await supabase
      .from('radio_tv_settings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as RadioTvSettings[];
  },

  async getByType(type: 'radio' | 'tv'): Promise<RadioTvSettings[]> {
    const { data, error } = await supabase
      .from('radio_tv_settings')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as RadioTvSettings[];
  },

  async create(settings: Omit<RadioTvSettings, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('radio_tv_settings')
      .insert(settings)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<RadioTvSettings>): Promise<void> {
    const { error } = await supabase
      .from('radio_tv_settings')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Slides Service
export const slidesService = {
  async getAll(): Promise<SlideData[]> {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getActive(): Promise<SlideData[]> {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(slide: Omit<SlideData, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('slides')
      .insert(slide)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<SlideData>): Promise<void> {
    const { error } = await supabase
      .from('slides')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('slides')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Storage Service
export const storageService = {
  async uploadImage(file: File, folder: string = 'posts'): Promise<string> {
    const fileName = `${folder}/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  },

  async deleteImage(url: string): Promise<void> {
    const fileName = url.split('/').pop();
    if (!fileName) return;
    
    const { error } = await supabase.storage
      .from('images')
      .remove([fileName]);
    
    if (error) throw error;
  }
};