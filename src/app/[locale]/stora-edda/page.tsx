import React from "react";
import Link from "next/link";
import { Metadata, Viewport } from "next";
import ImageWithSkeleton from "../../../app/components/ImageWithSkeleton";

export const metadata: Metadata = {
    title: "Gjallarbru | Большая Эдда",
    description:
        "Эта книга является попыткой собрать под одной обложкой как можно большее число важнейших древних текстов, связанных с германо-скандинавской мифологией. ",
    keywords: ["Elder Edda, Старшая Эдда, Большая Эдда"],
    authors: [
        { name: "jardarr", url: "https://jardarr-portfolio.vercel.app/" },
    ],
    applicationName: "Gjallarbru | Elder Edda",
    openGraph: {
        title: "Gjallarbru | Большая Эдда",
        description: "v",
        url: "https://gjallarbru.ru",
        siteName: "Gjallarbru | Elder Edda",
        images: [
            {
                url: "/og-logo.png",
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
        title: "Gjallarbru | Большая Эдда",
        description:
            "Эта книга является попыткой собрать под одной обложкой как можно большее число важнейших древних текстов, связанных с германо-скандинавской мифологией. ",
        images: ["/og-logo.png"],
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

export default function StoraEdda() {
    return (
        <main className="flex min-h-screen justify-center px-4 pb-12 pt-24 text-sm md:px-6 md:text-base">
            <div className="flex w-full max-w-2xl flex-col justify-center rounded-md py-4">
                <div className="mb-8 text-center">
                    <h1 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
                        Stóra Edda
                    </h1>
                    <h2 className="mt-2 text-lg text-muted-foreground md:text-xl">
                        Большая Эдда
                    </h2>
                </div>

                <div className="flex flex-col items-center">
                    <div className="overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm">
                        <ImageWithSkeleton
                            width={300}
                            height={400}
                            src="/stora-edda.png"
                            alt="Stóra Edda"
                        />
                    </div>

                    <div className="mt-6 w-full rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
                        <p className="mb-3 leading-7 text-foreground/90">
                            Лучшее на данный момент русскоязычное издание за
                            авторством Eyvar Tjörvason
                        </p>

                        <p className="mb-4 leading-7 text-muted-foreground">
                            Вот что говорит автор сборника о своём труде:
                        </p>

                        <p className="rounded-lg border border-border bg-muted p-4 italic leading-7 text-foreground/90">
                            &quot;Эта книга является попыткой собрать под одной
                            обложкой как можно большее число важнейших древних
                            текстов, связанных с германо-скандинавской
                            мифологией. Очередной попыткой — т. к.
                            многочисленные исландские манускрипты XIII—XIX вв.,
                            вмещавшие в себя похожие наборы текстов, являлись её
                            идейными предтечами. И первой попыткой — на русском
                            языке&quot;.
                        </p>
                    </div>

                    <button className="mt-6 rounded-md border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                        <Link
                            href="https://drive.google.com/file/d/17G-EKf-ZNxHwrE-l-HRunFETvLExbLIY/view?usp=drive_link"
                            target="_blank"
                        >
                            Stóra Edda
                        </Link>
                    </button>
                </div>
            </div>
        </main>
    );
}
