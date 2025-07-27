-- Create table for featured programs
CREATE TABLE public.featured_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  time_schedule TEXT,
  image_url TEXT,
  category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for social media feeds
CREATE TABLE public.social_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'twitter' or 'video'
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  embed_code TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for social media links (follow us section)
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL, -- 'facebook', 'twitter', 'instagram', etc.
  url TEXT NOT NULL,
  icon_name TEXT, -- lucide icon name
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for radio/TV schedule
CREATE TABLE public.schedule_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week TEXT NOT NULL, -- 'Segunda', 'Terça', etc.
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  program_name TEXT NOT NULL,
  presenter TEXT,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'radio', -- 'radio' or 'tv'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for radio presenters
CREATE TABLE public.radio_presenters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  program TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for newsletter subscribers (migrating from Firebase)
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.featured_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_presenters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing and admin management
CREATE POLICY "Featured programs are viewable by everyone" ON public.featured_programs FOR SELECT USING (true);
CREATE POLICY "Admin can manage featured programs" ON public.featured_programs FOR ALL USING (true);

CREATE POLICY "Social feeds are viewable by everyone" ON public.social_feeds FOR SELECT USING (true);
CREATE POLICY "Admin can manage social feeds" ON public.social_feeds FOR ALL USING (true);

CREATE POLICY "Social links are viewable by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admin can manage social links" ON public.social_links FOR ALL USING (true);

CREATE POLICY "Schedule programs are viewable by everyone" ON public.schedule_programs FOR SELECT USING (true);
CREATE POLICY "Admin can manage schedule programs" ON public.schedule_programs FOR ALL USING (true);

CREATE POLICY "Radio presenters are viewable by everyone" ON public.radio_presenters FOR SELECT USING (true);
CREATE POLICY "Admin can manage radio presenters" ON public.radio_presenters FOR ALL USING (true);

CREATE POLICY "Newsletter subscribers viewable by admin" ON public.newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can manage newsletter subscribers" ON public.newsletter_subscribers FOR ALL USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_featured_programs_updated_at
  BEFORE UPDATE ON public.featured_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_feeds_updated_at
  BEFORE UPDATE ON public.social_feeds
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schedule_programs_updated_at
  BEFORE UPDATE ON public.schedule_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_radio_presenters_updated_at
  BEFORE UPDATE ON public.radio_presenters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();