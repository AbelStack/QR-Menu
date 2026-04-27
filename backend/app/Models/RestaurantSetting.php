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
        'slug',
        'logo',
        'phone',
        'email',
        'address',
        'currency',
        'language',
        'is_active',
        'business_hours',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'business_hours' => 'array',
    ];
}
