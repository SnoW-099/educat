import { cn } from "@/lib/utils";

interface BookLoaderProps {
    text?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const BookLoader = ({
    text = "Carregant...",
    className,
    size = "md"
}: BookLoaderProps) => {
    const sizeConfig = {
        sm: { container: "w-20 h-14", text: "text-xs", gap: "gap-3", logoSize: "text-lg" },
        md: { container: "w-28 h-20", text: "text-sm", gap: "gap-5", logoSize: "text-2xl" },
        lg: { container: "w-40 h-28", text: "text-base", gap: "gap-6", logoSize: "text-3xl" }
    };

    const config = sizeConfig[size];

    return (
        <div className={cn("flex flex-col items-center justify-center", config.gap, className)}>
            {/* Open Book Design */}
            <div className={cn("relative", config.container)}>
                {/* Ambient glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />

                {/* Book shadow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/20 dark:bg-black/40 rounded-[100%] blur-md" />

                {/* Left page (static) */}
                <div
                    className="absolute left-0 top-0 w-[45%] h-full bg-gradient-to-l from-white to-slate-100 dark:from-slate-200 dark:to-slate-300 rounded-l-sm"
                    style={{
                        transform: "perspective(500px) rotateY(-30deg)",
                        transformOrigin: "right center",
                        boxShadow: "-2px 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <div className="absolute inset-2 flex flex-col gap-1 opacity-50">
                        <div className="h-[2px] bg-slate-400 w-full rounded" />
                        <div className="h-[2px] bg-slate-400 w-4/5 rounded" />
                        <div className="h-[2px] bg-slate-400 w-full rounded" />
                        <div className="h-[2px] bg-slate-400 w-3/5 rounded" />
                    </div>
                </div>

                {/* Right page (static) */}
                <div
                    className="absolute right-0 top-0 w-[45%] h-full bg-gradient-to-r from-white to-slate-100 dark:from-slate-200 dark:to-slate-300 rounded-r-sm"
                    style={{
                        transform: "perspective(500px) rotateY(30deg)",
                        transformOrigin: "left center",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <div className="absolute inset-2 flex flex-col gap-1 opacity-50">
                        <div className="h-[2px] bg-slate-400 w-4/5 rounded" />
                        <div className="h-[2px] bg-slate-400 w-full rounded" />
                        <div className="h-[2px] bg-slate-400 w-3/5 rounded" />
                        <div className="h-[2px] bg-slate-400 w-full rounded" />
                    </div>
                </div>

                {/* Book spine */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[10%] h-full z-20 rounded-sm"
                    style={{
                        background: "linear-gradient(90deg, #1e40af 0%, #3b82f6 50%, #1e40af 100%)",
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)"
                    }}
                />

                {/* Animated pages - realistic right to left turn */}
                <div
                    className="absolute right-[5%] top-[2px] w-[45%] h-[calc(100%-4px)] bg-white dark:bg-slate-100 rounded-sm z-10"
                    style={{
                        transformOrigin: "left center",
                        animation: "realistic-page-turn 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}
                />
                <div
                    className="absolute right-[5%] top-[2px] w-[45%] h-[calc(100%-4px)] bg-slate-50 dark:bg-slate-200 rounded-sm z-10"
                    style={{
                        transformOrigin: "left center",
                        animation: "realistic-page-turn 2s cubic-bezier(0.645, 0.045, 0.355, 1) infinite",
                        animationDelay: "0.4s",
                        boxShadow: "0 0 10px rgba(0,0,0,0.08)"
                    }}
                />
            </div>

            {/* Loading text and branding */}
            {text && (
                <div className="text-center space-y-4">
                    {/* EduCat logo */}
                    <div className={cn("font-black tracking-tight", config.logoSize)}>
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Edu</span>
                        <span className="text-foreground">Cat</span>
                    </div>

                    <p className={cn("text-muted-foreground font-medium", config.text)}>
                        {text}
                    </p>

                    {/* Three bouncing dots */}
                    <div className="flex items-center justify-center gap-2">
                        <div
                            className="w-2.5 h-2.5 bg-blue-600 rounded-full"
                            style={{ animation: "dot-bounce 1s ease-in-out infinite", animationDelay: "0s" }}
                        />
                        <div
                            className="w-2.5 h-2.5 bg-blue-500 rounded-full"
                            style={{ animation: "dot-bounce 1s ease-in-out infinite", animationDelay: "0.2s" }}
                        />
                        <div
                            className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                            style={{ animation: "dot-bounce 1s ease-in-out infinite", animationDelay: "0.4s" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export const FullPageLoader = ({ text = "Carregant EduCat..." }: { text?: string }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <BookLoader size="lg" text={text} />
    </div>
);

export const CardLoader = ({ className }: { className?: string }) => (
    <div className={cn(
        "flex items-center justify-center p-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50",
        className
    )}>
        <BookLoader size="sm" />
    </div>
);
