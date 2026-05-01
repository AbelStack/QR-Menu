<?php

namespace App\Http\Controllers;

use App\Models\RestaurantSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RestaurantSettingController extends Controller
{
    public function index()
    {
        $settings = RestaurantSetting::first();
        
        if (!$settings) {
            $settings = RestaurantSetting::create([
                'name' => 'Yummy Cafe & Restaurant',
                'tagline' => 'Yum, Every Time!',
                'slug' => 'yummy-cafe',
                'currency' => 'ETB',
                'language' => 'en',
            ]);
        }

        return response()->json(['data' => $settings]);
    }

    public function update(Request $request)
    {
        $settings = RestaurantSetting::first();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'story' => 'nullable|string',
            'mission' => 'nullable|string',
            'vision' => 'nullable|string',
            'slug' => 'sometimes|string|unique:restaurant_settings,slug,' . ($settings ? $settings->id : ''),
            'logo' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'currency' => 'sometimes|string|max:10',
            'language' => 'sometimes|string|max:10',
            'is_active' => 'boolean',
            'business_hours' => 'nullable|array',
            'facebook_url' => 'nullable|string|max:255',
            'instagram_url' => 'nullable|string|max:255',
            'twitter_url' => 'nullable|string|max:255',
            'hours_weekday' => 'nullable|string|max:100',
            'hours_saturday' => 'nullable|string|max:100',
            'hours_sunday' => 'nullable|string|max:100',
        ]);

        if ($settings) {
            $settings->update($validated);
        } else {
            $settings = RestaurantSetting::create($validated);
        }

        return response()->json([
            'message' => 'Settings updated successfully',
            'data' => $settings
        ]);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $settings = RestaurantSetting::first();

            // Delete old logo if exists
            if ($settings && $settings->logo && Storage::exists($settings->logo)) {
                Storage::delete($settings->logo);
            }

            $path = $request->file('logo')->store('logos', 'public');
            $url = Storage::url($path);

            if ($settings) {
                $settings->update(['logo' => $url]);
            }

            return response()->json([
                'message' => 'Logo uploaded successfully',
                'url' => $url,
                'path' => $path
            ]);
        }

        return response()->json(['message' => 'No logo provided'], 400);
    }
}
