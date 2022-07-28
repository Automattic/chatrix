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
abstract class AbstractKey implements KeyInterface
{
    /**
     * The key type.
     *
     * @var string
     */
    private $kty;

    /**
     * The key ID.
     *
     * @var null|string
     */
    private $kid;

    /**
     * The public key use.
     *
     * @var null|string
     */
    private $use;

    /**
     * The algorithm.
     *
     * @var string
     */
    private $alg;

    /**
     * @since 1.0.0
     *
     * @return false|string
     */
    public function __toString()
    {
        return \json_encode($this->jsonSerialize(), JSON_PRETTY_PRINT);
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0 Protected setter
     * @since 1.2.0 Public setter
     */
    public function setKeyType(string $kty): KeyInterface
    {
        $this->kty = $kty;

        return $this;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     */
    public function getKeyType(): string
    {
        return $this->kty;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.2.0
     */
    public function setKeyId(?string $kid): KeyInterface
    {
        $this->kid = $kid;

        return $this;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     */
    public function getKeyId(): ?string
    {
        return $this->kid;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.2.0
     */
    public function setPublicKeyUse(?string $use): KeyInterface
    {
        $this->use = $use;

        return $this;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     */
    public function getPublicKeyUse(): ?string
    {
        return $this->use;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.2.0
     */
    public function setAlgorithm(string $alg): KeyInterface
    {
        $this->alg = $alg;

        return $this;
    }

    /**
     * {@inheritdoc}
     *
     * @since 1.0.0
     */
    public function getAlgorithm(): string
    {
        return $this->alg;
    }

    /**
     * Returns an array presentation of the key.
     *
     * @since 1.0.0
     *
     * @return array An assoc to be passed to json_encode
     */
    public function jsonSerialize(): array
    {
        $assoc = [
            'kty' => $this->kty,
            'use' => $this->use,
            'alg' => $this->alg,
        ];

        if (null !== $this->kid) {
            $assoc['kid'] = $this->kid;
        }

        return $assoc;
    }

    /**
     * @since 1.0.0
     */
    public static function createFromJSON(string $json, KeyInterface $prototype = null): KeyInterface
    {
        $assoc = \json_decode($json, true);

        if ($prototype) {
            $instance = clone $prototype;
        } else {
            $instance = new static();
        }

        foreach ($assoc as $key => $value) {
            if (!\property_exists($instance, $key)) {
                continue;
            }

            try {
                $instance->{$key} = $value;
            } catch (\Throwable $e) {
                // only set what you can
            }
        }

        return $instance;
    }
}
