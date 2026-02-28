import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Phone, FileText, CheckCircle, Truck, Shield } from "lucide-react";
import { getPostBySlug, getCategoryBySlug, getCategories, getMedia, getPosts } from "@/lib/api";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const post = await getPostBySlug(productSlug);
  if (!post) return { title: "Товар не найден" };
  return {
    title: `${post.title.rendered} — ЖБИ`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim().slice(0, 160),
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;

  const [post, category, allCategories] = await Promise.all([
    getPostBySlug(productSlug),
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!post || !category) notFound();

  const media = post.featured_media ? await getMedia(post.featured_media) : null;

  // Related products
  const { posts: related } = await getPosts({
    categoryId: category.id,
    perPage: 6,
  });
  const relatedFiltered = related.filter((p) => p.id !== post.id).slice(0, 4);

  const parent = category.parent
    ? allCategories.find((c) => c.id === category.parent)
    : null;

  const content = post.content.rendered;
  const cleanContent = stripHtml(content);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[var(--primary)] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-1.5 text-white/50 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <ChevronRight size={12} />
            <Link href="/catalog" className="hover:text-white transition-colors">
              Каталог
            </Link>
            {parent && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/catalog/${parent.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {parent.name}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <Link
              href={`/catalog/${slug}`}
              className="hover:text-white transition-colors"
            >
              {category.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white truncate max-w-xs">
              {post.title.rendered}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10">
              {media?.source_url ? (
                <Image
                  src={media.source_url}
                  alt={media.alt_text || post.title.rendered}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-[var(--primary)]/20 p-12">
                  <FileText size={80} />
                  <span className="text-sm font-semibold uppercase tracking-widest">
                    Изображение уточняется
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 flex-1">
              {/* Category badge */}
              <Link
                href={`/catalog/${slug}`}
                className="inline-flex items-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 text-xs font-medium mb-4 hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                {category.name}
              </Link>

              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
                {post.title.rendered}
              </h1>

              {cleanContent && (
                <div className="text-[var(--muted)] text-sm leading-relaxed mb-6 border-l-2 border-[var(--accent)] pl-4">
                  {cleanContent}
                </div>
              )}

              {/* Price block */}
              <div className="bg-[var(--background)] rounded-xl p-4 mb-6">
                <div className="text-xs text-[var(--muted)] mb-1">Цена</div>
                <div className="text-2xl font-bold text-[var(--primary)]">
                  По запросу
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  Уточните стоимость у менеджера
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {[
                  { icon: Shield, text: "Соответствует ГОСТ" },
                  { icon: Truck, text: "Доставка по всей России" },
                  { icon: CheckCircle, text: "Сертификат качества" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 text-sm text-[var(--muted)]"
                  >
                    <item.icon
                      size={15}
                      className="text-[var(--accent)] shrink-0"
                    />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <a
                  href="/#contacts"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Запросить цену
                </a>
                <a
                  href="tel:+78002000000"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--primary)] px-5 py-3 font-semibold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedFiltered.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
              Другие изделия в категории
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedFiltered.map((p) => (
                <Link
                  key={p.id}
                  href={`/catalog/${slug}/${p.slug}`}
                  className="group bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all p-4"
                >
                  <div className="h-28 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-3">
                    <FileText size={32} className="text-[var(--primary)]/20" />
                  </div>
                  <h3 className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {p.title.rendered}
                  </h3>
                  <div className="mt-2 text-xs text-[var(--accent)] font-medium">
                    По запросу →
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/catalog/${slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                Все изделия в категории «{category.name}»
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
