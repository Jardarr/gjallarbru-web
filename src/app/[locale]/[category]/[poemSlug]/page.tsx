import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import onData from "../../../utils/on.json";
import { notFound } from "next/navigation";
import categoryLinksRaw from "../../../utils/categoryLinks.json";
import { pickTitle, type LocalizedTitle } from "../../../utils/localeTitle";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/src/app/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildCreativeWorkJsonLd, getAbsoluteUrl, getCategoryUrl, getHomeBreadcrumbName, getLocalizedPath, getPoemUrl } from "@/src/app/utils/StructuredData";

type Props = {
	params: Promise<{ locale: string; category: string; poemSlug: string }>;
};

const categoryLinks = categoryLinksRaw as Record<string, LocalizedTitle>;

function findPoemBySlug(slug: string) {
	const poems = onData.Poems as Record<string, any>;

	for (const key in poems) {
		if (poems[key].slug === slug) {
			return { key, data: poems[key] };
		}
	}

	return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, poemSlug } = await params;

	const poem = findPoemBySlug(poemSlug);

	if (!poem) {
		return {
			title: locale === "en" ? "Poem not found" : "Стих не найден",
		};
	}

	const t = await getTranslations({
		locale,
		namespace: `Poems.${poem.key}`,
	});

	const title = t("Title");
	const description = t("Description");

	const path = locale === "ru" ? `/${poem.data.category}/${poemSlug}` : `/en/${poem.data.category}/${poemSlug}`;

	const pageUrl = `https://gjallarbru.ru${path}`;

	return {
		title: `Gjallarbru | ${title}`,
		description,
		keywords: [title, locale === "ru" ? "Старшая Эдда" : "Elder Edda", "Gjallarbru"],
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
					url: "/og-logo.png",
					width: 1200,
					height: 630,
					alt: `Gjallarbru | ${title}`,
				},
			],
			locale: locale === "ru" ? "ru_RU" : "en_US",
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: `Gjallarbru | ${title}`,
			description,
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
			canonical: pageUrl,
			languages: {
				ru: `https://gjallarbru.ru/${poem.data.category}/${poemSlug}`,
				en: `https://gjallarbru.ru/en/${poem.data.category}/${poemSlug}`,
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

export default async function PoemPage({ params }: Props) {
	const { locale, poemSlug } = await params;

	const poem = findPoemBySlug(poemSlug);

	if (!poem) {
		notFound();
	}

	const tPoem = await getTranslations({
		locale,
		namespace: `Poems.${poem.key}`,
	});

	const tTitle = await getTranslations({
		locale,
		namespace: "Titles",
	});

	const cat = categoryLinks[poem.data.category];
	const categoryTitle = cat ? pickTitle(locale, cat) : poem.data.category;

	const title = tPoem("Title");
	const description = tPoem("Description");

	const onBlocks = poem.data.Texts || [];
	const onTitle = poem.data.Title || "";

	const translatedBlocksRaw = tPoem.raw("Texts");
	const translatedBlocks = Array.isArray(translatedBlocksRaw) ? translatedBlocksRaw : Object.values(translatedBlocksRaw || {});

	const homePath = getLocalizedPath(locale, "/");
	const homeUrl = getAbsoluteUrl(homePath);
	const categoryPath = getLocalizedPath(locale, `/${poem.data.category}`);
	const appPath = getLocalizedPath(locale, "/app-link");

	const categoryUrl = getCategoryUrl(locale, poem.data.category);
	const poemUrl = getPoemUrl(locale, poem.data.category, poemSlug);

	const breadcrumbJsonLd = buildBreadcrumbJsonLd({
		items: [
			{
				name: getHomeBreadcrumbName(locale),
				url: homeUrl,
			},
			{
				name: categoryTitle,
				url: categoryUrl,
			},
			{
				name: title,
				url: poemUrl,
			},
		],
	});

	const poemJsonLd = buildCreativeWorkJsonLd({
		locale,
		name: title,
		url: poemUrl,
		description,
		categoryName: categoryTitle,
		categoryUrl,
	});

	return (
		<>
			<JsonLd data={[breadcrumbJsonLd, poemJsonLd]} />
			<main className="flex justify-center px-4 pb-12 pt-24 text-sm md:px-6 md:text-base">
				<div className="flex w-full max-w-3xl flex-col rounded-md">
					<span className="hidden text-xs text-muted-foreground sm:flex">
						<Link className="transition-colors hover:text-foreground" href={homePath}>
							Gjallarbru
						</Link>
						&nbsp;/&nbsp;
						<Link className="transition-colors hover:text-foreground" href={categoryPath}>
							{categoryTitle}
						</Link>
						&nbsp;/&nbsp;
						<span className="text-foreground/80">{title}</span>
					</span>

					<div className="my-5 flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
						<span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{tTitle("Poem")}</span>
						<h1 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">{onTitle}</h1>
						<h2 className="text-base text-muted-foreground md:text-lg">{title}</h2>
					</div>

					<div className="flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
						<span
							dangerouslySetInnerHTML={{
								__html: tPoem.raw("Source"),
							}}
							className="text-sm leading-7 text-muted-foreground"
						/>
					</div>

					<div className="my-6 flex w-full items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
						<p className="text-sm text-muted-foreground">Читайте Эдду оффлайн в приложении</p>

						<Link href={appPath} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
							Открыть
							<ChevronRight className="ml-1 inline-block" />
						</Link>
					</div>

					{onBlocks.map((block: any) => {
						const translated = translatedBlocks.find((b: any) => b.id === block.id);

						const linesON = block.linesON || [];
						const linesTranslated = locale === "ru" ? translated?.linesRU || [] : translated?.linesEN || [];

						if (block.type === "stanza") {
							return (
								<div key={block.id} className="mb-6 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm md:p-6">
									<div className="flex justify-center gap-3 md:gap-6">
										{block.number && <div className="w-3 shrink-0 text-sm text-muted-foreground md:text-base">{block.number}</div>}

										<div className="flex gap-4 md:gap-8">
											<div className="w-30 font-serif leading-7 text-foreground sm:w-60">
												{linesON.map((line: string, i: number) => (
													<p key={i}>{line}</p>
												))}
											</div>

											{translated?.number && <div className="w-3 shrink-0 text-sm text-muted-foreground md:text-base">{translated.number}</div>}

											<div className="w-30 leading-7 text-foreground/90 sm:w-60">
												{linesTranslated.map((line: string, i: number) => (
													<p key={i}>{line}</p>
												))}
											</div>
										</div>
									</div>
								</div>
							);
						}

						return (
							<div key={block.id} className="mb-6 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm md:p-6">
								<div className="font-serif text-base leading-7 text-foreground">
									{linesON.map((line: string, i: number) => (
										<p key={i}>{line}</p>
									))}
								</div>

								<div className="mt-6 leading-7 text-foreground/90">
									{linesTranslated.map((line: string, i: number) => (
										<p key={i}>{line}</p>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
}
