import Link from "next/link";
import { getCategories } from "@/lib/api";
import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог ЖБИ — железобетонные изделия",
  description:
    "Полный каталог железобетонных изделий. Балки, плиты, трубы, фундаментные блоки и многое другое.",
};

export default async function CatalogPage() {
  const allCategories = await getCategories(0);
  const categories = allCategories.filter(
    (c) => c.name !== "post" && c.name !== "trash"
  );

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
        <CatalogClient categories={categories} />
      </div>
    </div>
  );
}
