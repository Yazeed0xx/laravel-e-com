import { ModeToggle } from '@/Components/ModeToggle';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Link } from '@inertiajs/react';
import { Heart, Menu, Search, X, Zap } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

/**
 * GuestLayout - Layout component for non-authenticated users
 * Features the same navigation and product browsing capabilities as AuthenticatedLayout
 * but always displays login/signup buttons in the header
 * Allows guests to browse products, search, and access public pages
 */
export default function GuestLayout({ children }: PropsWithChildren) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const links = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/cart', label: 'Cart' },
        { to: '/about', label: 'About' },
    ];

    return (
        <>
            {/* Header - Same as AuthenticatedLayout but always shows guest UI */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center space-x-2"
                        >
                            <div className="relative">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent transition-transform duration-300 group-hover:scale-110">
                                    <Zap className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-accent"></div>
                            </div>
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
                                TechStore
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center space-x-1 md:flex">
                            {links.map(({ to, label }) => (
                                <Link key={to} href={to}>
                                    <Button
                                        variant="ghost"
                                        className="font-medium text-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </nav>

                        {/* Search Bar - Desktop */}
                        <div className="mx-8 hidden max-w-md flex-1 items-center space-x-2 lg:flex">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="border-border bg-muted/50 pl-10 transition-colors duration-200 focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-2">
                            {/* Search Icon - Mobile */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden"
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            {/* Wishlist */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative hidden sm:flex"
                            >
                                <Heart className="h-5 w-5" />
                                <Badge
                                    variant="secondary"
                                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-accent p-0 text-xs text-accent-foreground"
                                >
                                    2
                                </Badge>
                            </Button>

                            {/* Cart */}
                            {/* <CartIcon /> */}

                            {/* Guest Auth Buttons - Always shown */}
                            <div className="hidden items-center space-x-2 sm:flex">
                                <Link href={route('login')}>
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>

                            {/* Theme Toggle */}
                            <ModeToggle />

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {/* Mobile Search */}
                                <div className="px-3 py-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="border-border bg-muted/50 pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Links */}
                                {links.map(({ to, label }) => (
                                    <Link
                                        key={to}
                                        href={to}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary"
                                        >
                                            {label}
                                        </Button>
                                    </Link>
                                ))}

                                {/* Mobile Guest Links */}
                                <div className="mt-2 border-t border-border pt-2">
                                    <Link
                                        href={route('login')}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <Heart className="mr-2 h-4 w-4" />
                                        Wishlist
                                        <Badge
                                            variant="secondary"
                                            className="ml-auto"
                                        >
                                            2
                                        </Badge>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="container mx-auto px-4 py-4">{children}</div>
            </main>
        </>
    );
}
