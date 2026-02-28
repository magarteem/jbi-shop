import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Truck,
  Award,
  Phone,
  CheckCircle,
  Factory,
  Package,
  Clock,
} from "lucide-react";
import { getCategories } from "@/lib/api";

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
};

const features = [
  {
    icon: Factory,
    title: "Собственное производство",
    description:
      "Производим изделия на собственных заводах по всей России, соблюдая все ГОСТы и нормативы.",
  },
  {
    icon: Package,
    title: "80 000+ наименований",
    description:
      "Огромный каталог ЖБИ для любых строительных задач — от типовых до нестандартных изделий.",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description:
      "Развитая логистическая сеть обеспечивает оперативную доставку на любые объекты страны.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description:
      "Вся продукция сертифицирована и проходит строгий контроль качества на каждом этапе производства.",
  },
  {
    icon: Award,
    title: "20+ лет на рынке",
    description:
      "Богатый опыт и тысячи реализованных проектов гарантируют надёжность нашей продукции.",
  },
  {
    icon: Clock,
    title: "Быстрое оформление",
    description:
      "Оперативно рассмотрим вашу заявку и подготовим коммерческое предложение в течение 1 часа.",
  },
];

const stats = [
  { value: "80 000+", label: "Наименований продукции" },
  { value: "20+", label: "Лет на рынке" },
  { value: "17", label: "Производств по России" },
  { value: "10 000+", label: "Заказчиков" },
];

export default async function HomePage() {
  const allCategories = await getCategories(0);
  const topCategories = allCategories
    .filter((c) => c.count > 0 && c.name !== "Новости" && c.name !== "post" && c.name !== "trash")
    .slice(0, 12);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--primary)] text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 px-4 py-1.5 text-sm text-[var(--accent)] font-medium mb-6">
              <CheckCircle size={14} />
              Соответствие ГОСТ и нормативам РФ
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Железобетонные изделия{" "}
              <span className="text-[var(--accent)]">от производителя</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
              Производим и поставляем ЖБИ для промышленного, гражданского и
              дорожного строительства. Более 80 000 наименований изделий,
              доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-orange-900/30"
              >
                Смотреть каталог
                <ArrowRight size={18} />
              </Link>
              <a
                href="/#contacts"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-7 py-3.5 font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <Phone size={18} />
                Получить прайс
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-[var(--primary-dark)]/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[var(--accent)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[var(--accent)] font-semibold text-sm mb-2 uppercase tracking-wide">
                Продукция
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                Каталог ЖБИ
              </h2>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-3 transition-all text-sm"
            >
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog/${cat.slug}`}
                className="group relative bg-white rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl hover:shadow-orange-100 transition-all duration-300"
              >
                <div className="text-4xl mb-3">
                  {CATEGORY_ICONS[cat.slug] ?? "🔩"}
                </div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-2 text-xs text-[var(--muted)]">
                  {cat.count} {getCountLabel(cat.count)}
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-[var(--accent)]" />
                </div>
              </Link>
            ))}

            {/* View all card */}
            <Link
              href="/catalog"
              className="group bg-[var(--primary)] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-[var(--primary-dark)] transition-colors"
            >
              <div className="text-3xl mb-3">📦</div>
              <div className="font-semibold text-white text-sm">
                Весь каталог
              </div>
              <div className="text-white/60 text-xs mt-1">
                80 000+ наименований
              </div>
              <ArrowRight
                size={18}
                className="text-[var(--accent)] mt-3 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-[var(--border)] py-3 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-[var(--accent)] font-semibold text-sm mb-2 uppercase tracking-wide">
              Преимущества
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                  <f.icon size={24} />
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">
                  {f.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contacts */}
      <section
        className="py-16 md:py-20 bg-[var(--primary)] text-white"
        id="contacts"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[var(--accent)] font-semibold text-sm mb-2 uppercase tracking-wide">
                Контакты
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Запросите прайс или проконсультируйтесь
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Оставьте заявку — наш менеджер свяжется с вами в течение 1 часа
                и подготовит индивидуальное коммерческое предложение.
              </p>
              <div className="space-y-3">
                {[
                  "Расчёт стоимости бесплатно",
                  "Доставка по всей России",
                  "Работаем с юридическими лицами и ИП",
                  "Соответствие ГОСТ и ТУ",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle size={16} className="text-[var(--accent)] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-8 text-[var(--foreground)]">
              <h3 className="font-bold text-xl mb-6">Оставить заявку</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-1.5">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-1.5">
                    Комментарий / список изделий
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Укажите нужные изделия или задайте вопрос..."
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-[var(--muted)] text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных
                  данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
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
