# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.3](https://github.com/sonrad10/whide-treeLang/compare/v1.5.2...v1.5.3) (2021-05-10)


### Bug Fixes

* updated dependencies with security vulnerabilities ([bca355c](https://github.com/sonrad10/whide-treeLang/commit/bca355c4510e819fc442cd36c7eea05baeb392f7))

### [1.5.2](https://github.com/sonrad10/whide-treeLang/compare/v1.5.1...v1.5.2) (2021-05-03)


### Bug Fixes

* fixed error when importing library in other modules ([eccd7ac](https://github.com/sonrad10/whide-treeLang/commit/eccd7acd9b11a13286c9cf236ece58e36994a600))

### [1.5.1](https://github.com/sonrad10/whide-treeLang/compare/v1.5.0...v1.5.1) (2021-05-03)


### Bug Fixes

* fixed wrong initial folder location ([45c4542](https://github.com/sonrad10/whide-treeLang/commit/45c45422e162e7b5c20f17a271aba6fb21205f9e))

## [1.5.0](https://github.com/sonrad10/whide-treeLang/compare/v1.4.0...v1.5.0) (2021-05-03)


### Features

* added boolean support to the tree parser ([3aa3012](https://github.com/sonrad10/whide-treeLang/commit/3aa3012adcbe688c1600c161fad969e041308d02))
* added support for HWhile's programs-as-data representation ([7e4c6a8](https://github.com/sonrad10/whide-treeLang/commit/7e4c6a8e513f4b59118596e16c5bd170006b9594))
* added support for lists to the tree parser ([46bceb0](https://github.com/sonrad10/whide-treeLang/commit/46bceb017a88910ad580566b79691535ab2660cf))
* added support for numbers in binary trees ([cae8056](https://github.com/sonrad10/whide-treeLang/commit/cae80567a588fdfba097d0d0a15c1213092101a0))
* added tree parser from https://github.com/sonrad10/hwhile-wrapper ([7b0224e](https://github.com/sonrad10/whide-treeLang/commit/7b0224e6d509e4cc1c2bdb13377d19594859673e))

## [1.4.0](https://github.com/sonrad10/whide-treeLang/compare/v1.3.1...v1.4.0) (2021-05-02)


### Features

* added support for converting trees using number literals ([e1d7c9d](https://github.com/sonrad10/whide-treeLang/commit/e1d7c9d5f1fcdb446808ab35d08893bef9aaf28e))

### [1.3.1](https://github.com/sonrad10/whide-treeLang/compare/v1.3.0...v1.3.1) (2021-05-02)


### Bug Fixes

* stopped stringified booleans displaying in quotes ([ac6c154](https://github.com/sonrad10/whide-treeLang/commit/ac6c15475791387ef2da5eeda41de7c772bf175f))

## [1.3.0](https://github.com/sonrad10/whide-treeLang/compare/v1.2.3...v1.3.0) (2021-05-02)


### Features

* added support for 'true', 'false', 'bool', and 'boolean' to the language ([66840fe](https://github.com/sonrad10/whide-treeLang/commit/66840fe7a733d5d4f6695340013ffe1ba595cea3))
* added support for custom atomic values to the tree language ([8304ad4](https://github.com/sonrad10/whide-treeLang/commit/8304ad42fede2ca22007e42b10f6f35e20f5ed8b))


### Bug Fixes

* fixed typo ([9451074](https://github.com/sonrad10/whide-treeLang/commit/9451074d81e2bdb0634acf560e21bf6dcfc04e16))

### [1.2.3](https://github.com/sonrad10/whide-treeLang/compare/v1.2.2...v1.2.3) (2021-04-08)


### Bug Fixes

* added missing parser tests for invalid token lists ([605e0ef](https://github.com/sonrad10/whide-treeLang/commit/605e0ef1ed99909eb7e4748569f3865f2671b89f))
* improved unexpected token error message ([dc43c73](https://github.com/sonrad10/whide-treeLang/commit/dc43c73e3a972369658b821d2a7a09f1daaffa59))

### [1.2.2](https://github.com/sonrad10/whide-treeLang/compare/v1.2.1...v1.2.2) (2021-04-04)


### Bug Fixes

* fixed wrong index file path ([edc5a2c](https://github.com/sonrad10/whide-treeLang/commit/edc5a2c19153ea3f811234eda92aa86753183642))

### [1.2.1](https://github.com/sonrad10/whide-treeLang/compare/v1.2.0...v1.2.1) (2021-04-04)


### Bug Fixes

* fixed wrong source path ([b061b7d](https://github.com/sonrad10/whide-treeLang/commit/b061b7dd94cc6c0fb3d2a1556b183e1169e88937))

## [1.2.0](https://github.com/sonrad10/whide-treeLang/compare/v1.1.1...v1.2.0) (2021-04-04)


### Features

* added value `[]` to the parent list element node ([fa9bd7a](https://github.com/sonrad10/whide-treeLang/commit/fa9bd7ae096895369f290c3a7ae254fd3e228797))
* made empty list nodes and terminators display not as nil ([3d7f65f](https://github.com/sonrad10/whide-treeLang/commit/3d7f65f98365d6431d3b8c7f21bdb342ae57827d))

### [1.1.1](https://github.com/sonrad10/whide-treeLang/compare/v1.1.0...v1.1.1) (2021-04-03)


### Bug Fixes

* added exports for tree types ([eab8a69](https://github.com/sonrad10/whide-treeLang/commit/eab8a69198c022da4d0264b6821374d0ea95fefa))

## 1.1.0 (2021-04-03)


### Features

* added a lexer for the language ([2142bb8](https://github.com/sonrad10/whide-treeLang/commit/2142bb8fb09115aa9f0f39884b7686b09a501651))
* added a parser as an intermediate step between lexing and conversion ([0abffcd](https://github.com/sonrad10/whide-treeLang/commit/0abffcdb6807747235cb9f7bd00d777b2987c42c))
* added exported methods to use this as a module ([209c349](https://github.com/sonrad10/whide-treeLang/commit/209c349d3889f473ff5fdec9fe1b689c81f278c1))
* added lexer support for counters ([f094629](https://github.com/sonrad10/whide-treeLang/commit/f094629147f02a7324fe4908eb70ef7ef63abbac))
* added matching support for tree strings ([b092e47](https://github.com/sonrad10/whide-treeLang/commit/b092e4746ca9be3a9b0567e39628f3738b1dd11c))
* added support for `...` at the end of a fixed list meaning "allow anything" ([a42789e](https://github.com/sonrad10/whide-treeLang/commit/a42789e936ae08014e865738c3c967d35c8fe121))
* added support for converting trees with `nil`/`int`/`any` tokens ([1781867](https://github.com/sonrad10/whide-treeLang/commit/178186789726aba874f0ca139b7245d0d5e3f4de))
* added support for parsing fixed type lists ([fcea181](https://github.com/sonrad10/whide-treeLang/commit/fcea181fbecf177992bb7335145692bf4f5160e3))
* added tests for unexpected tokens ([76f826c](https://github.com/sonrad10/whide-treeLang/commit/76f826c50d464dd0da9b68b1fdb523db45c5f636))
* extracted expecting tokens to its own method ([cc72779](https://github.com/sonrad10/whide-treeLang/commit/cc7277906c047c7c50dc0b85f6a6e4ef8c778cbb))
* implemented the converter to perform a boolean match with a binary tree against a conversion tree ([e546fa4](https://github.com/sonrad10/whide-treeLang/commit/e546fa4afa365cd49772bbed4f50f35691fa0787))
* made parser treat [] as an `any` input ([53e7dbc](https://github.com/sonrad10/whide-treeLang/commit/53e7dbc956ba5340f303b805bd27cd17ef776e12))
* made the converter convert trees using the result of the parser ([99cf3a5](https://github.com/sonrad10/whide-treeLang/commit/99cf3a507577d010c7a7dc69ec9dd2743b551d2c))
* removed support for TKN_DOTS because it is basically unnecessary and a lot of work ([b981815](https://github.com/sonrad10/whide-treeLang/commit/b981815b0b4db7294fbcee3e28f9f22da2e36771))
* renamed runConvert.ts to converter.ts ([f6c965d](https://github.com/sonrad10/whide-treeLang/commit/f6c965d4bc6d8eb6ba84761498ce36915cf463e2))


### Bug Fixes

* added some tests from TODOs ([5392da8](https://github.com/sonrad10/whide-treeLang/commit/5392da8a8a2536b25deb9cfe88f649739a6f18d2))
* disabled eslint no-explicit-any rule ([664d802](https://github.com/sonrad10/whide-treeLang/commit/664d802fb0cad849ab862359709bf5ba9511b3c5))
* fixed failing test from typescript error ([789e901](https://github.com/sonrad10/whide-treeLang/commit/789e90198b14a214e8d6078cb348d253d7cf994c))
* moved token type check so that it is run every time an atom is read ([0a0d3e9](https://github.com/sonrad10/whide-treeLang/commit/0a0d3e937547bbc45a9165e60e491be6caac860f))
* reformatted lexer tests file ([f3fa3bf](https://github.com/sonrad10/whide-treeLang/commit/f3fa3bfd92cb6956f841997e2f3374a05fba5aa9))
