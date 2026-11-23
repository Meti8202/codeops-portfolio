<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'restaurant',
        'price',
        'cost_price',
        'is_fasting',
        'area',
    ];

    protected function casts(): array
    {
        return [
            'is_fasting' => 'boolean',
            'price' => 'integer',
            'cost_price' => 'integer',
        ];
    }

    public function restaurantDetails(): BelongsTo
    {
        return $this->belongsTo(
            Restaurant::class,
            'restaurant',
            'name'
        );
    }

    public function scopeInArea($query, ?string $area)
    {
        return $query->when(
            $area,
            fn($q) => $q->where('area', $area)
        );
    }

    public function scopeUnder($query, ?int $santim)
    {
        return $query->when(
            $santim !== null,
            fn($q) => $q->where('price', '<=', $santim)
        );
    }

    public function scopeFasting($query, bool $only)
    {
        return $query->when(
            $only,
            fn($q) => $q->where('is_fasting', true)
        );
    }
}
