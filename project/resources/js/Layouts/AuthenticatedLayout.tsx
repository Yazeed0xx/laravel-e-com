'use client';
import { ModeToggle } from '@/Components/ModeToggle';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
// import { CartIcon } from "./CartIcon";
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Input } from '@/Components/ui/input';
import { PageProps } from '@/types';
import {
    ChevronDown,
    Heart,
    LogOut,
    Menu,
    Search,
    Settings,
    UserCircle,
    X,
    Zap,
} from 'lucide-react';

/**
 * AuthenticatedLayout - Main layout component that handles both authenticated and guest users
 * Features:
 * - Responsive navigation with mobile menu
 * - Conditional authentication UI (login/signup for guests, profile dropdown for authenticated users)
 * - Search functionality
 * - Theme toggle
 * - Wishlist and cart indicators
 */
export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage<PageProps>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const links = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/cart', label: 'Cart' },
        { to: '/about', label: 'About' },
    ];

    return (
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
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-border bg-muted/50 pl-10 transition-colors duration-200 focus:border-primary"
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
                                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-accent p-0 text-xs text-accent-foreground"
                            >
                                2
                            </Badge>
                        </Button>

                        {/* Cart */}
                        {/* <CartIcon /> */}

                        {/* Auth Buttons */}
                        <div className="hidden items-center space-x-2 sm:flex">
                            {auth.user ? (
                                // Authenticated user dropdown
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2"
                                        >
                                            <UserCircle className="h-4 w-4" />
                                            <span className="hidden md:inline">
                                                {auth.user.name}
                                            </span>
                                            <ChevronDown className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium">
                                                    {auth.user.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center"
                                            >
                                                <UserCircle className="mr-2 h-4 w-4" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route('home')}
                                                className="flex items-center"
                                            >
                                                <Settings className="mr-2 h-4 w-4" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                // Guest user
                                <>
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
                                </>
                            )}
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
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary"
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}

                            {/* Mobile Account Links */}
                            <div className="mt-2 border-t border-border pt-2">
                                {auth.user ? (
                                    // Authenticated user mobile menu
                                    <>
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start"
                                            >
                                                <UserCircle className="mr-2 h-4 w-4" />
                                                Profile ({auth.user.name})
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                handleLogout();
                                            }}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    // Guest user mobile menu
                                    <>
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
                                    </>
                                )}
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

            <div className="container mx-auto px-4 py-4">{children}</div>
        </header>
    );
}
