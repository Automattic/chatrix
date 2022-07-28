<?php

declare(strict_types=1);

namespace Strobotti\JWK\Util;

/**
 * Base64UrlConverter is a util for converting to and from Bas64url formatted data.
 *
 * @see https://tools.ietf.org/html/rfc4648#section-5
 *
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 */
class Base64UrlConverter implements Base64UrlConverterInterface
{
    /**
     * {@inheritdoc}
     */
    public function decode(string $data, $strict = false): string
    {
        $b64 = \strtr($data, '-_', '+/');

        return \base64_decode($b64, $strict);
    }

    /**
     * {@inheritdoc}
     */
    public function encode(string $data): string
    {
        return \rtrim(\strtr(\base64_encode($data), '+/', '-_'), '=');
    }
}
