<?php
declare(strict_types=1);

// GameDevelopment SDK utility: result_headers

class GameDevelopmentResultHeaders
{
    public static function call(GameDevelopmentContext $ctx): ?GameDevelopmentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
