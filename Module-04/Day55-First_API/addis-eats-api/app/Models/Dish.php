<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'restaurant',
        'price',
        'is_fasting',
        'area',
        'cost_price',
    ];

    protected function casts(): array
    {
        return [
            'is_fasting' => 'boolean',
            'price' => 'integer',
        ];
    }
}
