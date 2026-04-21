import Image from "next/image";

export default function SES() {
    return (
        <div className="inline-flex items-center gap-3 rounded-xl bg-card px-3 py-2 text-card-foreground shadow-sm">
            <div className="relative h-[100px] w-[100px]">
                <Image
                    src="/ses.png"
                    alt="Study Edda Society"
                    fill
                    className="hidden object-cover dark:block"
                />
                <Image
                    src="/ses-b.png"
                    alt="Study Edda Society"
                    fill
                    className="object-cover dark:hidden"
                />
            </div>
            <div className="flex flex-col text-sm font-medium text-foreground leading-none uppercase tracking-[0.18em]">
                <span>Study</span>
                <span>Edda</span>
                <span>Society</span>
            </div>
        </div>
    );
}