import type { Metadata, Viewport } from "next";
import { Github } from "lucide-react";
import Link from "next/link";
import SES from "../../components/Ses";
import { getTranslations } from "next-intl/server";
import JsonLd from "../../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildSoftwareApplicationJsonLd, getAppPageUrl, getHomeBreadcrumbName, getHomeUrl } from "../../utils/StructuredData";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Application" });

	const title = t("Title");
	const description = t("Metadata.Description");
	const keywords = t("Metadata.Keywords")
		.split(",")
		.map((kw: string) => kw.trim());
	const alt = t("Metadata.Alt");

	const pageUrl = getAppPageUrl(locale);

	return {
		title: `Gjallarbru | ${title}`,
		description,
		keywords,
		authors: [
			{
				name: "jardarr",
				url: "https://jardarr-portfolio.vercel.app/",
			},
		],
		applicationName: "Gjallarbru | Elder Edda",
		openGraph: {
			title: `Gjallarbru | ${title}`,
			description,
			url: pageUrl,
			siteName: "Gjallarbru | Elder Edda",
			images: [
				{
					url: "/og-app.png",
					width: 1200,
					height: 630,
					alt,
				},
			],
			locale: locale === "ru" ? "ru_RU" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `Gjallarbru | ${title}`,
			description,
			images: ["/og-app.png"],
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
				ru: "https://gjallarbru.ru/app-link",
				en: "https://gjallarbru.ru/en/app-link",
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

export default async function AppPromo({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Application" });

	const title = t("Title");
	const description = t("Metadata.Description");

	const homeUrl = getHomeUrl(locale);
	const appUrl = getAppPageUrl(locale);

	const breadcrumbJsonLd = buildBreadcrumbJsonLd({
		items: [
			{
				name: getHomeBreadcrumbName(locale),
				url: homeUrl,
			},
			{
				name: title,
				url: appUrl,
			},
		],
	});

	const appJsonLd = buildSoftwareApplicationJsonLd({
		name: title,
		url: appUrl,
		description,
		image: "https://gjallarbru.ru/og-app.png",
		downloadUrl: "https://github.com/Jardarr/gjallarbru/releases",
	});

	return (
		<>
			<JsonLd data={[breadcrumbJsonLd, appJsonLd]} />

			<main className="mx-auto mt-4 w-full max-w-4xl px-4 py-12">
				<div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-10">
					<div className="text-center">
						<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("Type")}</p>

						<h1 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">{title}</h1>

						<p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">{t("Description")}</p>
					</div>

					<div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:justify-center">
						<img src="/screenshots/scr-1.jpg" alt={`${title} screenshot 1`} className="h-64 rounded-lg border border-border object-cover" />
						<img src="/screenshots/scr-2.jpg" alt={`${title} screenshot 2`} className="h-64 rounded-lg border border-border object-cover" />
						<img src="/screenshots/scr-3.jpg" alt={`${title} screenshot 3`} className="h-64 rounded-lg border border-border object-cover" />
						<img src="/screenshots/scr-4.jpg" alt={`${title} screenshot 4`} className="h-64 rounded-lg border border-border object-cover" />
						<img src="/screenshots/scr-5.jpg" alt={`${title} screenshot 5`} className="h-64 rounded-lg border border-border object-cover" />
					</div>

					<div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
						<div className="rounded-lg border border-border bg-muted/40 p-4">
							<p className="font-medium text-foreground">{t("Block1.Title")}</p>
							<p className="mt-1 text-muted-foreground">{t("Block1.Description")}</p>
						</div>

						<div className="rounded-lg border border-border bg-muted/40 p-4">
							<p className="font-medium text-foreground">{t("Block2.Title")}</p>
							<p className="mt-1 text-muted-foreground">{t("Block2.Description")}</p>
						</div>

						<div className="rounded-lg border border-border bg-muted/40 p-4">
							<p className="font-medium text-foreground">{t("Block3.Title")}</p>
							<p className="mt-1 text-muted-foreground">{t("Block3.Description")}</p>
						</div>
					</div>

					<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							href="https://github.com/Jardarr/gjallarbru/releases"
							target="_blank"
							className="inline-flex w-full max-w-40 items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 sm:w-auto">
							{t("Download")}
						</Link>

						<Link
							href="https://github.com/Jardarr/gjallarbru"
							target="_blank"
							className="inline-flex w-full max-w-40 items-center justify-center rounded-md border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto">
							GitHub
							<Github className="ml-2 h-4 w-4" />
						</Link>
					</div>

					<p className="mt-4 text-center text-xs text-muted-foreground">{t("Footer")}</p>

					<div className="mt-8 flex items-center justify-center">
						<SES />
					</div>
				</div>
			</main>
		</>
	);
}
