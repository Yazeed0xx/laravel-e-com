<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+30 days');
        $endDate = fake()->dateTimeBetween($startDate, '+90 days');

        return [
            'name' => fake()->unique()->words(2, true) . ' ' . fake()->randomElement([
                'Sale', 'Deal', 'Offer', 'Discount', 'Special', 'Promotion', 'Event'
            ]),
            'percentage' => fake()->randomFloat(2, 5.00, 50.00), // 5% to 50% discount
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
        ];
    }
}
