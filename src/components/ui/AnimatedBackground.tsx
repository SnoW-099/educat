'use client';

export const AnimatedBackground = () => {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            <div className="absolute inset-0 bg-white dark:bg-[#060913]" />

            <div
                className="absolute inset-0 opacity-0 dark:opacity-100"
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, transparent 30%, rgba(0, 122, 255, 0.04) 60%, transparent 90%, rgba(0, 122, 255, 0.05) 100%)'
                }}
            />

            <div className="absolute inset-0 opacity-0 dark:opacity-100">
                <div
                    style={{
                        position: 'absolute',
                        width: '800px',
                        height: '800px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.18) 0%, rgba(0, 122, 255, 0.12) 30%, rgba(0, 122, 255, 0.06) 50%, transparent 75%)',
                        top: '-20%',
                        left: '-15%',
                        filter: 'blur(60px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '700px',
                        height: '700px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.16) 0%, rgba(0, 122, 255, 0.1) 30%, rgba(0, 122, 255, 0.05) 50%, transparent 75%)',
                        top: '-12%',
                        right: '-12%',
                        filter: 'blur(55px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '650px',
                        height: '650px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.17) 0%, rgba(0, 122, 255, 0.11) 30%, rgba(0, 122, 255, 0.055) 50%, transparent 75%)',
                        bottom: '-15%',
                        left: '-10%',
                        filter: 'blur(58px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, rgba(0, 122, 255, 0.09) 30%, rgba(0, 122, 255, 0.04) 50%, transparent 75%)',
                        bottom: '-10%',
                        right: '-8%',
                        filter: 'blur(52px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '750px',
                        height: '750px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.175) 0%, rgba(0, 122, 255, 0.11) 30%, rgba(0, 122, 255, 0.05) 50%, transparent 75%)',
                        top: '30%',
                        left: '40%',
                        filter: 'blur(65px)'
                    }}
                />
            </div>

            <div className="absolute inset-0 opacity-0 dark:opacity-100">
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.13) 0%, rgba(0, 122, 255, 0.07) 35%, transparent 70%)',
                        top: '20%',
                        right: '25%',
                        filter: 'blur(45px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.12) 0%, rgba(0, 122, 255, 0.06) 35%, transparent 70%)',
                        bottom: '25%',
                        left: '30%',
                        filter: 'blur(42px)'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '480px',
                        height: '480px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.135) 0%, rgba(0, 122, 255, 0.07) 35%, transparent 70%)',
                        top: '60%',
                        right: '35%',
                        filter: 'blur(48px)'
                    }}
                />
            </div>

            <div
                className="absolute inset-0 opacity-0 dark:opacity-25"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0, 122, 255, 0.12) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    backgroundPosition: '0 0, 24px 24px'
                }}
            />

            <div
                className="absolute inset-0 opacity-0 dark:opacity-100"
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.04) 0%, transparent 25%, rgba(0, 122, 255, 0.03) 50%, transparent 75%, rgba(0, 122, 255, 0.035) 100%)'
                }}
            />
        </div>
    );
};
