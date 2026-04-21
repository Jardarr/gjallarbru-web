type BreadcrumbItem = {
	name: string;
	url: string;
};

type BuildOrganizationParams = {
	name?: string;
	url?: string;
	logo?: string;
	sameAs?: string[];
};

type BuildWebsiteParams = {
	locale: string;
	name: string;
	url: string;
	searchUrlTemplate?: string;
};

type BuildBreadcrumbParams = {
	items: BreadcrumbItem[];
};

type BuildCollectionPageParams = {
	locale: string;
	name: string;
	url: string;
	description: string;
};

type BuildCreativeWorkParams = {
	locale: string;
	name: string;
	url: string;
	description: string;
	categoryName?: string;
	categoryUrl?: string;
	image?: string;
};

type BuildSoftwareApplicationParams = {
	name: string;
	url: string;
	description: string;
	image: string;
	downloadUrl: string;
	operatingSystem?: string;
	applicationCategory?: string;
	isFree?: boolean;
	priceCurrency?: string;
};

const SITE_URL = "https://gjallarbru.ru";
const SITE_NAME = "Gjallarbru | Elder Edda";
const DEFAULT_LOGO = `${SITE_URL}/thmr.svg`;

export function getLocalizedPath(locale: string, path: string) {
	if (locale === "ru") {
		return path;
	}

	return `/${locale}${path}`;
}

export function getAbsoluteUrl(path: string) {
	if (!path || path === "/") {
		return SITE_URL;
	}

	return `${SITE_URL}${path}`;
}

export function getHomeUrl(locale: string) {
	return locale === "ru" ? SITE_URL : `${SITE_URL}/en`;
}

export function getCategoryUrl(locale: string, category: string) {
	return getAbsoluteUrl(getLocalizedPath(locale, `/${category}`));
}

export function getPoemUrl(locale: string, category: string, poemSlug: string) {
	return getAbsoluteUrl(getLocalizedPath(locale, `/${category}/${poemSlug}`));
}

export function getAppPageUrl(locale: string) {
	return getAbsoluteUrl(getLocalizedPath(locale, "/app-link"));
}

export function buildOrganizationJsonLd({
	name = "Gjallarbru",
	url = SITE_URL,
	logo = DEFAULT_LOGO,
	sameAs = ["https://github.com/Jardarr/gjallarbru", "https://jardarr-portfolio.vercel.app/"],
}: BuildOrganizationParams = {}) {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url,
		logo,
		sameAs,
	};
}

export function buildWebsiteJsonLd({ locale, name, url, searchUrlTemplate }: BuildWebsiteParams) {
	const base = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		url,
		inLanguage: locale,
	} as Record<string, unknown>;

	if (searchUrlTemplate) {
		base.potentialAction = {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: searchUrlTemplate,
			},
			"query-input": "required name=search_term_string",
		};
	}

	return base;
}

export function buildBreadcrumbJsonLd({ items }: BuildBreadcrumbParams) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function buildCollectionPageJsonLd({ locale, name, url, description }: BuildCollectionPageParams) {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		url,
		inLanguage: locale,
		description,
		isPartOf: {
			"@type": "WebSite",
			name: SITE_NAME,
			url: SITE_URL,
		},
	};
}

export function buildCreativeWorkJsonLd({ locale, name, url, description, categoryName, categoryUrl, image = DEFAULT_LOGO }: BuildCreativeWorkParams) {
	const data: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name,
		url,
		inLanguage: locale,
		description,
		author: {
			"@type": "Organization",
			name: "Gjallarbru",
			url: SITE_URL,
		},
		image,
	};

	if (categoryName && categoryUrl) {
		data.isPartOf = {
			"@type": "CollectionPage",
			name: categoryName,
			url: categoryUrl,
		};
	} else {
		data.isPartOf = {
			"@type": "WebSite",
			name: SITE_NAME,
			url: SITE_URL,
		};
	}

	return data;
}

export function buildSoftwareApplicationJsonLd({
	name,
	url,
	description,
	image,
	downloadUrl,
	operatingSystem = "Android",
	applicationCategory = "BookApplication",
	isFree = true,
	priceCurrency = "USD",
}: BuildSoftwareApplicationParams) {
	const data: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name,
		applicationCategory,
		operatingSystem,
		url,
		image,
		description,
		downloadUrl,
		author: {
			"@type": "Organization",
			name: "Gjallarbru",
			url: SITE_URL,
		},
	};

	if (isFree) {
		data.offers = {
			"@type": "Offer",
			price: "0",
			priceCurrency,
		};
	}

	return data;
}

export function getHomeBreadcrumbName(locale: string) {
	return locale === "en" ? "Home" : "Главная";
}

export function getSiteConstants() {
	return {
		SITE_URL,
		SITE_NAME,
		DEFAULT_LOGO,
	};
}
