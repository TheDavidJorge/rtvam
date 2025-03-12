
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  url: string;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  news: NewsItem[];
}
