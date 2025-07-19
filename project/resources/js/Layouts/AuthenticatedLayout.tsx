'use client';
import { ModeToggle } from '@/Components/ModeToggle';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
// import { CartIcon } from "./CartIcon";
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Heart, Menu, Search, User, X, Zap } from 'lucide-react';

export default function Header({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const links = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/cart', label: 'Cart' },
        { to: '/about', label: 'About' },
    ];

    return (
        <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center space-x-2"
                    >
                        <div className="relative">
                            <div className="from-primary to-accent flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                                <Zap className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div className="bg-accent absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full"></div>
                        </div>
                        <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                            TechStore
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-1 md:flex">
                        {links.map(({ to, label }) => (
                            <Link key={to} href={to}>
                                <Button
                                    variant="ghost"
                                    className="text-foreground hover:text-primary hover:bg-primary/10 font-medium transition-all duration-200"
                                >
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="mx-8 hidden max-w-md flex-1 items-center space-x-2 lg:flex">
                        <div className="relative w-full">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-muted/50 border-border focus:border-primary pl-10 transition-colors duration-200"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2">
                        {/* Search Icon - Mobile */}
                        <Button variant="ghost" size="sm" className="lg:hidden">
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
                                className="bg-accent text-accent-foreground absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
                            >
                                2
                            </Badge>
                        </Button>

                        {/* Cart */}
                        {/* <CartIcon /> */}

                        {/* Auth Buttons */}
                        <div className="hidden items-center space-x-2 sm:flex">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>

                        {/* User Account */}
                        <Link href="/profile">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex"
                            >
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

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
                    <div className="border-border bg-background/95 border-t backdrop-blur-xl md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* Mobile Search */}
                            <div className="px-3 py-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="bg-muted/50 border-border pl-10"
                                    />
                                </div>
                            </div>

                            {/* Mobile Links */}
                            {links.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    href={to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className="text-foreground hover:text-primary hover:bg-primary/10 w-full justify-start"
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}

                            {/* Mobile Account Links */}
                            <div className="border-border mt-2 border-t pt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
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
                                    <User className="mr-2 h-4 w-4" />
                                    Account
                                </Button>
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

            <div className="container mx-auto px-4 py-4">
                {children}
            </div>
        </header>
    );
}
