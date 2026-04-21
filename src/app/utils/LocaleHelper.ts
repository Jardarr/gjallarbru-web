// src/lib/seo.ts
export function getLocalizedPath(locale: string, path: string) {
    if (locale === "ru") {
        return path;
    }

    return `/${locale}${path}`;
}

export function getAbsoluteUrl(path: string) {
    return `https://gjallarbru.ru${path}`;
}

export function getLocaleForOpenGraph(locale: string) {
    return locale === "ru" ? "ru_RU" : "en_US";
}