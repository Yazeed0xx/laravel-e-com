import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    User,
    Zap,
} from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Create Account" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo/Brand */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="group inline-flex items-center space-x-2"
                        >
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 transition-transform duration-300 group-hover:scale-110">
                                    <Zap className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                            </div>
                            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                                TechStore
                            </span>
                        </Link>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your account to get started with amazing tech
                            products.
                        </p>
                    </div>

                    {/* Register Form */}
                    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-semibold tracking-tight">
                                Create Account
                            </CardTitle>
                            <CardDescription>
                                Enter your information to create your account
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm font-medium"
                                    >
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            className={cn(
                                                'pl-10 transition-all duration-200',
                                                errors.name &&
                                                    'border-destructive focus-visible:ring-destructive',
                                            )}
                                            placeholder="Enter your full name"
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            autoComplete="name"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium"
                                    >
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className={cn(
                                                'pl-10 transition-all duration-200',
                                                errors.email &&
                                                    'border-destructive focus-visible:ring-destructive',
                                            )}
                                            placeholder="Enter your email"
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            autoComplete="username"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password}
                                            className={cn(
                                                'pl-10 pr-10 transition-all duration-200',
                                                errors.password &&
                                                    'border-destructive focus-visible:ring-destructive',
                                            )}
                                            placeholder="Create a password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Password Confirmation Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-sm font-medium"
                                    >
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type={
                                                showPasswordConfirmation
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password_confirmation}
                                            className={cn(
                                                'pl-10 pr-10 transition-all duration-200',
                                                errors.password_confirmation &&
                                                    'border-destructive focus-visible:ring-destructive',
                                            )}
                                            placeholder="Confirm your password"
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                            onClick={() =>
                                                setShowPasswordConfirmation(
                                                    !showPasswordConfirmation,
                                                )
                                            }
                                        >
                                            {showPasswordConfirmation ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 pt-6">
                                {/* Create Account Button */}
                                <Button
                                    type="submit"
                                    className="group w-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-200 hover:from-primary/90 hover:to-purple-600/90"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>

                                {/* Divider */}
                                <div className="relative w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            or
                                        </span>
                                    </div>
                                </div>

                                {/* Sign In Link */}
                                <div className="text-center text-sm">
                                    <span className="text-muted-foreground">
                                        Already have an account?{' '}
                                    </span>
                                    <Link
                                        href={route('login')}
                                        className="font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        Sign in here
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Footer */}
                    <div className="text-center text-xs text-muted-foreground">
                        <p>
                            By creating an account, you agree to our{' '}
                            <Link
                                href="/terms"
                                className="underline transition-colors hover:text-foreground"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="underline transition-colors hover:text-foreground"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
