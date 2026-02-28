import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight, Package, Phone } from "lucide-react";
import { getCategoryBySlug, getCategories, getPosts } from "@/lib/api";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Категория не найдена" };
  return {
    title: `${category.name} — каталог ЖБИ`,
    description: `Купить ${category.name} по выгодным ценам. ${category.count} наименований в наличии.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam, q } = await searchParams;

  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const currentPage = Math.max(1, Number(pageParam ?? 1));
  const perPage = 24;

  const { posts, total, pages } = await getPosts({
    categoryId: category.id,
    page: currentPage,
    perPage,
    search: q,
  });

  // Subcategories
  const subcategories = allCategories.filter((c) => c.parent === category.id);

  // Parent breadcrumb
  const parent = category.parent
    ? allCategories.find((c) => c.id === category.parent)
    : null;

  const description = category.description
    ? category.description.replace(/<[^>]+>/g, "").trim()
    : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-3 flex-wrap">
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
            <span className="text-white">{category.name}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
          {total > 0 && (
            <p className="text-white/60 mt-2">
              {total} {getCountLabel(total)}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Description */}
        {description && (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-8">
            <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        )}

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
              Подкатегории
            </h2>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/catalog/${sub.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {sub.name}
                  {sub.count > 0 && (
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] rounded-full px-1.5 py-0.5">
                      {sub.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <Suspense>
            <SearchInput placeholder="Поиск по названию..." />
          </Suspense>
        </div>

        {/* Products grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {posts.map((post) => (
                <ProductCard
                  key={post.id}
                  post={post}
                  categorySlug={slug}
                />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/catalog/${slug}?page=${currentPage - 1}${q ? `&q=${q}` : ""}`}
                    className="rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium hover:border-[var(--primary)] transition-colors"
                  >
                    ← Назад
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                    const p = i + 1;
                    return (
                      <Link
                        key={p}
                        href={`/catalog/${slug}?page=${p}${q ? `&q=${q}` : ""}`}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${p === currentPage
                          ? "bg-[var(--primary)] text-white"
                          : "border border-[var(--border)] bg-white hover:border-[var(--primary)] text-[var(--foreground)]"
                          }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
                {currentPage < pages && (
                  <Link
                    href={`/catalog/${slug}?page=${currentPage + 1}${q ? `&q=${q}` : ""}`}
                    className="rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium hover:border-[var(--primary)] transition-colors"
                  >
                    Вперёд →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-12 text-center">
            <Package size={48} className="mx-auto text-[var(--muted)] opacity-40 mb-4" />
            <h3 className="font-semibold text-[var(--foreground)] mb-2">
              Товары не найдены
            </h3>
            <p className="text-[var(--muted)] text-sm mb-6">
              {q
                ? `По запросу «${q}» ничего не найдено.`
                : "В данной категории товары пока не добавлены."}
            </p>
            <a
              href="/#contacts"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Phone size={16} />
              Запросить наличие
            </a>
          </div>
        )}
      </div>

      {/* Request CTA */}
      <div className="bg-[var(--primary)]/5 border-t border-[var(--border)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Нужна помощь в выборе или расчёт стоимости?
          </h2>
          <p className="text-[var(--muted)] text-sm mb-4">
            Свяжитесь с нашим менеджером — подберём нужные изделия и подготовим
            КП
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="tel:+78002000000"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white text-sm hover:bg-[var(--primary-dark)] transition-colors"
            >
              <Phone size={16} />
              8 (800) 200-00-00
            </a>
            <Link
              href="/#contacts"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary)] text-sm hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCountLabel(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return "товаров";
  if (mod10 === 1) return "товар";
  if (mod10 >= 2 && mod10 <= 4) return "товара";
  return "товаров";
}
