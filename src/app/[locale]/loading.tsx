export default function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <div className="flex items-center justify-center py-16">
                <div
                    className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary"
                    aria-label="Loading"
                />
            </div>
        </div>
    );
}
