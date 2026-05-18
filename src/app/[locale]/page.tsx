import { Metadata, Viewport } from "next";
import Hero from "../components/Hero";
import { getTranslations } from "next-intl/server";
import Toast from "../components/Toast";
import JsonLd from "../components/seo/JsonLd";
import { buildOrganizationJsonLd, buildWebsiteJsonLd, getHomeUrl } from "../utils/StructuredData";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;

	const t = await getTranslations({
		locale,
		namespace: "HomePage.Metadata",
	});

	const title = t("title");
	const description = t("description");

	const path = locale === "ru" ? "/" : "/en";
	const pageUrl = `https://gjallarbru.ru${path === "/" ? "" : path}`;

	return {
		title,
		description,
		keywords: ["Elder Edda", "Старшая Эдда", "Gjallarbru", "Old Norse", "древнескандинавский"],
		authors: [
			{
				name: "jardarr",
				url: "https://jardarr-portfolio.vercel.app/",
			},
		],
		applicationName: "Gjallarbru | Elder Edda",

		openGraph: {
			title,
			description,
			url: pageUrl,
			siteName: "Gjallarbru | Elder Edda",
			images: [
				{
					url: "og/og.jpg",
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: locale === "ru" ? "ru_RU" : "en_US",
			type: "website",
		},

		twitter: {
			card: "summary_large_image",
			title,
			description,
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
			canonical: pageUrl,
			languages: {
				ru: "https://gjallarbru.ru",
				en: "https://gjallarbru.ru/en",
			},
		},
	};
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
	const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "HomePage",
    });
    const homeUrl = getHomeUrl(locale);
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd({
        locale,
        name: "Gjallarbru | Elder Edda",
        url: homeUrl,
        searchUrlTemplate: "https://gjallarbru.ru/dictionary?query={search_term_string}",
    });
	return (
		<main>
            <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
			<Hero />
			<section className="w-full bg-background px-6 py-16 md:py-24">
				<div className="flex flex-col items-center mx-auto max-w-3xl text-center">
					<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t("Greeting.eyebrow")}</p>
					<h1 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl hidden">Gjallarbru</h1>
					<Image src="/gold-bridge.png" alt="Gjallarbru logo" width={300} height={300} className="my-8"/>
					<p className="mt-6 text-lg leading-8 text-foreground md:text-xl">{t("Greeting.lead")}</p>
					<p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{t("Greeting.body")}</p>
					<p className="mt-10 font-serif text-xl italic text-foreground/85 md:text-2xl">{t("Greeting.closing")}</p>
				</div>
			</section>
			<Toast />
		</main>
	);
}
