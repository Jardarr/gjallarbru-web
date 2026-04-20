"use client";

import { useEffect, useState } from "react";

export default function Toast() {
    const [render, setRender] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem("home_toast_shown");

        if (!alreadyShown) {
            setRender(true);
            sessionStorage.setItem("home_toast_shown", "true");

            const enterTimer = requestAnimationFrame(() => {
                setVisible(true);
            });

            const hideTimer = window.setTimeout(() => {
                setVisible(false);
            }, 9000);

            const unmountTimer = window.setTimeout(() => {
                setRender(false);
            }, 9300);

            return () => {
                cancelAnimationFrame(enterTimer);
                clearTimeout(hideTimer);
                clearTimeout(unmountTimer);
            };
        }
    }, []);

    if (!render) return null;

    return (
        <div
            className={[
                "fixed left-1/2 top-20 z-50 min-w-80 -translate-x-1/2 rounded-xl border border-border bg-card p-4 text-xs text-card-foreground shadow-sm transition-all duration-300 ease-out sm:bottom-20 sm:left-auto sm:right-4 sm:top-auto sm:translate-x-0 sm:text-sm",
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0",
            ].join(" ")}
        >
            <p className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                Встречайте - Gjallarbru 2.0!
            </p>

            <p className="leading-6 text-muted-foreground">
                Теперь кроме русского языка, добавлены переводы и на английский!
            </p>
        </div>
    );
}
