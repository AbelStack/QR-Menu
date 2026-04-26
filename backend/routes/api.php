<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Example API routes
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Example CRUD routes (you can customize these based on your needs)
Route::prefix('items')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'data' => [
                ['id' => 1, 'name' => 'Item 1', 'description' => 'Description 1'],
                ['id' => 2, 'name' => 'Item 2', 'description' => 'Description 2'],
            ],
        ]);
    });

    Route::get('/{id}', function ($id) {
        return response()->json([
            'data' => ['id' => $id, 'name' => 'Item ' . $id, 'description' => 'Description ' . $id],
        ]);
    });

    Route::post('/', function (Request $request) {
        return response()->json([
            'message' => 'Item created successfully',
            'data' => $request->all(),
        ], 201);
    });

    Route::put('/{id}', function (Request $request, $id) {
        return response()->json([
            'message' => 'Item updated successfully',
            'data' => array_merge(['id' => $id], $request->all()),
        ]);
    });

    Route::delete('/{id}', function ($id) {
        return response()->json([
            'message' => 'Item deleted successfully',
        ]);
    });
});
