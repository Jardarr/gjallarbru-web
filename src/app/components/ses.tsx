import { useTheme } from "next-themes";
import Image from "next/image";

export default function SES() {
    const { resolvedTheme } = useTheme();
    return (
        <div className="inline-flex items-center gap-3 rounded-xl bg-card px-3 py-2 text-card-foreground shadow-sm">
            {resolvedTheme === "dark" ? (
                <Image
                    src="/ses.png"
                    alt="Study Edda Society"
                    className="object-cover"
                    height={100}
                    width={100}
                />
            ) : (
                <Image
                    src="/ses-b.png"
                    alt="Study Edda Society"
                    className="object-cover"
                    height={100}
                    width={100}
                />
            )}

            <div className="flex flex-col text-sm font-medium text-foreground leading-none uppercase tracking-[0.18em]">
                <span>Study</span>
                <span>Edda</span>
                <span>Society</span>
            </div>
        </div>
    );
}
