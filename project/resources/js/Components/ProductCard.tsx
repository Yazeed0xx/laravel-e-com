import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import React from 'react';

export interface ProductCardData {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    badge?: string;
    inStock: boolean;
    stockCount?: number;
    brand: string;
    category: string;
}

interface ProductCardProps {
    product: ProductCardData;
    className?: string;
    onAddToCart?: (product: ProductCardData) => void;
    onToggleWishlist?: (product: ProductCardData) => void;
    variant?: 'default' | 'featured';
}

export function ProductCard({
    product,
    className,
    onAddToCart,
    onToggleWishlist,
    variant = 'default',
}: ProductCardProps) {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleWishlist?.(product);
    };

    const getBadgeColor = (badgeText: string) => {
        switch (badgeText.toLowerCase()) {
            case 'best seller':
                return 'bg-orange-500 hover:bg-orange-600';
            case 'new':
                return 'bg-green-500 hover:bg-green-600';
            case 'sale':
                return 'bg-red-500 hover:bg-red-600';
            default:
                return 'bg-purple-500 hover:bg-purple-600';
        }
    };

    return (
        <Card
            className={cn(
                'group overflow-hidden border-0 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl',
                variant === 'featured'
                    ? 'bg-card hover:bg-card/90 dark:bg-card'
                    : 'bg-card/50 hover:bg-card/80',
                className,
            )}
        >
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={cn(
                            'w-full object-cover transition-transform duration-700 group-hover:scale-110',
                            variant === 'featured' ? 'h-64' : 'h-48',
                        )}
                    />

                    {/* Badge */}
                    {product.badge && (
                        <Badge
                            className={cn(
                                'absolute left-3 top-3 text-white',
                                getBadgeColor(product.badge),
                            )}
                        >
                            {product.badge}
                        </Badge>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-background/80 hover:bg-background"
                            onClick={handleToggleWishlist}
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Link href={`/products/${product.id}`}>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8 bg-background/80 hover:bg-background"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button
                            className="scale-90 transform bg-primary text-primary-foreground transition-transform duration-300 hover:bg-primary/90 group-hover:scale-100"
                            disabled={!product.inStock}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </div>

                <CardContent className="space-y-3 p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        'h-4 w-4',
                                        i < Math.floor(product.rating)
                                            ? 'fill-current text-yellow-400'
                                            : 'text-gray-300',
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            ({product.reviews})
                        </span>
                    </div>
                    {/* Product Info */}
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {product.brand}
                        </p>
                        <h3 className="line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
                            {product.name}
                        </h3>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <>
                                <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                </span>
                                <Badge
                                    variant="destructive"
                                    className="text-xs"
                                >
                                    Save $
                                    {(
                                        product.originalPrice - product.price
                                    ).toFixed(2)}
                                </Badge>
                            </>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between">
                        <Badge
                            variant={
                                product.inStock ? 'default' : 'destructive'
                            }
                        >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        {product.stockCount && (
                            <span className="text-xs text-muted-foreground">
                                {product.stockCount} left
                            </span>
                        )}
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
