<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->text('ingredients')->nullable()->after('description_amharic');
            $table->text('ingredients_amharic')->nullable()->after('ingredients');
        });
    }

    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->dropColumn(['ingredients', 'ingredients_amharic']);
        });
    }
};
