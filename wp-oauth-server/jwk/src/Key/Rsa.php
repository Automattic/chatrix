<?php

declare(strict_types=1);

namespace Strobotti\JWK\Key;

/**
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 */
class Rsa extends AbstractKey
{
    /**
     * The modulus for the RSA public key.
     *
     * @var string
     */
    private $n;

    /**
     * The exponent for the RSA public key.
     *
     * @var string
     */
    private $e;

    /**
     * Rsa key constructor.
     */
    public function __construct()
    {
        $this->setKeyType(KeyInterface::KEY_TYPE_RSA);
    }

    /**
     * Sets the exponent for the RSA public key, ie. the `e` field.
     *
     * @since 1.2.0
     */
    public function setExponent(string $e): self
    {
        $this->e = $e;

        return $this;
    }

    /**
     * Returns the exponent for the RSA public key.
     *
     * @since 1.0.0
     */
    public function getExponent(): string
    {
        return $this->e;
    }

    /**
     * Sets the modulus for the RSA public key, ie. the `n` field.
     *
     * @since 1.2.0
     */
    public function setModulus(string $n): KeyInterface
    {
        $this->n = $n;

        return $this;
    }

    /**
     * Returns the modulus for the RSA public key, ie. the `n`field.
     *
     * @since 1.0.0
     */
    public function getModulus(): string
    {
        return $this->n;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     */
    public function jsonSerialize(): array
    {
        $assoc = parent::jsonSerialize();
        $assoc['n'] = $this->n;
        $assoc['e'] = $this->e;

        return $assoc;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     *
     * @return self
     */
    public static function createFromJSON(string $json, KeyInterface $prototype = null): KeyInterface
    {
        if (!$prototype instanceof self) {
            $prototype = new static();
        }

        $instance = parent::createFromJSON($json, $prototype);

        $assoc = \json_decode($json, true);

        foreach ($assoc as $key => $value) {
            if (!\property_exists($instance, $key)) {
                continue;
            }

            $instance->{$key} = $value;
        }

        return $instance;
    }
}
