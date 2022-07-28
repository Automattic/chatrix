<?php

declare(strict_types=1);

namespace Strobotti\JWK;

use phpseclib\Crypt\RSA;
use phpseclib\Math\BigInteger;
use Strobotti\JWK\Key\KeyInterface;
use Strobotti\JWK\Key\Rsa as RsaKey;
use Strobotti\JWK\Util\Base64UrlConverter;
use Strobotti\JWK\Util\Base64UrlConverterInterface;

/**
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 */
class KeyConverter
{
    /**
     * @var Base64UrlConverterInterface
     */
    private $base64UrlConverter;

    /**
     * KeyConverter constructor.
     */
    public function __construct()
    {
        $this->base64UrlConverter = new Base64UrlConverter();
    }

    /**
     * @since 1.0.0
     */
    public function keyToPem(KeyInterface $key): string
    {
        if (!$key instanceof RsaKey) {
            throw new \InvalidArgumentException();
        }

        /** @var RsaKey $key */
        $rsa = new RSA();

        $modulus = $this->base64UrlConverter->decode($key->getModulus(), true);

        $rsa->loadKey([
            'e' => new BigInteger(\base64_decode($key->getExponent(), true), 256),
            'n' => new BigInteger($modulus, 256),
        ]);

        return $rsa->getPublicKey();
    }
}
