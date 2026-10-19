# varlit
> Simple literal template interpolate with context object.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/varlit
```

## usage
```js
import varlit from '@jswork/varlit';

const str = '${GITHUB_API_TOKEN} - ${afei}';
const ctx = {
  GITHUB_API_TOKEN: 'xxx-yyy-zzz',
  afei: 'zhengfei'
};

varlit(str, ctx);

// 'xxx-yyy-zzz - zhengfei'

// nested paths are supported too
varlit('${adress.detail.street}', { adress: { detail: { street: 'main st' } } });

// 'main st'
```

> Notes:
> - Only plain `${variable}` names (and nested paths like `a.b.c`) are replaced — no expressions are evaluated.
> - Whitespace inside the braces is trimmed: `${ afei }` === `${afei}`.
> - Unknown keys keep the original `${xxx}` text; `null`/`undefined` values become `''`.
> - An invalid `ctx` (null/undefined/not an object) returns the original string.

## license
Code released under [the MIT license](https://github.com/afeiship/varlit/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/varlit
[version-url]: https://npmjs.org/package/@jswork/varlit

[license-image]: https://img.shields.io/npm/l/@jswork/varlit
[license-url]: https://github.com/afeiship/varlit/blob/main/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/varlit
[download-url]: https://www.npmjs.com/package/@jswork/varlit
