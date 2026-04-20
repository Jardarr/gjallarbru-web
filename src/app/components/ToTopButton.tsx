"use client";
import { useState, useEffect } from "react";
import { ArrowUpToLine } from "lucide-react";

export default function ToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            id="scrollToTopButton"
            onClick={scrollToTop}
            className={[
                "fixed bottom-10 right-5 z-50",
                "inline-flex items-center justify-center",
                "rounded-md border border-border bg-card p-2",
                "text-muted-foreground transition-all",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 translate-y-2",
            ].join(" ")}
        >
            <ArrowUpToLine className="h-4 w-4" />
        </button>
    );
}
