<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'color',
        'in_stock',
        'quantity',
        'brand',
        'image',
        'categories_id',
        'version_id',
        'rating_id',
        'discount_id',
        'brand_id'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'in_stock' => 'boolean'
    ];

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function version(): BelongsTo
    {
        return $this->belongsTo(Version::class, 'version_id');
    }

    public function rating(): BelongsTo
    {
        return $this->belongsTo(Rating::class, 'rating_id');
    }

    public function discount(): BelongsTo
    {
        return $this->belongsTo(Discount::class, 'discount_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }

    // Helper methods
    public function getDiscountedPrice(): float
    {
        if ($this->discount && $this->discount->isActive()) {
            return $this->price * (1 - $this->discount->percentage / 100);
        }
        return $this->price;
    }

    public function isInStock(): bool
    {
        return $this->in_stock && $this->quantity > 0;
    }
}
