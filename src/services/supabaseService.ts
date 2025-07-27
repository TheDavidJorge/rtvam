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

// Featured Programs interface
export interface FeaturedProgram {
  id?: string;
  title: string;
  description?: string;
  time_schedule?: string;
  image_url?: string;
  category?: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

// Social Feeds interface
export interface SocialFeed {
  id?: string;
  type: 'twitter' | 'video';
  title: string;
  url: string;
  embed_code?: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

// Social Links interface
export interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  icon_name?: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

// Schedule Programs interface
export interface ScheduleProgram {
  id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  program_name: string;
  presenter?: string;
  description?: string;
  type: 'radio' | 'tv';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Radio Presenters interface
export interface RadioPresenter {
  id?: string;
  name: string;
  bio?: string;
  photo_url?: string;
  program?: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

// Newsletter Subscriber interface
export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  is_active: boolean;
  subscribed_at?: string;
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

// Featured Programs Service
export const featuredProgramsService = {
  async getAll(): Promise<FeaturedProgram[]> {
    const { data, error } = await supabase
      .from('featured_programs')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getActive(): Promise<FeaturedProgram[]> {
    const { data, error } = await supabase
      .from('featured_programs')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(program: Omit<FeaturedProgram, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('featured_programs')
      .insert(program)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<FeaturedProgram>): Promise<void> {
    const { error } = await supabase
      .from('featured_programs')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('featured_programs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Social Feeds Service
export const socialFeedsService = {
  async getAll(): Promise<SocialFeed[]> {
    const { data, error } = await supabase
      .from('social_feeds')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return (data || []) as SocialFeed[];
  },

  async getActive(): Promise<SocialFeed[]> {
    const { data, error } = await supabase
      .from('social_feeds')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return (data || []) as SocialFeed[];
  },

  async create(feed: Omit<SocialFeed, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('social_feeds')
      .insert(feed)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<SocialFeed>): Promise<void> {
    const { error } = await supabase
      .from('social_feeds')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_feeds')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Social Links Service
export const socialLinksService = {
  async getAll(): Promise<SocialLink[]> {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getActive(): Promise<SocialLink[]> {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('social_links')
      .insert(link)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<SocialLink>): Promise<void> {
    const { error } = await supabase
      .from('social_links')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Schedule Programs Service
export const scheduleProgramsService = {
  async getAll(): Promise<ScheduleProgram[]> {
    const { data, error } = await supabase
      .from('schedule_programs')
      .select('*')
      .order('day_of_week', { ascending: true });
    
    if (error) throw error;
    return (data || []) as ScheduleProgram[];
  },

  async getByType(type: 'radio' | 'tv'): Promise<ScheduleProgram[]> {
    const { data, error } = await supabase
      .from('schedule_programs')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return (data || []) as ScheduleProgram[];
  },

  async getByDayAndType(dayOfWeek: string, type: 'radio' | 'tv'): Promise<ScheduleProgram[]> {
    const { data, error } = await supabase
      .from('schedule_programs')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .eq('type', type)
      .eq('is_active', true)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return (data || []) as ScheduleProgram[];
  },

  async create(program: Omit<ScheduleProgram, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('schedule_programs')
      .insert(program)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<ScheduleProgram>): Promise<void> {
    const { error } = await supabase
      .from('schedule_programs')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('schedule_programs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Radio Presenters Service
export const radioPresentersService = {
  async getAll(): Promise<RadioPresenter[]> {
    const { data, error } = await supabase
      .from('radio_presenters')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getActive(): Promise<RadioPresenter[]> {
    const { data, error } = await supabase
      .from('radio_presenters')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async create(presenter: Omit<RadioPresenter, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('radio_presenters')
      .insert(presenter)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async update(id: string, updates: Partial<RadioPresenter>): Promise<void> {
    const { error } = await supabase
      .from('radio_presenters')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('radio_presenters')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Newsletter Service
export const newsletterService = {
  async getAll(): Promise<NewsletterSubscriber[]> {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async subscribe(email: string, name?: string): Promise<string> {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name: name || '',
        is_active: true
      })
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  },

  async unsubscribe(email: string): Promise<void> {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('email', email);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('newsletter_subscribers')
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