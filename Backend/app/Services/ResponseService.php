<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ResponseService
{
    public function success($data, int $status = ResponseAlias::HTTP_OK): JsonResponse
    {
        return response()->json($data, $status);
    }

    public function error(string $message, int $status = ResponseAlias::HTTP_INTERNAL_SERVER_ERROR): JsonResponse
    {
        return response()->json(['message' => $message], $status);
    }
}
