import { FeaturedProducts } from '@/Components/FeaturedProducts';
import Hero from '@/Components/Hero';
import { ProductCardData } from '@/Components/ProductCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface HomeProps {
    products?: ProductCardData[];
}

export default function Home({ products = [] }: HomeProps) {
    console.log(products);
    const { auth } = usePage().props;

    const handleAddToCart = (product: ProductCardData) => {
        console.log('Adding to cart:', product);
    };

    const handleToggleWishlist = (product: ProductCardData) => {
        console.log('Toggle wishlist:', product);
    };

    return (
        <>
            <Head title="TechStore - Premium Tech Products" />

            <AuthenticatedLayout>
                <div className="flex min-h-screen flex-col">
                    {/* Hero Section */}
                    <div className="w-full">
                        <Hero />
                    </div>

                    {/* Debug Display */}
                    

                    {/* Featured Products Section */}
                    <FeaturedProducts
                        products={products}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
