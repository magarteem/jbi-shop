import type { Category, Post, Media } from "@/types";

const BASE_URL = "https://imperia-gbi.ru/wp-json/wp/v2";

async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const query = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
      {} as Record<string, string>
    )
  ).toString();

  const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ""}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`API error: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export async function getCategories(parent?: number): Promise<Category[]> {
  const params: Record<string, string | number> = {
    per_page: 100,
    _fields: "id,name,slug,count,parent,description",
    orderby: "count",
    order: "desc",
  };
  if (parent !== undefined) params.parent = parent;
  return fetchAPI<Category[]>("/categories", params);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await fetchAPI<Category[]>("/categories", {
    slug,
    _fields: "id,name,slug,count,parent,description",
  });
  return cats[0] ?? null;
}

export async function getPosts(options: {
  categoryId?: number;
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<{ posts: Post[]; total: number; pages: number }> {
  const { categoryId, page = 1, perPage = 24, search } = options;
  const params: Record<string, string | number> = {
    per_page: perPage,
    page,
    _fields: "id,title,slug,excerpt,featured_media,categories,date",
    orderby: "title",
    order: "asc",
  };
  if (categoryId) params.categories = categoryId;
  if (search) params.search = search;

  const url = `${BASE_URL}/posts?${new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
      {} as Record<string, string>
    )
  )}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return { posts: [], total: 0, pages: 0 };

  const posts = (await res.json()) as Post[];
  const total = Number(res.headers.get("X-WP-Total") ?? 0);
  const pages = Number(res.headers.get("X-WP-TotalPages") ?? 0);

  return { posts, total, pages };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchAPI<Post[]>("/posts", {
    slug,
    _fields: "id,title,slug,excerpt,content,featured_media,categories,date",
  });
  return posts[0] ?? null;
}

export async function getMedia(id: number): Promise<Media | null> {
  if (!id) return null;
  try {
    return await fetchAPI<Media>(`/media/${id}`, {
      _fields: "id,source_url,alt_text,title",
    });
  } catch {
    return null;
  }
}
