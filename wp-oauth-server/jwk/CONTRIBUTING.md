# Contributing to php-jwk

This is a very small library with a very limited scope but if you want to contribute please feel free to do so.

## How can I contribute?

### Reporting bugs

You can open [a new issue](https://github.com/Strobotti/php-jwk/issues) once you have checked one covering your issue hasn't been opened yet.

### Open a pull-request

If you want to fix a bug or add a missing feature you can open a new pull-request.

Please note that you need a PHP 7.2 or later for using this library (including running the tests).

Basic steps:

1. Fork this repository
1. Clone it locally
1. Install dependencies with Composer
    ```bash
    $ composer install
    ```
1. Create a branch on your fork
1. Commit & push
1. Open a pull-request from your branch
1. Profit

Some guidelines:

1. Before committing make sure to format the code accordingly:
    ```bash
    $ make php-cs-fixer-fix
    ```
1. Also make sure the tests pass successfully and you have sufficient coverage
    ```bash
    $ make test-unit
    ```

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less

## License

[MIT](https://github.com/Strobotti/php-jwk/blob/master/LICENSE)
