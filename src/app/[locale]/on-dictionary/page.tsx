import SearchInDict from "../../components/SearchInDict";
import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Gjallarbru | Словарь",
    description:
        "Словарь древнескандинавского языка. Онлайн-версия классического древнескандинавского/древнеисландского словаря Ричарда Клисби и Гудбранда Вигфуссона",
    keywords: ["Elder Edda, Старшая Эдда, Словарь"],
    authors: [
        { name: "jardarr", url: "https://jardarr-portfolio.vercel.app/" },
    ],
    applicationName: "Gjallarbru | Elder Edda",
    openGraph: {
        title: "Jardarr | Словарь",
        description:
            "Словарь древнескандинавского языка. Онлайн-версия классического древнескандинавского/древнеисландского словаря Ричарда Клисби и Гудбранда Вигфуссона",
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
        title: "Gjallarbru | Словарь",
        description:
            "Словарь древнескандинавского языка. Онлайн-версия классического древнескандинавского/древнеисландского словаря Ричарда Клисби и Гудбранда Вигфуссона",
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

export default async function Home() {
    const t = await getTranslations("Dictionary");

    return (
        <main className="flex min-h-screen justify-center px-4 pt-24 pb-12 text-sm md:px-6 md:text-base">
            <div className="flex w-full max-w-2xl flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card p-6 text-center text-card-foreground shadow-sm md:p-8">
                    <h1 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
                        Cleasby & Vigfusson Old Norse dictionary
                    </h1>

                    <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                        {t("Description")}
                    </p>
                </div>

                <div className="mt-8 w-full">
                    <SearchInDict />
                </div>
            </div>
        </main>
    );
}
