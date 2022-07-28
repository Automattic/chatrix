<?php

include '../vendor/autoload.php';

use Strobotti\JWK\KeyFactory;

echo "Building an RSA JWK from pem:" . PHP_EOL;

$pem = <<<'EOT'
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4dGQ7bQK8LgILOdLsYzf
ZjkEAoQeVC/aqyc8GC6RX7dq/KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdD
Nq1n52TpxQwI2EqxSk7I9fKPKhRt4F8+2yETlYvye+2s6NeWJim0KBtOVrk0gWvE
Dgd6WOqJl/yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X+Tip84wqwyRpU
lq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll+p/Dg8vAXxJLIJ4SNLcqgFeZe
4OfHLgdzMvxXZJnPp/VgmkcpUdRotazKZumj6dBPcXI/XID4Z4Z3OM1KrZPJNdUh
xwIDAQAB
-----END PUBLIC KEY-----
EOT;

$options = [
    'use' => 'sig',
    'alg' => 'RS256',
    'kid' => 'eXaunmL',
];

$keyFactory = new KeyFactory();
$key = $keyFactory->createFromPem($pem, $options);

echo $key . PHP_EOL . PHP_EOL;

echo "Adding the key to the KeySet:" . PHP_EOL;

$keySet = new \Strobotti\JWK\KeySet();
$keySet->addKey($key);

echo $keySet . PHP_EOL . PHP_EOL;

echo "Fetching the key by it's ID (`kid`) and convert it back to PEM:" . PHP_EOL;

$key = $keySet->getKeyById('eXaunmL');
$pem = (new \Strobotti\JWK\KeyConverter())->keyToPem($key);

echo $pem . PHP_EOL . PHP_EOL;
