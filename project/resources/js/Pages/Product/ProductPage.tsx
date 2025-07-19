import { ProductCard, ProductCardData } from '@/Components/ProductCard';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
    Eye,
    Grid3X3,
    Heart,
    List,
    Search,
    ShoppingCart,
    SlidersHorizontal,
    Star,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface ProductPageProps {
    products?: ProductCardData[];
    categories?: { id: number; name: string }[];
    brands?: { id: number; name: string }[];
}

export default function ProductPage({
    products = [],
    categories = [],
    brands = [],
}: ProductPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Extract unique categories and brands from products data
    const uniqueCategories = useMemo(() => {
        const cats = [...new Set(products.map((p) => p.category))];
        return cats.map((cat) => ({ id: cat, name: cat }));
    }, [products]);

    const uniqueBrands = useMemo(() => {
        const brandsSet = [...new Set(products.map((p) => p.brand))];
        return brandsSet.map((brand) => ({ id: brand, name: brand }));
    }, [products]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    product.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                const matchesCategory =
                    selectedCategory === 'all' ||
                    product.category === selectedCategory;
                const matchesBrand =
                    selectedBrand === 'all' || product.brand === selectedBrand;
                const matchesPrice =
                    product.price >= priceRange.min &&
                    product.price <= priceRange.max;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesBrand &&
                    matchesPrice
                );
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'rating':
                        return b.rating - a.rating;
                    case 'name':
                    default:
                        return a.name.localeCompare(b.name);
                }
            });
    }, [
        products,
        searchQuery,
        selectedCategory,
        selectedBrand,
        sortBy,
        priceRange,
    ]);

    const handleAddToCart = (product: ProductCardData) => {
        console.log('Adding to cart:', product);
        // TODO: Implement cart functionality
    };

    const handleToggleWishlist = (product: ProductCardData) => {
        console.log('Toggle wishlist:', product);
        // TODO: Implement wishlist functionality
    };

    const ProductListItem = ({ product }: { product: ProductCardData }) => (
        <Card className="group overflow-hidden border-0 bg-card/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-xl">
            <Link href={`/products/${product.id}`} className="block">
                <div className="flex">
                    <div className="relative w-48 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.badge && (
                            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                                {product.badge}
                            </Badge>
                        )}
                    </div>

                    <CardContent className="flex-1 p-6">
                        <div className="flex h-full items-start justify-between">
                            <div className="flex-1 space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {product.brand}
                                    </p>
                                    <h3 className="text-xl font-semibold text-foreground transition-colors hover:text-primary">
                                        {product.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    'h-4 w-4',
                                                    i <
                                                        Math.floor(
                                                            product.rating,
                                                        )
                                                        ? 'fill-current text-yellow-400'
                                                        : 'text-gray-300',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({product.reviews} reviews)
                                    </span>
                                </div>

                                <p className="line-clamp-2 text-muted-foreground">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-primary">
                                            ${product.price}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-lg text-muted-foreground line-through">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <Badge
                                        variant={
                                            product.inStock
                                                ? 'default'
                                                : 'destructive'
                                        }
                                    >
                                        {product.inStock
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="ml-6 flex flex-col gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleToggleWishlist(product);
                                    }}
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Link href={`/products/${product.id}`}>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    disabled={!product.inStock}
                                    className="mt-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Link>
        </Card>
    );

    return (
        <>
            <Head title="Products" />

            <AuthenticatedLayout>
                <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10">
                    <div className="container mx-auto px-4 py-8">
                        {/* Page Header */}
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                Our Products
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Discover our complete collection of premium tech
                                products
                            </p>
                        </div>

                        {/* Filters Section */}
                        <Card className="mb-8 border-0 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-5 w-5" />
                                    Filters & Search
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                {/* Filter Controls */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div>
                                        <Label>Category</Label>
                                        <Select
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    All Categories
                                                </SelectItem>
                                                {uniqueCategories.map(
                                                    (category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Brand</Label>
                                        <Select
                                            value={selectedBrand}
                                            onValueChange={setSelectedBrand}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    All Brands
                                                </SelectItem>
                                                {uniqueBrands.map((brand) => (
                                                    <SelectItem
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Sort By</Label>
                                        <Select
                                            value={sortBy}
                                            onValueChange={setSortBy}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">
                                                    Name (A-Z)
                                                </SelectItem>
                                                <SelectItem value="price-low">
                                                    Price (Low to High)
                                                </SelectItem>
                                                <SelectItem value="price-high">
                                                    Price (High to Low)
                                                </SelectItem>
                                                <SelectItem value="rating">
                                                    Rating
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <Button
                                            variant={
                                                viewMode === 'grid'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="icon"
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <Grid3X3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={
                                                viewMode === 'list'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="icon"
                                            onClick={() => setViewMode('list')}
                                        >
                                            <List className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-muted-foreground">
                                Showing {filteredProducts.length} of{' '}
                                {products.length} products
                            </p>
                        </div>

                        {/* Products Grid/List */}
                        {filteredProducts.length > 0 ? (
                            <div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                        : 'space-y-6'
                                }
                            >
                                {filteredProducts.map((product) =>
                                    viewMode === 'grid' ? (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variant="default"
                                            onAddToCart={handleAddToCart}
                                            onToggleWishlist={
                                                handleToggleWishlist
                                            }
                                        />
                                    ) : (
                                        <ProductListItem
                                            key={product.id}
                                            product={product}
                                        />
                                    ),
                                )}
                            </div>
                        ) : (
                            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                                <CardContent className="py-12 text-center">
                                    <p className="text-lg text-muted-foreground">
                                        No products found matching your
                                        criteria.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                            setSelectedBrand('all');
                                            setSortBy('name');
                                        }}
                                        className="mt-4"
                                    >
                                        Clear Filters
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
