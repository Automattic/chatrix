<?php

declare(strict_types=1);

namespace Strobotti\JWK\Key\Tests;

use PHPUnit\Framework\TestCase;
use Strobotti\JWK\Key\AbstractKey;
use Strobotti\JWK\Key\KeyInterface;

/**
 * @internal
 */
final class AbstractKeyTest extends TestCase
{
    public function testCreateFromJSON(): void
    {
        $json = <<<'EOT'
{
    "kty": "RSA",
    "use": "sig",
    "alg": "RS256",
    "kid": "86D88Kf"
}
EOT;

        $key = AbstractKeyTest__AbstractKey__Mock::createFromJSON($json);

        static::assertSame($json, "{$key}");
    }

    public function testSettersAndGetters(): void
    {
        $key = new AbstractKeyTest__AbstractKey__Mock();
        $key->setAlgorithm(KeyInterface::ALGORITHM_RS256)
            ->setPublicKeyUse(KeyInterface::PUBLIC_KEY_USE_SIGNATURE)
            ->setKeyType(KeyInterface::KEY_TYPE_RSA)
            ->setKeyId('asdf')
        ;

        static::assertSame(KeyInterface::ALGORITHM_RS256, $key->getAlgorithm());
        static::assertSame(KeyInterface::PUBLIC_KEY_USE_SIGNATURE, $key->getPublicKeyUse());
        static::assertSame(KeyInterface::KEY_TYPE_RSA, $key->getKeyType());
        static::assertSame('asdf', $key->getKeyId());

        // Test nullable fields
        $key->setKeyId(null);
        $key->setPublicKeyUse(null);

        static::assertNull($key->getKeyId());
        static::assertNull($key->getPublicKeyUse());
    }
}

final class AbstractKeyTest__AbstractKey__Mock extends AbstractKey
{
}
