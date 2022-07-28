<?php

declare(strict_types=1);

namespace Strobotti\JWK;

use Strobotti\JWK\Key\KeyInterface;

/**
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 */
class KeySet implements \JsonSerializable, \Countable, \IteratorAggregate
{
    /**
     * @var KeyFactory
     */
    private $keyFactory;

    /**
     * @var KeyInterface[]
     */
    private $keys = [];

    /**
     * KeySet constructor.
     */
    public function __construct()
    {
        $this->setKeyFactory(new KeyFactory());
    }

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
     * @since 1.0.0
     */
    public function setKeyFactory(KeyFactory $keyFactory): self
    {
        $this->keyFactory = $keyFactory;

        return $this;
    }

    /**
     * @since 1.0.0 Only $kid parameter
     * @since 1.1.0 Added optional $use parameter
     */
    public function containsKey(string $kid, string $use = KeyInterface::PUBLIC_KEY_USE_SIGNATURE): bool
    {
        return null !== $this->getKeyById($kid, $use);
    }

    /**
     * @since 1.0.0
     * @since 1.1.0 Added optional $use parameter
     */
    public function getKeyById(string $kid, string $use = KeyInterface::PUBLIC_KEY_USE_SIGNATURE): ?KeyInterface
    {
        foreach ($this->getKeys() as $key) {
            if ($key->getKeyId() === $kid && $key->getPublicKeyUse() === $use) {
                return $key;
            }
        }

        return null;
    }

    /**
     * @since 1.0.0
     *
     * @return KeySet
     */
    public function addKey(KeyInterface $key): self
    {
        if ($key->getKeyId() && $this->containsKey($key->getKeyId(), $key->getPublicKeyUse())) {
            throw new \InvalidArgumentException(\sprintf('Key with id `%s` and use `%s` already exists in the set', $key->getKeyId(), $key->getPublicKeyUse()));
        }

        $this->keys[] = $key;

        return $this;
    }

    /**
     * @return KeyInterface[]
     */
    public function getKeys(): array
    {
        return \array_values($this->keys);
    }

    /**
     * @since 1.0.0
     */
    public function jsonSerialize(): array
    {
        $ret = [];

        foreach ($this->getKeys() as $key) {
            $ret[$key->getKeyId()] = $key->jsonSerialize();
        }

        return [
            'keys' => \array_values($ret),
        ];
    }

    /**
     * @since 1.3.0
     */
    public function count(): int
    {
        return \count($this->keys);
    }

    /**
     * @since 1.3.0
     */
    public function getIterator(): \ArrayIterator
    {
        return new \ArrayIterator($this->keys);
    }
}
