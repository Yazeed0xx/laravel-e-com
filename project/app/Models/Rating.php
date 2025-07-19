<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating'
    ];

    protected $casts = [
        'rating' => 'decimal:1'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'rating_id');
    }
}
