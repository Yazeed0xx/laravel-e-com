import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
    return (
        <div className={cn('mb-8 text-center', className)}>
            <h1 className="mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                {title}
            </h1>
            {description && (
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}
