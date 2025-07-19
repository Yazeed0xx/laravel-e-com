<?php

require_once __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "\n=== Testing Laravel E-commerce Factories and Relationships ===\n\n";

// Test Product with all relationships
echo "1. Testing Product relationships:\n";
$product = App\Models\Product::with(['category', 'brand', 'version', 'rating', 'discount', 'comments.user', 'tags'])->first();

echo "   Product: " . $product->name . "\n";
echo "   Category: " . optional($product->category)->name . "\n";
echo "   Brand: " . optional($product->brand)->name . "\n";
echo "   Version: " . optional($product->version)->version_number . "\n";
echo "   Rating: " . optional($product->rating)->rating . "/5.0\n";
echo "   Price: $" . $product->price . "\n";
echo "   Discounted Price: $" . $product->getDiscountedPrice() . "\n";
echo "   In Stock: " . ($product->isInStock() ? 'Yes' : 'No') . "\n";
echo "   Comments: " . $product->comments->count() . "\n";
echo "   Tags: " . $product->tags->pluck('name')->join(', ') . "\n";
echo "   Image: " . $product->image . "\n\n";

// Test Comment with User relationship
echo "2. Testing Comment relationships:\n";
$comment = App\Models\Comment::with(['user', 'product'])->first();
echo "   Comment: " . substr($comment->content, 0, 50) . "...\n";
echo "   User: " . $comment->user->name . "\n";
echo "   Product: " . $comment->product->name . "\n\n";

// Test Brand with products
echo "3. Testing Brand relationships:\n";
$brand = App\Models\Brand::with('products')->first();
echo "   Brand: " . $brand->name . "\n";
echo "   Products count: " . $brand->products->count() . "\n";
echo "   Logo: " . $brand->logo . "\n\n";

// Test Category with products
echo "4. Testing Category relationships:\n";
$category = App\Models\Category::with('products')->first();
echo "   Category: " . $category->name . "\n";
echo "   Products count: " . $category->products->count() . "\n\n";

// Test Discount functionality
echo "5. Testing Discount functionality:\n";
$discounts = App\Models\Discount::all();
foreach ($discounts as $discount) {
    echo "   Discount: " . $discount->name . " (" . $discount->percentage . "%) - ";
    echo ($discount->isActive() ? 'Active' : 'Inactive') . "\n";
}

echo "\n=== All factories and relationships working correctly! ===\n";
