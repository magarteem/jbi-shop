export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
  description: string;
}

export interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  date: string;
}

export interface Media {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
}
