import { Metadata } from "next";
import { Link } from "../../../i18n/routing";
import onData from "../../utils/on.json";
import { notFound } from "next/navigation";
import categoryTitlesRaw from "../../utils/categoryLinks.json";
import { pickTitle, type LocalizedTitle } from "../../utils/localeTitle";
import { getTranslations } from "next-intl/server";

const categories = [
    "about-gods",
    "about-heroes",
    "edda-songs",
    "edda-app",
] as const;
type Category = (typeof categories)[number];
const categoryTitles = categoryTitlesRaw as Record<Category, LocalizedTitle>;

type Props = {
    params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, locale } = await params;

    if (!categories.includes(category as Category)) {
        return { title: "Category not found" };
    }

    const cat = categoryTitles[category as Category];
    const localeTitle = pickTitle(locale, cat);
    return {
        title: `Gjallarbru | ${localeTitle}`,
        description: `${localeTitle} - Elder Edda`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category, locale } = await params;

    if (!categories.includes(category as Category)) {
        notFound();
    }

    const poems = Object.entries(onData.Poems as Record<string, any>)
        .map(([key, data]) => ({ key, data }))
        .filter((poem) => poem.data.category === category);

    const cat = categoryTitles[category as Category];
    const localeTitle = pickTitle(locale, cat);
    const t = await getTranslations({ locale });

    return (
        <main className="flex min-h-screen items-start justify-center px-4 pt-24 pb-12 text-sm md:px-6 md:text-base">
            <div className="flex w-full max-w-2xl flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {t("Titles.Category")}
                    </span>

                    <h1 className="mt-3 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                        {cat.ON}
                    </h1>

                    <h2 className="mt-2 text-base text-muted-foreground md:text-lg">
                        {localeTitle}
                    </h2>
                </div>

                <nav className="my-6 flex w-full flex-col items-center">
                    {poems.length > 0 ? (
                        poems.map((poem) => (
                            <Link
                                key={poem.data.slug}
                                href={`/${category}/${poem.data.slug}`}
                                title={t(`Poems.${poem.key}.Title`)}
                                aria-label={t(`Poems.${poem.key}.Title`)}
                                className="mb-4 inline-flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <p className="text-foreground/90">
                                    {t(`Poems.${poem.key}.Title`)}
                                </p>

                                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                    ›
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">
                            No poems found
                        </p>
                    )}
                </nav>
            </div>
        </main>
    );
}
