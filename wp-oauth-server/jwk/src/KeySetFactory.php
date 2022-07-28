<?php

declare(strict_types=1);

namespace Strobotti\JWK;

/**
 * @author  Juha Jantunen <juha@strobotti.com>
 * @license https://opensource.org/licenses/MIT MIT
 *
 * @see    https://github.com/Strobotti/php-jwk
 * @since 1.0.0
 */
class KeySetFactory
{
    /**
     * @var KeyFactory
     */
    private $keyFactory;

    /**
     * KeySet constructor.
     */
    public function __construct()
    {
        $this->setKeyFactory(new KeyFactory());
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
     * @since 1.0.0
     */
    public function createFromJSON(string $json): KeySet
    {
        $assoc = \json_decode($json, true);

        $instance = new KeySet();

        foreach ($assoc['keys'] as $keyData) {
            $key = $this->keyFactory->createFromJson(\json_encode($keyData));

            $instance->addKey($key);
        }

        return $instance;
    }
}
