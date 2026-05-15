<?php
declare(strict_types=1);

// GameDevelopment SDK utility: prepare_body

class GameDevelopmentPrepareBody
{
    public static function call(GameDevelopmentContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
