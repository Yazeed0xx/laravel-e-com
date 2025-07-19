<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index()
    {
        $products = Product::with(['category', 'brand', 'rating', 'discount'])
            ->where('in_stock', true)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'originalPrice' => $product->discount ? $product->price : null,
                    'image' => $product->image ?: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
                    'rating' => $product->rating ? $product->rating->rating : 4.5,
                    'reviews' => rand(50, 500), // You can replace this with actual review count
                    'badge' => $product->discount ? 'Sale' : ($product->created_at->diffInDays() < 30 ? 'New' : null),
                    'inStock' => $product->isInStock(),
                    'stockCount' => $product->quantity,
                    'brand' => $product->brand ? $product->brand : $product->brand,
                    'category' => $product->category ? $product->category->name : 'General',
                ];
            });

        $categories = Category::all(['id', 'name']);
        $brands = Brand::all(['id', 'name']);

        return Inertia::render('Product/ProductPage', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'brand', 'rating', 'discount', 'comments.user', 'tags']);
        
        $formattedProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'originalPrice' => $product->discount ? $product->price / (1 - $product->discount->percentage / 100) : null,
            'image' => $product->image ?: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
            'images' => $product->image ? [
                $product->image,
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop',
            ] : [],
            'rating' => $product->rating,
            'reviews' => $product->comments ? $product->comments->count() : rand(50, 500),
            'brand' => $product->brand ?: (object)['name' => $product->brand ?: 'Unknown'],
            'category' => $product->category ?: (object)['name' => 'General'],
            'inStock' => $product->isInStock(),
            'quantity' => $product->quantity,
            'color' => $product->color,
            'features' => [
                'High-quality materials and construction',
                'Advanced technology and features',
                'Excellent customer support',
                'Fast and reliable performance',
                'Durable and long-lasting design',
            ],
            'specifications' => [
                'Weight' => '1.2 kg',
                'Dimensions' => '25 x 15 x 10 cm',
                'Material' => 'Premium aluminum',
                'Warranty' => '2 years',
                'Connectivity' => 'Bluetooth 5.0, USB-C',
            ],
            'tags' => $product->tags,
            'comments' => $product->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'comment' => $comment->content,
                    'rating' => $comment->rating ?: 5,
                    'created_at' => $comment->created_at,
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                        'email' => $comment->user->email,
                    ],
                ];
            }),
            'discount' => $product->discount,
        ];
        
        return Inertia::render('Product/ProductDetail', [
            'product' => $formattedProduct,
        ]);
    }
}
