<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'area',
        'phone',
    ];

    public function dishes(): HasMany
    {
        return $this->hasMany(
            Dish::class,
            'restaurant',
            'name'
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
