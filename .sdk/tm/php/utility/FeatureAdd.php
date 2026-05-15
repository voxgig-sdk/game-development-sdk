<?php
declare(strict_types=1);

// GameDevelopment SDK utility: feature_add

class GameDevelopmentFeatureAdd
{
    public static function call(GameDevelopmentContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
