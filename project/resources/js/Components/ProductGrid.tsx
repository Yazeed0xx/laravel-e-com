import { ProductCard } from '@/Components/ProductCard';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';

interface Product {
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

interface ProductGridProps {
    products: Product[];
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (product: Product) => void;
    onClearFilters?: () => void;
    className?: string;
}

export default function ProductGrid({
    products,
    onAddToCart,
    onToggleWishlist,
    onClearFilters,
    className = '',
}: ProductGridProps) {
    if (products.length === 0) {
        return (
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                    <div className="mx-auto max-w-md space-y-4">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                            <svg
                                className="h-12 w-12 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">
                                No products found
                            </h3>
                            <p className="text-muted-foreground">
                                No products match your current criteria. Try
                                adjusting your filters or search terms.
                            </p>
                        </div>
                        {onClearFilters && (
                            <Button
                                variant="outline"
                                onClick={onClearFilters}
                                className="mt-4"
                            >
                                Clear All Filters
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                />
            ))}
        </div>
    );
}
