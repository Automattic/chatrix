<?php

return \PhpCsFixer\Config::create()
    ->setFinder(
        \PhpCsFixer\Finder::create()
            ->in(__DIR__ . '/src')
            ->in(__DIR__ . '/tests')
    )
    ->setRiskyAllowed(true)
    ->setRules([
        '@PhpCsFixer' => true,
        '@PhpCsFixer:risky' => true,
        '@PHP71Migration' => true,
        '@PHP71Migration:risky' => true,
        '@DoctrineAnnotation' => true,
        '@PHPUnit60Migration:risky' => true,
        'native_function_invocation' => true,
        'header_comment' => ['header' => ''],
        'method_chaining_indentation' => false,
        'php_unit_test_class_requires_covers' => false,
    ])
    ;
