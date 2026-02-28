import Link from "next/link";
import Image from "next/image";
import { FileText, Phone } from "lucide-react";
import { getMedia } from "@/lib/api";
import type { Post } from "@/types";

interface Props {
  post: Post;
  categorySlug: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

export default async function ProductCard({ post, categorySlug }: Props) {
  const media = post.featured_media ? await getMedia(post.featured_media) : null;
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 120);

  return (
    <div className="group bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <Link href={`/catalog/${categorySlug}/${post.slug}`}>
        <div className="relative h-44 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 flex items-center justify-center overflow-hidden">
          {media?.source_url ? (
            <Image
              src={media.source_url}
              alt={media.alt_text || post.title.rendered}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--primary)]/30">
              <FileText size={40} />
              <span className="text-xs font-medium">ЖБИ</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/catalog/${categorySlug}/${post.slug}`}
          className="font-semibold text-[var(--foreground)] text-sm leading-snug hover:text-[var(--primary)] transition-colors mb-2 line-clamp-2"
        >
          {post.title.rendered}
        </Link>

        {excerpt && (
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs text-[var(--muted)]">Цена</div>
              <div className="font-bold text-[var(--primary)] text-sm">
                По запросу
              </div>
            </div>
            <div className="flex gap-1.5">
              <Link
                href={`/catalog/${categorySlug}/${post.slug}`}
                className="rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                Подробнее
              </Link>
              <a
                href="/#contacts"
                className="rounded-lg bg-[var(--accent)] text-white px-3 py-1.5 text-xs font-medium hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-1"
              >
                <Phone size={11} />
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
