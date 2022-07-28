<?php

declare(strict_types=1);

namespace Strobotti\JWK\Key\Tests;

use PHPUnit\Framework\TestCase;
use Strobotti\JWK\Util\Base64UrlConverter;

/**
 * @internal
 */
final class Base64UrlConverterTest extends TestCase
{
    /**
     * @dataProvider provideDecode
     */
    public function testDecode(string $expected, string $input): void
    {
        $converter = new Base64UrlConverter();

        static::assertSame($expected, $converter->decode($input));
    }

    public function provideDecode(): \Generator
    {
        yield [
            'expected' => '/a+quick+brown+fox/jumped-over/the_lazy_dog/',
            'input' => 'L2ErcXVpY2srYnJvd24rZm94L2p1bXBlZC1vdmVyL3RoZV9sYXp5X2RvZy8',
        ];
    }

    /**
     * @dataProvider provideEncode
     */
    public function testEncode(string $expected, string $input): void
    {
        $converter = new Base64UrlConverter();

        static::assertSame($expected, $converter->encode($input));
    }

    public function provideEncode(): \Generator
    {
        yield [
            'expected' => 'L2ErcXVpY2srYnJvd24rZm94L2p1bXBlZC1vdmVyL3RoZV9sYXp5X2RvZy8',
            'input' => '/a+quick+brown+fox/jumped-over/the_lazy_dog/',
        ];
    }
}
