"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import SES from "../../components/ses";

export default function AppPromo() {
    return (
        <section className="mx-auto w-full max-w-4xl px-4 py-12 mt-4">
            <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-10">
                {/* Заголовок */}
                <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Приложение
                    </p>

                    <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
                        Gjallarbru для Android
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-7">
                        Читайте Старшую Эдду в удобном формате: оригинал и
                        перевод рядом, оффлайн-доступ и режим чтения без
                        отвлекающих элементов.
                    </p>
                </div>

                {/* Скриншоты */}
                <div className="mt-8 flex sm:justify-center gap-4 overflow-x-auto pb-2">
                    <img
                        src="/screenshots/scr-1.jpg"
                        alt="Скриншот приложения"
                        className="h-64 rounded-lg border border-border object-cover"
                    />
                    <img
                        src="/screenshots/scr-2.jpg"
                        alt="Скриншот приложения"
                        className="h-64 rounded-lg border border-border object-cover"
                    />
                    <img
                        src="/screenshots/scr-3.jpg"
                        alt="Скриншот приложения"
                        className="h-64 rounded-lg border border-border object-cover"
                    />
                    <img
                        src="/screenshots/scr-4.jpg"
                        alt="Скриншот приложения"
                        className="h-64 rounded-lg border border-border object-cover"
                    />
                    <img
                        src="/screenshots/scr-5.jpg"
                        alt="Скриншот приложения"
                        className="h-64 rounded-lg border border-border object-cover"
                    />
                </div>

                {/* Преимущества */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                        <p className="font-medium text-foreground">
                            Оффлайн доступ
                        </p>
                        <p className="mt-1 text-muted-foreground">
                            Читайте тексты без интернета
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                        <p className="font-medium text-foreground">
                            Параллельный перевод
                        </p>
                        <p className="mt-1 text-muted-foreground">
                            Оригинал и перевод рядом
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                        <p className="font-medium text-foreground">
                            Удобное чтение
                        </p>
                        <p className="mt-1 text-muted-foreground">
                            Без отвлекающих элементов
                        </p>
                    </div>
                </div>

                {/* Кнопки */}
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="https://github.com/Jardarr/gjallarbru/releases"
                        target="_blank"
                        className="w-full max-w-40 sm:w-auto inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                    >
                        Скачать APK
                    </Link>

                    <Link
                        href="https://github.com/Jardarr/gjallarbru"
                        target="_blank"
                        className="w-full max-w-40 sm:w-auto inline-flex items-center justify-center rounded-md border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        GitHub
                        <Github className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                {/* Микро текст */}
                <p className="mt-4 text-center text-xs text-muted-foreground">
                    Бесплатно • Android
                </p>
                <div className="mt-8 flex items-center justify-center">
                    <SES />
                </div>
            </div>
        </section>
    );
}
