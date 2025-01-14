# @danwithabox/nullish

Utilities that pair well with the lovely [nullish coalescing (`??`) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
$ npm install @danwithabox/nullish --save
```

## Overview

The provided utilities are:
- [`nullishMap(value, mapFn)`](#nullishmapvalue-mapfn) - Map a nullish value as if it were non-nullish.
- [`nullishOf(value)`](#nullishofvalue) - Augment a value's type with `null` and `undefined`.

### `nullishMap(value, mapFn)`

```ts
import { nullishMap } from "@danwithabox/nullish";

// Instead of expecting unsafe data,
type Data = { foo: number, bar: number, } /* | null | undefined */;

// define operations on safe data,
function processSafeData(data: Data): number {
    return data.foo + data.bar;
}
// then bridge the safety gap with `nullishMap()`
function handleUnsafeData(unsafeData: Data | null | undefined): number {
    return nullishMap(unsafeData, processSafeData) ?? 0;
}

// or use it in any other way to make more concise code
function greet(data?: { name: string, surname: string, } | null): string {
    return nullishMap(data, data => `Hello, ${data.name} ${data.surname}!`) ?? `Hi there!`;
    // Note the lack of branches and optional chaining (?.) operators, it's just one succinct line
}

console.log(greet({ name: `Daniel`, surname: `Withabox`, }));
// Hello, Daniel Withabox!

console.log(greet());
// Hi there!
```

Map a nullish value as if it were non-nullish.

The result retains either `null`, or `undefined`, or both, or neither, depending on what's inferred from the input value.

Practically, the possible mappings are:

- `T | null | undefined` => `R | null | undefined`
  ```ts
  const val = 0 as number | null | undefined;
  const res = nullishMap(val, val => `${val}`);
  //    ^ string | null | undefined
  ```

- `T | undefined` => `R | undefined`
  ```ts
  const val = 0 as number | undefined;
  const res = nullishMap(val, val => `${val}`);
  //    ^ string | undefined
  ```

- `T | null` => `R | null`
  ```ts
  const val = 0 as number | null;
  const res = nullishMap(val, val => `${val}`);
  //    ^ string | null
  ```

- `T` => `R` _(not terribly useful, but it's allowed for simplicity's sake)_
  ```ts
  const val = 0 as number;
  const res = nullishMap(val, val => `${val}`);
  //    ^ string
  ```

### `nullishOf(value)`

```ts
import { nullishMap, nullishOf } from "@danwithabox/nullish";

// Optional value declaration: the type is inferred and made optional without any manual typing
let complicatedDeclaration = nullishOf({
    foo: 1,
    bar: { baz: 2, },
});

function calculate(): number {
    // Handle the value as if it weren't optional
    return nullishMap(complicatedDeclaration, _ => _.foo + _.bar.baz) ?? 0;
}

console.log(calculate());
// 3

complicatedDeclaration = null; // assignment does not cause a type error
console.log(calculate());
// 0
```

Augment a value's type with `null` and `undefined`.

Zero performance impact at runtime, as it is simply an identity function, and it most likely gets inlined.

Useful in a few common situations:

- Making an inferred type optional at variable declaration, since something like https://github.com/microsoft/TypeScript/issues/13321 is not yet possible:
  ```ts
  let optional = nullishOf({ foo: 1, bar: 2, }) ?? void 0;
  //  ^ { foo: number; bar: number; } | undefined
  ```

- Safely accessing arrays without enabling `noUncheckedIndexedAccess` in `tsconfig.json`:
  ```ts
  const myArray = [0, , 2].map(n => Boolean(n));

  // Without `noUncheckedIndexedAccess`:
  let element = myArray[1];
  //  ^ `boolean`
  //    this is incorrect, due to the empty element

  // With manual typing:
  let maybeElement1 = myArray[1] as undefined | (typeof myArray)[number];
  //  ^ `boolean | undefined`
  //    correct, but a hassle to type

  // With `nullishOf`:
  let maybeElement2 = nullishOf(myArray[1]);
  //  ^ `boolean | null | undefined`
  //    correct enough: it has an extraneous `null`, but that's fine in most   situations

  // And if you want to narrow to either `null` or `undefined`:
  let maybeElement3 = nullishOf(myArray[1]) ?? null;
  //  ^ `boolean | null`
  //     correct

  let maybeElement4 = nullishOf(myArray[1]) ?? void 0;
  //  ^ `boolean | undefined`
  //     correct
  ```

## Acknowledgements

Motivation to release this, and a realization that not only I needed such a thing, came from:
- [javascript - Opposite of nullish coalescing operator - Stack Overflow](https://stackoverflow.com/questions/62929428/opposite-of-nullish-coalescing-operator)
- ['maybe' operator to complement ?? operator - 💡 Ideas - TC39](https://es.discourse.group/t/maybe-operator-to-complement-operator/200)
- [Optional projection / expression operator - e.g. maybeNullish ?:: transform(maybeNullish) - 💡 Ideas - TC39](https://es.discourse.group/t/optional-projection-expression-operator-e-g-maybenullish-transform-maybenullish/572)
- [[syntax] Inverse null coalescing operator - 💡 Ideas - TC39](https://es.discourse.group/t/syntax-inverse-null-coalescing-operator/547)
