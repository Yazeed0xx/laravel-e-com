<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(3, true) . ' ' . fake()->randomElement(['Pro', 'Max', 'Ultra', 'Plus', 'Premium', 'Standard']),
            'description' => fake()->paragraph(4),
            'price' => fake()->randomFloat(2, 10.00, 999.99),
            'color' => fake()->randomElement(['red', 'green', 'blue']),
            'in_stock' => fake()->boolean(80), // 80% chance of being in stock
            'quantity' => fake()->numberBetween(0, 100),
            'brand' => fake()->company(),
            'image' => 'https://via.placeholder.com/640x480/'. fake()->hexColor(). '/FFFFFF?text=' . urlencode('Product'),
            'categories_id' => \App\Models\Category::factory(),
            'version_id' => \App\Models\Version::factory(),
            'rating_id' => \App\Models\Rating::factory(),
            'discount_id' => fake()->boolean(30) ? \App\Models\Discount::factory() : null, // 30% chance of having a discount
            'brand_id' => \App\Models\Brand::factory(),
        ];
    }
}
