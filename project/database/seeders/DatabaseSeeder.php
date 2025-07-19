<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create regular users for comments
        $users = User::factory(10)->create();

        // Create basic data
        $categories = \App\Models\Category::factory(5)->create();
        $tags = \App\Models\Tag::factory(8)->create();
        $brands = \App\Models\Brand::factory(5)->create();
        $versions = \App\Models\Version::factory(5)->create();
        $ratings = \App\Models\Rating::factory(10)->create();
        $discounts = \App\Models\Discount::factory(3)->create();

        // Create products with relationships
        $products = \App\Models\Product::factory(20)->create();

        // Create comments for products
        foreach ($products as $product) {
            $commentCount = fake()->numberBetween(0, 8);
            for ($i = 0; $i < $commentCount; $i++) {
                \App\Models\Comment::factory()->create([
                    'product_id' => $product->id,
                    'user_id' => $users->random()->id,
                ]);
            }
        }

        // Attach tags to products (many-to-many relationship)
        foreach ($products as $product) {
            $randomTags = $tags->random(fake()->numberBetween(1, 4));
            $product->tags()->attach($randomTags->pluck('id'));
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Created:');
        $this->command->info('- ' . ($users->count() + 1) . ' users');
        $this->command->info('- ' . $categories->count() . ' categories');
        $this->command->info('- ' . $tags->count() . ' tags');
        $this->command->info('- ' . $brands->count() . ' brands');
        $this->command->info('- ' . $versions->count() . ' versions');
        $this->command->info('- ' . $ratings->count() . ' ratings');
        $this->command->info('- ' . $discounts->count() . ' discounts');
        $this->command->info('- ' . $products->count() . ' products');
        $this->command->info('- ' . \App\Models\Comment::count() . ' comments');
    }
}
