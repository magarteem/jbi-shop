import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] font-bold text-white text-lg">
                ЖБИ
              </div>
              <div>
                <div className="font-bold text-lg">Империя ЖБИ</div>
                <div className="text-white/50 text-xs">Железобетонные изделия</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Производство и поставка железобетонных изделий. Работаем с 2005
              года, более 80 000 наименований продукции.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold text-base mb-4">Каталог</h3>
            <ul className="space-y-2">
              {[
                "Балки железобетонные",
                "Плиты перекрытия",
                "Фундаментные блоки",
                "Трубы железобетонные",
                "Вентиляционные блоки",
                "Перемычки",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/catalog"
                    className="text-white/60 hover:text-[var(--accent)] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base mb-4">Компания</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Главная" },
                { href: "/catalog", label: "Каталог товаров" },
                { href: "/#about", label: "О компании" },
                { href: "/#contacts", label: "Контакты" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[var(--accent)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-base mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+78002000000"
                  className="flex items-start gap-2 text-white/60 hover:text-[var(--accent)] text-sm transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  8 (800) 200-00-00 (бесплатно)
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@imperia-gbi.ru"
                  className="flex items-start gap-2 text-white/60 hover:text-[var(--accent)] text-sm transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  info@imperia-gbi.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                Санкт-Петербург, Россия
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <Clock size={15} className="mt-0.5 shrink-0" />
                Пн–Пт: 9:00–18:00
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © 2025 Империя ЖБИ. Все права защищены.
          </p>
          <p className="text-white/30 text-xs">
            Информация на сайте носит ознакомительный характер и не является
            публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
}
