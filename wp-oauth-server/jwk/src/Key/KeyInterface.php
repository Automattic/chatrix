<?php

declare(strict_types=1);

namespace Strobotti\JWK\Key;

/**
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 *
 * @method array jsonSerialize()
 */
interface KeyInterface extends \JsonSerializable
{
    /**
     * @since 1.0.0
     */
    public const KEY_TYPE_RSA = 'RSA';

    /**
     * @since 1.0.0
     *
     * @todo Model currently not implemented
     */
    public const KEY_TYPE_OKP = 'OKP';

    /**
     * @since 1.0.0
     *
     * @todo Model currently not implemented
     */
    public const KEY_TYPE_EC = 'EC';

    public const PUBLIC_KEY_USE_SIGNATURE = 'sig';
    public const PUBLIC_KEY_USE_ENCRYPTION = 'enc';

    public const ALGORITHM_RS256 = 'RS256';

    /**
     * Converts this key to a string.
     *
     * @since 1.0.0
     *
     * @return bool|string
     */
    public function __toString();

    /**
     * Sets the key type, ie. the value for the `kty` field.
     *
     * See the KEY_TYPE_* constants for reference.
     *
     * @return KeyInterface
     *
     * @since 1.2.0
     */
    public function setKeyType(string $kty): self;

    /**
     * Gets the key type, ie. the value of the `kty` field.
     *
     * @since 1.0.0
     */
    public function getKeyType(): string;

    /**
     * Sets the key id, ie. the value of the `kid` field.
     *
     * @return KeyInterface
     *
     * @since 1.2.0
     */
    public function setKeyId(?string $kid): self;

    /**
     * Gets the key id, ie. the value of the `kid` field.
     *
     * @since 1.0.0
     */
    public function getKeyId(): ?string;

    /**
     * Sets the public key use, ie. the value of the `use` field.
     *
     * @return KeyInterface
     *
     * @since 1.2.0
     */
    public function setPublicKeyUse(?string $use): self;

    /**
     * Gets the public key use, ie. the value of the `use` field.
     *
     * @since 1.0.0
     */
    public function getPublicKeyUse(): ?string;

    /**
     * Sets the cryptographic algorithm used to sign the key, ie. the value of the `alg` field.
     *
     * @return KeyInterface
     *
     * @since 1.2.0
     */
    public function setAlgorithm(string $alg): self;

    /**
     * Gets the cryptographic algorithm used to sign the key, ie. the value of the `alg` field.
     *
     * @since 1.0.0
     */
    public function getAlgorithm(): string;
}
