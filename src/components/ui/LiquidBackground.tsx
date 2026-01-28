'use client';

export const LiquidBackground = () => {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
                zIndex: 0
            }}
        >
            {/* Main gradient background */}
            <div
                className="absolute inset-0 transition-colors duration-1000"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 80% at 50% -20%, 
                            hsl(var(--primary) / 0.2), 
                            transparent),
                        radial-gradient(ellipse 80% 80% at 80% 60%, 
                            hsl(var(--accent) / 0.2), 
                            transparent),
                        radial-gradient(ellipse 100% 100% at 20% 80%, 
                            hsl(var(--primary) / 0.18), 
                            transparent)
                    `
                }}
            />

            {/* Animated liquid blobs */}
            <div className="absolute inset-0">
                {/* Blob 1 - Top */}
                <div
                    className="absolute blur-3xl opacity-60 dark:opacity-40"
                    style={{
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--accent) / 0.25))',
                        top: '-10%',
                        left: '10%',
                        animation: 'blob-float 20s ease-in-out infinite',
                        animationDelay: '0s'
                    }}
                />

                {/* Blob 2 - Right */}
                <div
                    className="absolute blur-3xl opacity-60 dark:opacity-40"
                    style={{
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.3))',
                        top: '40%',
                        right: '-5%',
                        animation: 'blob-float 18s ease-in-out infinite',
                        animationDelay: '-5s'
                    }}
                />

                {/* Blob 3 - Bottom Left */}
                <div
                    className="absolute blur-3xl opacity-60 dark:opacity-40"
                    style={{
                        width: '550px',
                        height: '550px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.32), hsl(var(--accent) / 0.28))',
                        bottom: '-10%',
                        left: '-5%',
                        animation: 'blob-float 22s ease-in-out infinite',
                        animationDelay: '-10s'
                    }}
                />

                {/* Blob 4 - Center */}
                <div
                    className="absolute blur-3xl opacity-50 dark:opacity-30"
                    style={{
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, hsl(var(--accent) / 0.28), hsl(var(--primary) / 0.28))',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'blob-pulse 15s ease-in-out infinite',
                        animationDelay: '-7s'
                    }}
                />
            </div>

            {/* Mesh gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(at 40% 20%, hsl(var(--primary) / 0.08) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, hsl(var(--accent) / 0.06) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsl(var(--primary) / 0.07) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, hsl(var(--accent) / 0.05) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsl(var(--primary) / 0.06) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, hsl(var(--accent) / 0.08) 0px, transparent 50%)
                    `,
                    animation: 'mesh-move 40s ease-in-out infinite'
                }}
            />

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat'
                }}
            />

            <style jsx>{`
                @keyframes blob-float {
                    0%, 100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes blob-pulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.15);
                        opacity: 0.7;
                    }
                }

                @keyframes mesh-move {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
            `}</style>
        </div>
    );
};
