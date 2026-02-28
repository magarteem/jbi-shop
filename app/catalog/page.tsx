import Link from "next/link";
import { ArrowRight, Search, Package } from "lucide-react";
import { getCategories } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог ЖБИ — железобетонные изделия",
  description:
    "Полный каталог железобетонных изделий. Балки, плиты, трубы, фундаментные блоки и многое другое.",
};

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
  if (mod100 >= 11 && mod100 <= 14) return "товаров";
  if (mod10 === 1) return "товар";
  if (mod10 >= 2 && mod10 <= 4) return "товара";
  return "товаров";
}

export default async function CatalogPage() {
  const allCategories = await getCategories(0);
  const categories = allCategories.filter(
    (c) => c.name !== "post" && c.name !== "trash"
  );

  const withProducts = categories.filter((c) => c.count > 0);
  const empty = categories.filter((c) => c.count === 0);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb + Title */}
      <div className="bg-[var(--primary)] text-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-white">Каталог</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Каталог ЖБИ</h1>
          <p className="text-white/60 mt-2">
            {categories.length} категорий · более 80 000 наименований
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Search hint */}
        <div className="flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-5 py-3.5 mb-8 max-w-xl shadow-sm">
          <Search size={18} className="text-[var(--muted)]" />
          <span className="text-[var(--muted)] text-sm">
            Поиск доступен на странице категории...
          </span>
        </div>

        {/* Categories with products */}
        {withProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package size={20} className="text-[var(--accent)]" />
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Категории с товарами
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
                  <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug group-hover:text-[var(--primary)] transition-colors flex-1">
                    {cat.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] rounded-full px-2.5 py-1">
                      {cat.count} {getCountLabel(cat.count)}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  {cat.description && (
                    <p className="mt-3 text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                      {cat.description.replace(/<[^>]+>/g, "").slice(0, 100)}...
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty categories */}
        {empty.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Другие категории
              </h2>
              <span className="text-sm text-[var(--muted)]">
                (уточняйте наличие)
              </span>
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
                  <h3 className="font-medium text-[var(--foreground)] text-xs leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
