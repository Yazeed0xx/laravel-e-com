<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreign('categories_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('version_id')->references('id')->on('versions')->onDelete('set null');
            $table->foreign('rating_id')->references('id')->on('ratings')->onDelete('set null');
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('set null');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['categories_id']);
            $table->dropForeign(['version_id']);
            $table->dropForeign(['rating_id']);
            $table->dropForeign(['discount_id']);
            $table->dropForeign(['brand_id']);
        });
    }
};
