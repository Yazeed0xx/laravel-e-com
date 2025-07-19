<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $company = fake()->unique()->company();
        return [
            'name' => $company,
            'logo' => 'https://via.placeholder.com/200x200/'. fake()->hexColor(). '/FFFFFF?text=' . urlencode($company),
        ];
    }
}
