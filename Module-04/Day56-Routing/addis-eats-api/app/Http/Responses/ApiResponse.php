<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public static function ok(
        mixed $data,
        array $meta = []
    ): JsonResponse {
        return response()->json(array_filter([
            'data' => $data,
            'meta' => $meta ?: null,
        ]));
    }

    public static function created(
        mixed $data,
        string $location
    ): JsonResponse {
        return response()->json([
            'data' => $data,
        ], 201)->header('Location', $location);
    }

    public static function error(
        string $code,
        string $msg,
        int $status,
        array $meta = []
    ): JsonResponse {
        return response()->json([
            'error' => compact('code', 'msg', 'meta'),
        ], $status);
    }

    public static function noContent(): \Illuminate\Http\Response
    {
        return response()->noContent();
    }
}
