<?php
declare(strict_types=1);

// GameDevelopment SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GameDevelopmentMakeContext
{
    public static function call(array $ctxmap, ?GameDevelopmentContext $basectx): GameDevelopmentContext
    {
        return new GameDevelopmentContext($ctxmap, $basectx);
    }
}
