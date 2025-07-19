'use client';

import { Button } from '@/Components/ui/button';
import { Toast } from '@/Components/ui/toast';
import { allProducts } from '@/data/products';
import { useToast } from '@/hooks/useToast';
import { Link } from '@inertiajs/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardTitle } from './ui/card';

export default function FutreProd() {
    // Get the first 3 products for featured section
    const featuredProducts = allProducts.slice(0, 3);
    const { toast, showToast, hideToast } = useToast();

    return (
        <section className="from-background to-secondary/20 dark:from-background dark:to-secondary/10 bg-gradient-to-b px-6 py-16">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="from-foreground to-muted-foreground mb-4 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                        Featured Collection
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                        Discover our most popular audio products, carefully
                        curated for exceptional sound quality and design
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="bg-card dark:bg-card group overflow-hidden border-0 shadow-lg transition-all duration-500 hover:shadow-2xl"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Badge */}
                                <Badge
                                    className={`absolute left-4 top-4 ${
                                        product.badge === 'Best Seller'
                                            ? 'bg-orange-500 hover:bg-orange-600'
                                            : product.badge === 'New'
                                              ? 'bg-green-500 hover:bg-green-600'
                                              : 'bg-purple-500 hover:bg-purple-600'
                                    } text-white`}
                                >
                                    {product.badge}
                                </Badge>

                                {/* Wishlist Button */}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="bg-background/80 hover:bg-background absolute right-4 top-4 transition-colors duration-300 hover:text-red-500"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>

                                {/* Quick Action Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <Button
                                        className="bg-background text-foreground hover:bg-secondary scale-90 transform transition-transform duration-300 group-hover:scale-100"
                                        // onClick={() => handleQuickAdd(product)}
                                        disabled={!product.inStock}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        {product.inStock
                                            ? 'Quick Add'
                                            : 'Out of Stock'}
                                    </Button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <CardContent className="space-y-4 p-6">
                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i <
                                                    Math.floor(product.rating)
                                                        ? 'fill-current text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>{' '}
                                    <span className="text-muted-foreground text-sm">
                                        {product.rating} ({product.reviews})
                                    </span>
                                </div>
                                {/* Product Name */}
                                <CardTitle className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                                    {product.name}
                                </CardTitle>
                                {/* Description */}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {product.description}
                                </p>
                                {/* Price */}
                                <div className="flex items-center gap-3">
                                    <span className="text-foreground text-2xl font-bold">
                                        ${product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-muted-foreground text-lg line-through">
                                                ${product.originalPrice}
                                            </span>
                                            <Badge
                                                variant="destructive"
                                                className="text-xs"
                                            >
                                                {Math.round(
                                                    ((product.originalPrice -
                                                        product.price) /
                                                        product.originalPrice) *
                                                        100,
                                                )}
                                                % OFF
                                            </Badge>
                                        </>
                                    )}
                                </div>{' '}
                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex-1 bg-gradient-to-r"
                                        // onClick={() => handleAddToCart(product)}
                                        disabled={!product.inStock}
                                    >
                                        {product.inStock
                                            ? 'Add to Cart'
                                            : 'Out of Stock'}
                                    </Button>
                                    <Link href={`/products/${product.id}`}>
                                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-1">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link href="/products">
                        <Button className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground bg-gradient-to-r">
                            View All Products
                        </Button>
                    </Link>
                </div>

                {/* Toast Notification */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={hideToast}
                />
            </div>
        </section>
    );
}
