# php-jwk

[![Latest Stable Version](https://poser.pugx.org/strobotti/php-jwk/v/stable)](https://packagist.org/packages/strobotti/php-jwk)
[![codecov](https://codecov.io/gh/Strobotti/php-jwk/branch/master/graph/badge.svg)](https://codecov.io/gh/Strobotti/php-jwk)
[![Build Status](https://travis-ci.com/Strobotti/php-jwk.svg?branch=master)](https://travis-ci.com/Strobotti/php-jwk)
[![License](https://poser.pugx.org/strobotti/php-jwk/license)](https://packagist.org/packages/strobotti/php-jwk)

A small PHP library to handle JWKs (Json Web Keys)

This library helps to create json web key sets from PEM and is also able to pull out PEMs from json web key sets.

Please note that **only RSA keys are supported at the moment!**

See [JSON Web Key RFC](https://tools.ietf.org/html/rfc7517) for reference.

## Installation

This library requires PHP version 7.2 or higher and can be installed with composer:

```bash
$ composer require strobotti/php-jwk
```

## Example usage

See full example [here](examples/full-flow.php).

### Create a key-object from PEM

```php
<?php

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

$keyFactory = new Strobotti\JWK\KeyFactory();
$key = $keyFactory->createFromPem($pem, $options);

echo "$key";
```

Outputs:

```json
{
    "kty": "RSA",
    "use": "sig",
    "alg": "RS256",
    "kid": "eXaunmL",
    "n": "4dGQ7bQK8LgILOdLsYzfZjkEAoQeVC_aqyc8GC6RX7dq_KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdDNq1n52TpxQwI2EqxSk7I9fKPKhRt4F8-2yETlYvye-2s6NeWJim0KBtOVrk0gWvEDgd6WOqJl_yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X-Tip84wqwyRpUlq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll-p_Dg8vAXxJLIJ4SNLcqgFeZe4OfHLgdzMvxXZJnPp_VgmkcpUdRotazKZumj6dBPcXI_XID4Z4Z3OM1KrZPJNdUhxw",
    "e": "AQAB"
}
```

### Create a JWK set (jwks) from a key

```php
<?php
// ...pick up from the previous example

$keySet = new \Strobotti\JWK\KeySet();
$keySet->addKey($key);

echo "$keySet" ;

```

Outputs:

```json
{
    "keys": [
        {
            "kty": "RSA",
            "use": "sig",
            "alg": "RS256",
            "kid": "eXaunmL",
            "n": "4dGQ7bQK8LgILOdLsYzfZjkEAoQeVC_aqyc8GC6RX7dq_KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdDNq1n52TpxQwI2EqxSk7I9fKPKhRt4F8-2yETlYvye-2s6NeWJim0KBtOVrk0gWvEDgd6WOqJl_yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X-Tip84wqwyRpUlq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll-p_Dg8vAXxJLIJ4SNLcqgFeZe4OfHLgdzMvxXZJnPp_VgmkcpUdRotazKZumj6dBPcXI_XID4Z4Z3OM1KrZPJNdUhxw",
            "e": "AQAB"
        }
    ]
}
```

### Get a key from keyset by `kid` and convert it to PEM

```php
<?php
// ...pick up from the previous example

$key = $keySet->getKeyById('eXaunmL');
$pem = (new \Strobotti\JWK\KeyConverter())->keyToPem($key);

echo "$pem";

```

Outputs:

```text
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4dGQ7bQK8LgILOdLsYzf
ZjkEAoQeVC/aqyc8GC6RX7dq/KvRAQAWPvkam8VQv4GK5T4ogklEKEvj5ISBamdD
Nq1n52TpxQwI2EqxSk7I9fKPKhRt4F8+2yETlYvye+2s6NeWJim0KBtOVrk0gWvE
Dgd6WOqJl/yt5WBISvILNyVg1qAAM8JeX6dRPosahRVDjA52G2X+Tip84wqwyRpU
lq2ybzcLh3zyhCitBOebiRWDQfG26EH9lTlJhll+p/Dg8vAXxJLIJ4SNLcqgFeZe
4OfHLgdzMvxXZJnPp/VgmkcpUdRotazKZumj6dBPcXI/XID4Z4Z3OM1KrZPJNdUh
xwIDAQAB
-----END PUBLIC KEY-----
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.
