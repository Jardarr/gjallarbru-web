import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "../../i18n/routing";
import { useState } from "react";
import { getFullLinks } from "../utils/linksBuilder";
import { usePathname } from "next/navigation";

export default function BurgerMenu() {
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const burgerLinks = getFullLinks(locale);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleLinkClick = () => {
        setIsSheetOpen(false);
    };

    return (
        <nav className="flex items-center md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger
                    onClick={() => setIsSheetOpen(true)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </SheetTrigger>

                <SheetContent className="bg-background text-foreground border-l border-border">
                    <SheetHeader>
                        <SheetTitle className="flex flex-col gap-3 pt-4">
                            {burgerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    aria-label={link.aria}
                                    title={link.aria}
                                    onClick={handleLinkClick}
                                    href={link.href}
                                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
