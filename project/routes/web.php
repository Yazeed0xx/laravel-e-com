<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get('/', function () {
    \Log::info('🔍 Home route accessed');
    
    $products = Product::with(['category', 'brand', 'rating', 'discount'])
        ->where('in_stock', true)
        ->take(6) // Get 6 products for the home page
        ->get();
        
    \Log::info('🔍 Products found: ' . $products->count());
    
    $mappedProducts = $products->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'originalPrice' => $product->discount ? $product->price / (1 - $product->discount->percentage / 100) : null,
            'image' => $product->image ?: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
            'rating' => $product->rating ? $product->rating->rating : 4.5,
            'reviews' => rand(50, 500),
            'badge' => $product->discount ? 'Sale' : ($product->created_at->diffInDays() < 30 ? 'New' : null),
            'inStock' => $product->isInStock(),
            'stockCount' => $product->quantity,
            'brand' => is_object($product->brand) ? $product->brand->name : $product->brand,
            'category' => is_object($product->category) ? $product->category->name : $product->category,
        ];
    });
    
    \Log::info('🔍 Mapped products: ' . $mappedProducts->count());

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'products' => $mappedProducts,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

// Product routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
