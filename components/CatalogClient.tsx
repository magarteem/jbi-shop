"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, X, ArrowRight, Package } from "lucide-react";
import type { Category } from "@/types";

const CATEGORY_ICONS: Record<string, string> = {
  "balki-zhelezobetonnye": "🏗️",
  "truby-zhelezobetonnye": "🔩",
  "fundamentnye-bloki-bf": "🧱",
  "fundamentnye-bloki-fbs": "🧱",
  "ventilyacionnye-bloki": "🌀",
  "peremychki-zhb": "📐",
  "lekalnye-bloki": "⬡",
  "kanaly-sbornye": "🔧",
  "stenki-otkosnye-otkrylki": "🏛️",
  "opornye-podushki": "⬛",
  "portalnye-stenki": "🚪",
  "rigeli-opor": "📏",
  "kanaly-neproxodnye": "🔗",
  "kamni-bortovye-br": "🟫",
  "utyazheliteli": "⚓",
  "pristavki-zhelezobetonnye": "🔄",
  "ankernye-plity": "🔒",
  "ankera-zhelezobetonnye": "⚙️",
  "shaxty-lifta": "🛗",
  "stolbiki-signalnye": "🚦",
};

function getCountLabel(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return "категорий";
  if (mod10 === 1) return "категория";
  if (mod10 >= 2 && mod10 <= 4) return "категории";
  return "категорий";
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    '<mark class="bg-yellow-200 rounded-sm not-italic">$1</mark>'
  );
}

export default function CatalogClient({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () => (q ? categories.filter((c) => c.name.toLowerCase().includes(q)) : categories),
    [categories, q]
  );

  const withProducts = filtered.filter((c) => c.count > 0);
  const empty = filtered.filter((c) => c.count === 0);
  const isSearching = q.length > 0;

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <div className="flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 py-3 max-w-xl shadow-sm focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10 transition">
          <Search size={18} className="text-[var(--muted)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по категориям..."
            className="flex-1 text-sm outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)]"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
              aria-label="Очистить"
            >
              <X size={15} />
            </button>
          )}
        </div>
        {isSearching && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            {filtered.length > 0
              ? `Найдено: ${filtered.length} ${getCountLabel(filtered.length)}`
              : "Ничего не найдено"}
          </p>
        )}
      </div>

      {/* No results */}
      {isSearching && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-semibold text-[var(--foreground)] mb-2">
            Категория не найдена
          </h3>
          <p className="text-[var(--muted)] text-sm mb-4">
            По запросу «{query}» ничего не найдено
          </p>
          <button
            onClick={() => setQuery("")}
            className="rounded-xl border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            Сбросить поиск
          </button>
        </div>
      )}

      {/* Categories with products */}
      {withProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Package size={20} className="text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {isSearching ? "Результаты поиска" : "Категории с товарами"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {withProducts.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog/${cat.slug}`}
                className="group bg-white rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-3">
                  {CATEGORY_ICONS[cat.slug] ?? "🔩"}
                </div>
                <h3
                  className="font-semibold text-[var(--foreground)] text-sm leading-snug group-hover:text-[var(--primary)] transition-colors flex-1"
                  dangerouslySetInnerHTML={{ __html: highlight(cat.name, query) }}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[var(--muted)] bg-[var(--background)] rounded-full px-2.5 py-1">
                    {cat.count} {cat.count === 1 ? "товар" : cat.count < 5 ? "товара" : "товаров"}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                {cat.description && !isSearching && (
                  <p className="mt-3 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {cat.description.replace(/<[^>]+>/g, "").slice(0, 100)}...
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other categories */}
      {empty.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              Другие категории
            </h2>
            {!isSearching && (
              <span className="text-sm text-[var(--muted)]">(уточняйте наличие)</span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {empty.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog/${cat.slug}`}
                className="group bg-white rounded-xl p-4 border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl mb-2">
                  {CATEGORY_ICONS[cat.slug] ?? "📦"}
                </div>
                <h3
                  className="font-medium text-[var(--foreground)] text-xs leading-snug group-hover:text-[var(--primary)] transition-colors"
                  dangerouslySetInnerHTML={{ __html: highlight(cat.name, query) }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
