<?php
declare(strict_types=1);

// GameDevelopment SDK exists test

require_once __DIR__ . '/../gamedevelopment_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GameDevelopmentSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
