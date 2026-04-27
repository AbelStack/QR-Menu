<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\RestaurantSettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
});

// Public routes (for customer-facing menu)
Route::prefix('public')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/menu-items', [MenuItemController::class, 'index']);
    Route::get('/menu-items/{id}', [MenuItemController::class, 'show']);
    Route::get('/settings', [RestaurantSettingController::class, 'index']);
});

// Admin routes (protected with auth)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    // Categories
    Route::get('/categories', [CategoryController::class, 'adminIndex']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    Route::post('/categories/reorder', [CategoryController::class, 'reorder']);

    // Menu Items
    Route::get('/menu-items', [MenuItemController::class, 'adminIndex']);
    Route::post('/menu-items', [MenuItemController::class, 'store']);
    Route::get('/menu-items/{id}', [MenuItemController::class, 'show']);
    Route::put('/menu-items/{id}', [MenuItemController::class, 'update']);
    Route::delete('/menu-items/{id}', [MenuItemController::class, 'destroy']);
    Route::post('/menu-items/{id}/toggle-availability', [MenuItemController::class, 'toggleAvailability']);
    Route::post('/menu-items/{id}/toggle-featured', [MenuItemController::class, 'toggleFeatured']);
    Route::post('/menu-items/upload-image', [MenuItemController::class, 'uploadImage']);

    // Restaurant Settings
    Route::get('/settings', [RestaurantSettingController::class, 'index']);
    Route::put('/settings', [RestaurantSettingController::class, 'update']);
    Route::post('/settings/upload-logo', [RestaurantSettingController::class, 'uploadLogo']);
});
