"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/#about", label: "О компании" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--primary)] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] font-bold text-white text-lg shadow-md group-hover:bg-[var(--accent-hover)] transition-colors">
              ЖБИ
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">
                Империя ЖБИ
              </div>
              <div className="text-white/60 text-xs">
                Железобетонные изделия
              </div>
            </div>
          </Link>

          {/* Phone */}
          <a
            href="tel:+78002000000"
            className="hidden md:flex items-center gap-2 text-white hover:text-[var(--accent)] transition-colors"
          >
            <Phone size={18} />
            <div>
              <div className="font-semibold text-base">8 (800) 200-00-00</div>
              <div className="text-white/60 text-xs">Звонок бесплатный</div>
            </div>
          </a>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#contacts"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors shadow"
            >
              Получить прайс
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {link.label}
              {link.label === "Каталог" && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--primary-dark)] border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+78002000000"
              className="flex items-center gap-2 px-4 py-3 text-white"
            >
              <Phone size={16} />
              <span className="font-semibold">8 (800) 200-00-00</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
