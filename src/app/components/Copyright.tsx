"use client";
export default function Copyright() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full flex justify-center lg:justify-start">
            <span translate="no">&copy; {currentYear} Designed by Jardarr</span>
        </div>
    );
}
