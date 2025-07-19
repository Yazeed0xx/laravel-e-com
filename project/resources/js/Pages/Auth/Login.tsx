import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
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
    Zap,
} from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

interface LoginProps {
    canResetPassword: boolean;
    status?: string;
}

export default function Login({ canResetPassword, status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Sign In" />

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
                            Welcome back! Please sign in to your account.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    )}

                    {/* Login Form */}
                    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-semibold tracking-tight">
                                Sign In
                            </CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
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
                                            autoFocus
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
                                            placeholder="Enter your password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            autoComplete="current-password"
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

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) =>
                                                setData(
                                                    'remember',
                                                    Boolean(checked),
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="cursor-pointer text-sm font-normal"
                                        >
                                            Remember me
                                        </Label>
                                    </div>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 pt-6">
                                {/* Sign In Button */}
                                <Button
                                    type="submit"
                                    className="group w-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-200 hover:from-primary/90 hover:to-purple-600/90"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
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

                                {/* Sign Up Link */}
                                <div className="text-center text-sm">
                                    <span className="text-muted-foreground">
                                        Don't have an account?{' '}
                                    </span>
                                    <Link
                                        href={route('register')}
                                        className="font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        Create one now
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Footer */}
                    <div className="text-center text-xs text-muted-foreground">
                        <p>
                            By signing in, you agree to our{' '}
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
