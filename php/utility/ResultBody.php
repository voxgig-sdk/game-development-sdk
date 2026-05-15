<?php
declare(strict_types=1);

// GameDevelopment SDK utility: result_body

class GameDevelopmentResultBody
{
    public static function call(GameDevelopmentContext $ctx): ?GameDevelopmentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
