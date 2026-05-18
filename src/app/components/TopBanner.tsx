"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import { useEffect, useState } from "react";

export default function TopBanner() {
    const t = useTranslations("TopBanner");
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const isClosed = localStorage.getItem("bannerClosed") === "true";
        setHidden(isClosed);
    }, []);

    const handleClose = () => {
        setHidden(true);
        localStorage.setItem("bannerClosed", "true");
    };

    return (
        <div className={`top-banner ${hidden ? "hidden" : ""} flex bg-card p-4`}>
            <div className="flex-1 flex justify-center">
                <Link href="/app-link" className="hover:opacity-75">
                    📚 {t("Link")}
                </Link>
            </div>

            <button onClick={handleClose} className="close">
                ✕
            </button>
        </div>
    );
}
