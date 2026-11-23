<?php

namespace App\Providers;

use App\Domain\DeliveryRule;
use App\Domain\PricingRule;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            PricingRule::class,
            DeliveryRule::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
