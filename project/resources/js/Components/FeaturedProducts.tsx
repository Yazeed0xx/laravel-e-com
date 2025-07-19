import { ProductCard, ProductCardData } from '@/Components/ProductCard';
import { PageHeader } from '@/Components/ui/page-header';

interface FeaturedProductsProps {
    products: ProductCardData[];
    onAddToCart?: (product: ProductCardData) => void;
    onToggleWishlist?: (product: ProductCardData) => void;
}

export function FeaturedProducts({
    products,
    onAddToCart,
    onToggleWishlist,
}: FeaturedProductsProps) {
    // Get the first 3 products for featured section
    const featuredProducts = products.slice(0, 6);

    if (!products || products.length === 0) {
        return (
            <section className="bg-gradient-to-b from-background to-secondary/20 px-6 py-16 dark:from-background dark:to-secondary/10">
                <div className="mx-auto max-w-7xl">
                    <PageHeader
                        title="Featured Collection"
                        description="No products available at the moment"
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-background to-secondary/20 px-6 py-16 dark:from-background dark:to-secondary/10">
            <div className="mx-auto max-w-7xl">
                <PageHeader
                    title="Featured Collection"
                    description="Discover our most popular audio products, carefully curated for exceptional sound quality and design"
                />

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="featured"
                            onAddToCart={onAddToCart}
                            onToggleWishlist={onToggleWishlist}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
