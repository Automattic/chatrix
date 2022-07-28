<?php

declare(strict_types=1);

namespace Strobotti\JWK\Tests;

use PHPUnit\Framework\TestCase;
use Strobotti\JWK\Key\Rsa;
use Strobotti\JWK\KeyFactory;

/**
 * @internal
 */
final class KeyFactoryTest extends TestCase
{
    /**
     * @dataProvider provideCreateFromPem
     */
    public function testCreateFromPem(string $pem, array $options, array $json, string $expectedInstance): void
    {
        $factory = new KeyFactory();
        $key = $factory->createFromPem($pem, $options);

        static::assertInstanceOf($expectedInstance, $key);
        static::assertSame($json, $key->jsonSerialize());
    }

    public function provideCreateFromPem(): \Generator
    {
        yield [
            'pem' => <<<'EOT'
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4dGQ7bQK8LgILOdLsYzf
ZjkEAoQeVC/aqyc8GC6RX7dq/KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdD
Nq1n52TpxQwI2EqxSk7I9fKPKhRt4F8+2yETlYvye+2s6NeWJim0KBtOVrk0gWvE
Dgd6WOqJl/yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X+Tip84wqwyRpU
lq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll+p/Dg8vAXxJLIJ4SNLcqgFeZe
4OfHLgdzMvxXZJnPp/VgmkcpUdRotazKZumj6dBPcXI/XID4Z4Z3OM1KrZPJNdUh
xwIDAQAB
-----END PUBLIC KEY-----
EOT
            ,
            'options' => [
                'use' => 'sig',
                'alg' => 'RS256',
                'kid' => 'eXaunmL',
            ],
            'json' => [
                'kty' => 'RSA',
                'use' => 'sig',
                'alg' => 'RS256',
                'kid' => 'eXaunmL',
                'n' => '4dGQ7bQK8LgILOdLsYzfZjkEAoQeVC_aqyc8GC6RX7dq_KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdDNq1n52TpxQwI2EqxSk7I9fKPKhRt4F8-2yETlYvye-2s6NeWJim0KBtOVrk0gWvEDgd6WOqJl_yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X-Tip84wqwyRpUlq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll-p_Dg8vAXxJLIJ4SNLcqgFeZe4OfHLgdzMvxXZJnPp_VgmkcpUdRotazKZumj6dBPcXI_XID4Z4Z3OM1KrZPJNdUhxw',
                'e' => 'AQAB',
            ],
            'expectedInstance' => Rsa::class,
        ];
    }
}
