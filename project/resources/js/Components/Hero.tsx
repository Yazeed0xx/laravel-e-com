export default function Hero() {
    return (
        <section className="from-background via-card to-background text-foreground relative min-h-screen overflow-hidden bg-gradient-to-br">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

            {/* Gradient Overlays */}
            <div className="from-primary/10 to-accent/10 absolute inset-0 bg-gradient-to-br via-transparent"></div>
            <div className="from-background/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>

            {/* Floating Elements */}
            <div className="bg-primary absolute left-20 top-20 h-2 w-2 animate-pulse rounded-full"></div>
            <div className="bg-accent absolute right-32 top-40 h-1 w-1 animate-pulse rounded-full delay-700"></div>
            <div className="bg-primary absolute bottom-32 left-16 h-1.5 w-1.5 animate-pulse rounded-full delay-1000"></div>
            <div className="bg-accent absolute bottom-20 right-20 h-1 w-1 animate-pulse rounded-full delay-300"></div>

            <div className="container relative z-10 mx-auto flex h-screen items-center px-6">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid items-center gap-8 lg:grid-cols-12">
                        {/* Content Section */}
                        <div className="space-y-8 lg:col-span-6">
                            {/* New Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 backdrop-blur-sm">
                                <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
                                <span className="text-primary text-sm font-medium">
                                    ✨ Now Available
                                </span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-4">
                                <h1 className="text-6xl font-black tracking-tight lg:text-8xl">
                                    <span className="text-foreground block">
                                        Next-Gen
                                    </span>
                                    <span className="from-primary via-accent to-primary block bg-gradient-to-r bg-clip-text text-transparent">
                                        Audio
                                    </span>
                                </h1>
                                <h2 className="text-muted-foreground max-w-lg text-2xl font-light lg:text-3xl">
                                    Experience sound like never before with our
                                    revolutionary wireless technology
                                </h2>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 py-8">
                                <div className="text-center">
                                    <div className="text-foreground text-3xl font-bold">
                                        99.9%
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        Noise Reduction
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-foreground text-3xl font-bold">
                                        48hrs
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        Battery Life
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-foreground text-3xl font-bold">
                                        0.02s
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        Latency
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button className="bg-primary text-primary-foreground group relative overflow-hidden rounded-lg px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                                    <div className="from-accent to-primary absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <span className="relative">
                                        Shop Now - $199
                                    </span>
                                </button>

                                <button className="border-border text-foreground hover:border-primary/40 hover:bg-primary/5 group rounded-lg border px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300">
                                    <span className="group-hover:text-primary transition-colors">
                                        Watch Demo
                                    </span>
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="border-border flex items-center gap-6 border-t pt-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-4 w-4 text-yellow-400"
                                            >
                                                ★
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-muted-foreground text-sm">
                                        4.9/5 (2.1k reviews)
                                    </span>
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    Free shipping worldwide
                                </div>
                            </div>
                        </div>

                        {/* Product Showcase */}
                        <div className="relative lg:col-span-6">
                            {/* Background Glow */}
                            <div className="from-primary/20 to-accent/20 absolute inset-0 rounded-full bg-gradient-to-r blur-3xl"></div>

                            {/* Product Container */}
                            <div className="relative">
                                {/* Floating UI Elements */}
                                <div className="bg-card/60 border-border absolute -left-8 -top-8 z-20 rounded-xl border p-4 backdrop-blur-md">
                                    <div className="text-muted-foreground mb-1 text-xs">
                                        Active Noise Cancelling
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary h-2 w-8 rounded-full"></div>
                                        <span className="text-foreground text-sm">
                                            ON
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-card/60 border-border absolute -bottom-4 -right-4 z-20 rounded-xl border p-4 backdrop-blur-md">
                                    <div className="text-muted-foreground mb-1 text-xs">
                                        Battery
                                    </div>
                                    <div className="text-foreground text-2xl font-bold">
                                        87%
                                    </div>
                                </div>

                                <div className="bg-card/60 border-border absolute -left-12 top-1/2 z-20 rounded-xl border p-3 backdrop-blur-md">
                                    <div className="bg-primary h-3 w-3 animate-pulse rounded-full"></div>
                                </div>

                                {/* Main Product Image */}
                                <div className="relative z-10 p-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center"
                                        alt="Premium Wireless Headphones"
                                        className="mx-auto w-full max-w-lg transform drop-shadow-2xl transition-transform duration-700 hover:rotate-12"
                                    />
                                </div>

                                {/* Orbiting Elements */}
                                <div className="bg-accent/60 absolute right-0 top-1/4 h-4 w-4 animate-bounce rounded-full"></div>
                                <div className="bg-primary/60 absolute bottom-1/4 left-0 h-3 w-3 animate-bounce rounded-full delay-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="text-muted-foreground absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs">Scroll to explore</span>
                    <div className="from-muted-foreground h-8 w-0.5 rounded-full bg-gradient-to-b to-transparent"></div>
                </div>
            </div>
        </section>
    );
}
