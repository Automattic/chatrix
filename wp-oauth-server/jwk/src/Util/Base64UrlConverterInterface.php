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
interface Base64UrlConverterInterface
{
    /**
     * Decodes Base64url formatted data to a string.
     *
     * @since 1.0.0
     *
     * @param bool $strict
     */
    public function decode(string $data, $strict = false): string;

    /**
     * Encodes a string to a base64url formatted data.
     *
     * @since 1.0.0
     */
    public function encode(string $data): string;
}
