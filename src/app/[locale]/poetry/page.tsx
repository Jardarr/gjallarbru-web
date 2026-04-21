import React from "react";
import { poetry } from "./page.utils";
import { Metadata, Viewport } from "next";
import ImageWithSkeleton from "../../../app/components/ImageWithSkeleton";

export const metadata: Metadata = {
    title: "Gjallarbru | Два ворона",
    description:
        "И Одаля столбы приобретали силу Поставленные крепкою рукой А недалече, под лысою горой Пролили Бло́том кровь",
    keywords: ["Elder Edda, Старшая Эдда, Два ворона"],
    authors: [
        { name: "jardarr", url: "https://jardarr-portfolio.vercel.app/" },
    ],
    applicationName: "Gjallarbru | Elder Edda",
    openGraph: {
        title: "Jardarr | Два ворона",
        description:
            "И Одаля столбы приобретали силу Поставленные крепкою рукой А недалече, под лысою горой Пролили Бло́том кровь",
        url: "https://gjallarbru.ru",
        siteName: "Gjallarbru | Elder Edda",
        images: [
            {
                url: "og/og.jpg",
                width: 800,
                height: 600,
                alt: "Gjallarbru | Elder Edda",
            },
        ],
        locale: "ru-RU",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gjallarbru | Два ворона",
        description:
            "И Одаля столбы приобретали силу Поставленные крепкою рукой А недалече, под лысою горой Пролили Бло́том кровь",
        images: ["og/og.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: "https://gjallarbru.ru",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function Poetry() {
    return (
        <main className="flex min-h-screen justify-center px-4 pb-12 pt-28 text-sm md:px-6 md:text-base">
            <div className="flex w-full max-w-2xl flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card px-6 py-8 text-card-foreground shadow-sm md:px-8 md:py-10">
                    <div className="font-serif text-base leading-8 text-foreground md:text-lg">
                        {poetry.map((poem, index) => (
                            <p className="mb-5 last:mb-0" key={index}>
                                {poem.content}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        jardarr
                    </p>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm">
                    <ImageWithSkeleton
                        src="/jonaslaumarkussen.jpg"
                        alt="Изображение Одина скачущего на Слейпнире"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </main>
    );
}
