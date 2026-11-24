<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{


    public function up(): void
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('restaurant');
            $table->unsignedInteger('price');
            $table->boolean('is_fasting')->default(false);
            $table->string('area')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dishes');
    }
};
