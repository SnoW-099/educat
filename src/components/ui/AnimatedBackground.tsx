'use client';

export const AnimatedBackground = () => {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
                zIndex: 0
            }}
        >
            {/* Base gradient background - Más notable */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, transparent 30%, rgba(99, 102, 241, 0.05) 60%, transparent 90%, rgba(139, 92, 246, 0.06) 100%)',
                    animation: 'float-very-slow 180s ease-in-out infinite',
                    willChange: 'transform'
                }}
            />

            {/* Main animated gradient orbs - Azul más notable */}
            <div className="absolute inset-0">
                {/* Large orb 1 - Top Left - Azul más visible */}
                <div
                    style={{
                        position: 'absolute',
                        width: '800px',
                        height: '800px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.14) 30%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)',
                        top: '-20%',
                        left: '-15%',
                        animation: 'float-slow 100s ease-in-out infinite',
                        willChange: 'transform',
                        filter: 'blur(60px)'
                    }}
                />

                {/* Large orb 2 - Top Right */}
                <div
                    style={{
                        position: 'absolute',
                        width: '700px',
                        height: '700px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.12) 30%, rgba(99, 102, 241, 0.06) 50%, transparent 75%)',
                        top: '-12%',
                        right: '-12%',
                        animation: 'float-medium 90s ease-in-out infinite reverse',
                        willChange: 'transform',
                        filter: 'blur(55px)'
                    }}
                />

                {/* Medium orb 1 - Bottom Left */}
                <div
                    style={{
                        position: 'absolute',
                        width: '650px',
                        height: '650px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(124, 58, 237, 0.12) 30%, rgba(124, 58, 237, 0.06) 50%, transparent 75%)',
                        bottom: '-15%',
                        left: '-10%',
                        animation: 'float-very-slow 120s ease-in-out infinite',
                        willChange: 'transform',
                        filter: 'blur(58px)'
                    }}
                />

                {/* Medium orb 2 - Bottom Right */}
                <div
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(124, 58, 237, 0.1) 30%, rgba(124, 58, 237, 0.05) 50%, transparent 75%)',
                        bottom: '-10%',
                        right: '-8%',
                        animation: 'float-medium 110s ease-in-out infinite reverse',
                        willChange: 'transform',
                        filter: 'blur(52px)'
                    }}
                />

                {/* Center orb - Movimiento lento */}
                <div
                    style={{
                        position: 'absolute',
                        width: '750px',
                        height: '750px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.12) 30%, rgba(99, 102, 241, 0.06) 50%, transparent 75%)',
                        top: '30%',
                        left: '40%',
                        animation: 'float-very-slow 130s ease-in-out infinite',
                        willChange: 'transform',
                        filter: 'blur(65px)'
                    }}
                />
            </div>

            {/* Secondary accent orbs - Más visibles */}
            <div className="absolute inset-0">
                {/* Accent orb 1 */}
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(124, 58, 237, 0.08) 35%, transparent 70%)',
                        top: '20%',
                        right: '25%',
                        animation: 'float-fast 85s ease-in-out infinite',
                        willChange: 'transform',
                        filter: 'blur(45px)'
                    }}
                />

                {/* Accent orb 2 */}
                <div
                    style={{
                        position: 'absolute',
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.13) 0%, rgba(124, 58, 237, 0.07) 35%, transparent 70%)',
                        bottom: '25%',
                        left: '30%',
                        animation: 'float-medium 95s ease-in-out infinite reverse',
                        willChange: 'transform',
                        filter: 'blur(42px)'
                    }}
                />

                {/* Accent orb 3 */}
                <div
                    style={{
                        position: 'absolute',
                        width: '480px',
                        height: '480px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(99, 102, 241, 0.08) 35%, transparent 70%)',
                        top: '60%',
                        right: '35%',
                        animation: 'float-slow 105s ease-in-out infinite',
                        willChange: 'transform',
                        filter: 'blur(48px)'
                    }}
                />
            </div>

            {/* Grid pattern - Más visible */}
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    backgroundPosition: '0 0, 24px 24px'
                }}
            />

            {/* Animated gradient overlay - Más notable */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, transparent 25%, rgba(99, 102, 241, 0.04) 50%, transparent 75%, rgba(139, 92, 246, 0.05) 100%)',
                    animation: 'float-medium 150s ease-in-out infinite',
                    willChange: 'transform'
                }}
            />
        </div>
    );
};
