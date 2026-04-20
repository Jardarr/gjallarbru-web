"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleChange = (nextLocale: string) => {
        const safePathname = pathname ?? "/";
        router.push(safePathname, { locale: nextLocale, scroll: false });
    };

    return (
        <button
            type="button"
            aria-label="Переключить язык"
            value={locale}
            onClick={() => handleChange(locale === "ru" ? "en" : "ru")}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {locale === "ru" ? "EN" : "RU"}
        </button>
    );
}
