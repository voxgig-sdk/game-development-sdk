<?php
declare(strict_types=1);

// GameDevelopment SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GameDevelopmentFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GameDevelopmentBaseFeature();
            case "test":
                return new GameDevelopmentTestFeature();
            default:
                return new GameDevelopmentBaseFeature();
        }
    }
}
