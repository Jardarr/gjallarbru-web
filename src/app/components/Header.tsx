"use client";

import { Link } from "../../i18n/routing";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import BurgerMenu from "./BurgerMenu";
import { getHeaderLinks } from "../utils/linksBuilder";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function Header() {
    const pathname = usePathname();
    const locale = useLocale();
    const headerLinks = getHeaderLinks(locale);

    return (
        <header className="absolute inset-x-0 top-0 z-50 w-full border-b border-border/50 bg-background/70 px-4 py-2 backdrop-blur-md md:px-24">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/gold-bridge.png"
                            alt="Gjallarbru"
                            width={50}
                            height={30}
                        />
                    </Link>
                </div>

                <nav className="flex items-center">
                    <div className="hidden md:flex md:items-center md:gap-4">
                        {headerLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                pathname.startsWith(`${link.href}/`);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-label={link.aria}
                                    title={link.aria}
                                    className={[
                                        "group relative px-1 py-1 text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground",
                                    ].join(" ")}
                                >
                                    {link.text}

                                    <span
                                        className={[
                                            "absolute left-0 -bottom-1 h-px w-full bg-current transition-opacity",
                                            isActive
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100",
                                        ].join(" ")}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mx-4 flex items-center gap-2">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                    </div>

                    <BurgerMenu />
                </nav>
            </div>
        </header>
    );
}
