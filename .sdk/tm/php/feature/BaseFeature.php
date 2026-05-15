<?php
declare(strict_types=1);

// GameDevelopment SDK base feature

class GameDevelopmentBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GameDevelopmentContext $ctx, array $options): void {}
    public function PostConstruct(GameDevelopmentContext $ctx): void {}
    public function PostConstructEntity(GameDevelopmentContext $ctx): void {}
    public function SetData(GameDevelopmentContext $ctx): void {}
    public function GetData(GameDevelopmentContext $ctx): void {}
    public function GetMatch(GameDevelopmentContext $ctx): void {}
    public function SetMatch(GameDevelopmentContext $ctx): void {}
    public function PrePoint(GameDevelopmentContext $ctx): void {}
    public function PreSpec(GameDevelopmentContext $ctx): void {}
    public function PreRequest(GameDevelopmentContext $ctx): void {}
    public function PreResponse(GameDevelopmentContext $ctx): void {}
    public function PreResult(GameDevelopmentContext $ctx): void {}
    public function PreDone(GameDevelopmentContext $ctx): void {}
    public function PreUnexpected(GameDevelopmentContext $ctx): void {}
}
