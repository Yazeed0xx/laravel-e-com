import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Star,
    Tag,
    Truck,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface ProductDetailProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        originalPrice?: number;
        image: string;
        images?: string[];
        rating: { rating: number } | null;
        reviews?: number;
        brand: { name: string } | string;
        category: { name: string } | string;
        inStock: boolean;
        quantity: number;
        color?: string;
        features?: string[];
        specifications?: Record<string, string>;
        tags?: { id: number; name: string }[];
        comments?: {
            id: number;
            comment: string;
            rating: number;
            created_at: string;
            user: {
                id: number;
                name: string;
                email: string;
            };
        }[];
        discount?: {
            percentage: number;
            isActive: () => boolean;
        };
    };
}

export default function ProductDetail({ product }: ProductDetailProps) {
    console.log(product.comments)
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.color || '');
    const [isWishlisted, setIsWishlisted] = useState(false);

    const productImages = product.images || [product.image];
    const averageRating = product.rating?.rating || 4.5;
    const reviewCount = product.reviews || product.comments?.length || 0;
    const brandName =
        typeof product.brand === 'string'
            ? product.brand
            : product.brand?.name || 'Unknown';
    const categoryName =
        typeof product.category === 'string'
            ? product.category
            : product.category?.name || 'General';

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.quantity) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        // Implementation for adding to cart
        console.log('Adding to cart:', {
            product: product.id,
            quantity,
            color: selectedColor,
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        } else {
            // Fallback to copy URL
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <>
            <Head title={product.name} />

            <AuthenticatedLayout>
                <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10">
                    <div className="container mx-auto px-4 py-8">
                        {/* Breadcrumb */}
                        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Link
                                href="/products"
                                className="transition-colors hover:text-foreground"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Products
                                </Button>
                            </Link>
                            <span>/</span>
                            <span>{categoryName}</span>
                            <span>/</span>
                            <span className="text-foreground">
                                {product.name}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Product Images */}
                            <div className="space-y-4">
                                {/* Main Image */}
                                <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                                    <div className="relative aspect-square">
                                        <img
                                            src={productImages[selectedImage]}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                        {product.discount && (
                                            <Badge className="absolute left-4 top-4 bg-red-500 text-white">
                                                -{product.discount.percentage}%
                                            </Badge>
                                        )}
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute right-4 top-4 bg-background/80 hover:bg-background"
                                            onClick={() =>
                                                setIsWishlisted(!isWishlisted)
                                            }
                                        >
                                            <Heart
                                                className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                                            />
                                        </Button>
                                    </div>
                                </Card>

                                {/* Image Thumbnails */}
                                {productImages.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {productImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                                                    selectedImage === index
                                                        ? 'border-primary'
                                                        : 'border-border hover:border-primary/50'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Header */}
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {brandName}
                                    </p>
                                    <h1 className="text-3xl font-bold text-foreground">
                                        {product.name}
                                    </h1>

                                    {/* Rating */}
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i <
                                                        Math.floor(
                                                            averageRating,
                                                        )
                                                            ? 'fill-current text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {averageRating} ({reviewCount}{' '}
                                            reviews)
                                        </span>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-primary">
                                        ${product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-muted-foreground line-through">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                    {product.discount && (
                                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            Save $
                                            {(product.originalPrice ||
                                                product.price) - product.price}
                                        </Badge>
                                    )}
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2">
                                    {product.inStock ? (
                                        <>
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span className="font-medium text-green-600">
                                                In Stock ({product.quantity}{' '}
                                                available)
                                            </span>
                                        </>
                                    ) : (
                                        <Badge variant="destructive">
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="mb-2 font-semibold">
                                        Description
                                    </h3>
                                    <p className="leading-relaxed text-muted-foreground">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div>
                                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                            <Tag className="h-4 w-4" />
                                            Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag) => (
                                                <Badge
                                                    key={tag.id}
                                                    variant="secondary"
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Selection */}
                                {product.color && (
                                    <div>
                                        <Label>Color: {selectedColor}</Label>
                                        <div className="mt-2">
                                            <Badge variant="outline">
                                                {product.color}
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div>
                                    <Label>Quantity</Label>
                                    <div className="mt-2 flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                handleQuantityChange(-1)
                                            }
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => {
                                                const val = parseInt(
                                                    e.target.value,
                                                );
                                                if (
                                                    val >= 1 &&
                                                    val <= product.quantity
                                                ) {
                                                    setQuantity(val);
                                                }
                                            }}
                                            className="w-20 text-center"
                                            min={1}
                                            max={product.quantity}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                handleQuantityChange(1)
                                            }
                                            disabled={
                                                quantity >= product.quantity
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1"
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleShare}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Features */}
                                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-4">
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                            <div className="flex items-center gap-2">
                                                <Truck className="h-4 w-4 text-primary" />
                                                <span className="text-sm">
                                                    Free Shipping
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-primary" />
                                                <span className="text-sm">
                                                    2 Year Warranty
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RotateCcw className="h-4 w-4 text-primary" />
                                                <span className="text-sm">
                                                    30 Day Returns
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Product Details Tabs */}
                        <div className="mt-12">
                            <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">
                                        Details
                                    </TabsTrigger>
                                    <TabsTrigger value="specifications">
                                        Specifications
                                    </TabsTrigger>
                                    <TabsTrigger value="reviews">
                                        Reviews ({reviewCount})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="details" className="mt-6">
                                    <Card className="border-0 bg-card/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>
                                                Product Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="leading-relaxed text-muted-foreground">
                                                {product.description}
                                            </p>

                                            {product.features && (
                                                <div>
                                                    <h4 className="mb-2 font-semibold">
                                                        Key Features
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {product.features.map(
                                                            (
                                                                feature,
                                                                index,
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-start gap-2"
                                                                >
                                                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                                                    <span className="text-muted-foreground">
                                                                        {
                                                                            feature
                                                                        }
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent
                                    value="specifications"
                                    className="mt-6"
                                >
                                    <Card className="border-0 bg-card/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>
                                                Specifications
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <h4 className="mb-2 font-semibold">
                                                        Basic Info
                                                    </h4>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">
                                                                Brand
                                                            </span>
                                                            <span>
                                                                {brandName}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">
                                                                Category
                                                            </span>
                                                            <span>
                                                                {categoryName}
                                                            </span>
                                                        </div>
                                                        {product.color && (
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">
                                                                    Color
                                                                </span>
                                                                <span>
                                                                    {
                                                                        product.color
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {product.specifications && (
                                                    <div>
                                                        <h4 className="mb-2 font-semibold">
                                                            Technical Specs
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {Object.entries(
                                                                product.specifications,
                                                            ).map(
                                                                ([
                                                                    key,
                                                                    value,
                                                                ]) => (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="flex justify-between"
                                                                    >
                                                                        <span className="text-muted-foreground">
                                                                            {
                                                                                key
                                                                            }
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                value
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="reviews" className="mt-6">
                                    <Card className="border-0 bg-card/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>
                                                Customer Reviews
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {product.comments &&
                                            product.comments.length > 0 ? (
                                                <div className="space-y-6">
                                                    {product.comments.map(
                                                        (comment) => (
                                                            <div
                                                                key={comment.id}
                                                                className="border-b border-border pb-6 last:border-0"
                                                            >
                                                                <div className="flex items-start gap-4">
                                                                    <Avatar>
                                                                        <AvatarImage
                                                                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.name}`}
                                                                        />
                                                                        <AvatarFallback>
                                                                            <User className="h-4 w-4" />
                                                                        </AvatarFallback>
                                                                    </Avatar>

                                                                    <div className="flex-1 space-y-2">
                                                                        <div className="flex items-center justify-between">
                                                                            <h4 className="font-semibold">
                                                                                {
                                                                                    comment
                                                                                        .user
                                                                                        .name
                                                                                }
                                                                            </h4>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="flex items-center">
                                                                                    {[
                                                                                        ...Array(
                                                                                            5,
                                                                                        ),
                                                                                    ].map(
                                                                                        (
                                                                                            _,
                                                                                            i,
                                                                                        ) => (
                                                                                            <Star
                                                                                                key={
                                                                                                    i
                                                                                                }
                                                                                                className={`h-3 w-3 ${
                                                                                                    i <
                                                                                                    comment.rating
                                                                                                        ? 'fill-current text-yellow-400'
                                                                                                        : 'text-gray-300'
                                                                                                }`}
                                                                                            />
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                                    <Calendar className="h-3 w-3" />
                                                                                    {new Date(
                                                                                        comment.created_at,
                                                                                    ).toLocaleDateString()}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-muted-foreground">
                                                                            {
                                                                                comment.comment
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <p className="text-muted-foreground">
                                                        No reviews yet. Be the
                                                        first to review this
                                                        product!
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
