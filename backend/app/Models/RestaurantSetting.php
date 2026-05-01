<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tagline',
        'description',
        'story',
        'mission',
        'vision',
        'slug',
        'logo',
        'phone',
        'email',
        'address',
        'location',
        'currency',
        'language',
        'is_active',
        'business_hours',
        'facebook_url',
        'instagram_url',
        'twitter_url',
        'hours_weekday',
        'hours_saturday',
        'hours_sunday',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'business_hours' => 'array',
    ];
}
