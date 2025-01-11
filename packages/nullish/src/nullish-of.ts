/**
 * Augment a value's type with `null` and `undefined`.
 *
 * Zero performance impact at runtime, as it is simply an identity function, and it most likely gets inlined.
 *
 * Useful in a few common situations:
 *
 * ---
 *
 * Making an inferred type optional at variable declaration, since something like https://github.com/microsoft/TypeScript/issues/13321 is not yet possible:
 * ```ts
 * let optional = nullishOf({ foo: 1, bar: 2, }) ?? void 0;
 * //  ^ { foo: number; bar: number; } | undefined
 * ```
 * ---
 * Safely accessing arrays without enabling `noUncheckedIndexedAccess` in `tsconfig.json`:
 * ```ts
 * const myArray = [0, , 2].map(n => Boolean(n));
 *
 * // Without `noUncheckedIndexedAccess`:
 * let element = myArray[1];
 * //  ^ `boolean`
 * //    this is incorrect, due to the empty element
 *
 * // With manual typing:
 * let maybeElement1 = myArray[1] as undefined | (typeof myArray)[number];
 * //  ^ `boolean | undefined`
 * //    correct, but a hassle to type
 *
 * // With `nullishOf`:
 * let maybeElement2 = nullishOf(myArray[1]);
 * //  ^ `boolean | null | undefined`
 * //    correct enough: it has an extraneous `null`, but that's fine in most situations
 *
 * // And if you want to narrow to either `null` or `undefined`:
 * let maybeElement3 = nullishOf(myArray[1]) ?? null;
 * //  ^ `boolean | null`
 * //    correct
 * let maybeElement4 = nullishOf(myArray[1]) ?? void 0;
 * //  ^ `boolean | undefined`
 * //    correct
 * ```
 */
export function nullishOf<T>(value: T): T | null | undefined {
    return value;
}
