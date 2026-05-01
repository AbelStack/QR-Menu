<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->text('description')->nullable()->after('tagline');
            $table->text('story')->nullable()->after('description');
            $table->text('mission')->nullable()->after('story');
            $table->text('vision')->nullable()->after('mission');
            $table->string('location')->nullable()->after('address');
            $table->string('facebook_url')->nullable()->after('business_hours');
            $table->string('instagram_url')->nullable()->after('facebook_url');
            $table->string('twitter_url')->nullable()->after('instagram_url');
            $table->string('hours_weekday')->nullable()->after('twitter_url');
            $table->string('hours_saturday')->nullable()->after('hours_weekday');
            $table->string('hours_sunday')->nullable()->after('hours_saturday');
        });
    }

    public function down(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->dropColumn([
                'description',
                'story',
                'mission',
                'vision',
                'location',
                'facebook_url',
                'instagram_url',
                'twitter_url',
                'hours_weekday',
                'hours_saturday',
                'hours_sunday'
            ]);
        });
    }
};
