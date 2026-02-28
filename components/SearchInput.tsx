"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Поиск по названию...",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const updateQuery = useCallback(
    (val: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set("q", val);
      } else {
        params.delete("q");
      }
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => updateQuery(value), 100);
    return () => clearTimeout(timer);
  }, [value, updateQuery]);

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 py-3 max-w-md shadow-sm focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10 transition">
      <Search size={18} className="text-[var(--muted)] shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)]"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Очистить"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
