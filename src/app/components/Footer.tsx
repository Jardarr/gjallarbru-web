"use client";

import { Send } from "lucide-react";
import { Link } from "../../i18n/routing";
import { getFullLinks } from "../utils/linksBuilder";
import Copyright from "./Copyright";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function Footer() {
    const pathname = usePathname();
    const locale = useLocale();
    const footerLinks = getFullLinks(locale);

    return (
        <footer className="flex flex-col gap-6 border-border text-xs text-muted-foreground md:text-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center lg:items-start">
                <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start mb-2">
                    {footerLinks.map((link, index) => (
                        <Link
                            key={index}
                            aria-label={link.aria}
                            title={link.aria}
                            translate="no"
                            href={link.href}
                            className="transition-colors hover:text-foreground"
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>

                <Copyright />
            </div>

            <div className="flex w-full items-center justify-center lg:w-auto lg:justify-end">
                <Link
                    rel="noopener noreferrer"
                    href="https://t.me/jardarr"
                    className="inline-flex items-center justify-center rounded-md border border-border p-2 transition-colors hover:bg-muted hover:text-foreground"
                >
                    <Send className="h-4 w-4" />
                </Link>
            </div>
        </footer>
    );
}
