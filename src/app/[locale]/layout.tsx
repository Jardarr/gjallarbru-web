import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "../components/Provider";
import ToTopButton from "../components/ToTopButton";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";
import TopBanner from "../components/TopBanner";

const inter = Inter({ subsets: ["latin"] });

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
            >
                <NextIntlClientProvider locale={locale}>
                    <Provider>
                        <TopBanner />

                        <div className="sticky top-0 z-50">
                            <Header />
                        </div>

                        <main className="flex min-h-screen flex-col">
                            {children}
                        </main>

                        <div className="border-t border-border px-4 py-6 md:px-24 md:py-8">
                            <Footer />
                        </div>

                        <ToTopButton />
                    </Provider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
