/**
 * Map a nullish value as if it were non-nullish.
 *
 * The result retains either `null`, or `undefined`, or both, or neither, depending on what's inferred from the input value.
 *
 * Practically, the possible mappings are:
 *
 * ---
 *
 * `T | null | undefined` => `R | null | undefined`
 * ```ts
 * const val = 0 as number | null | undefined;
 * const res = nullishMap(val, val => `${val}`);
 * //    ^ string | null | undefined
 * ```
 *
 * ---
 *
 * `T | undefined` => `R | undefined`
 * ```ts
 * const val = 0 as number | undefined;
 * const res = nullishMap(val, val => `${val}`);
 * //    ^ string | undefined
 * ```
 *
 * ---
 *
 * `T | null` => `R | null`
 * ```ts
 * const val = 0 as number | null;
 * const res = nullishMap(val, val => `${val}`);
 * //    ^ string | null
 * ```
 *
 * ---
 *
 * `T` => `R` _(not terribly useful, but it's allowed for simplicity's sake)_
 * ```ts
 * const val = 0 as number;
 * const res = nullishMap(val, val => `${val}`);
 * //    ^ string
 * ```
 *
 */
export function nullishMap<T, R>(value: T, mapFn: (value: NonNullable<T>) => R): NullishMap<T, R> {
    if ((value !== null) && (value !== void 0)) return mapFn(value) as NullishMap<T, R>;
    return value as NullishMap<T, R>;
}
/**
 * Union of `R`, and either `null`, `undefined`, or both, depending on which of the two are constituents of `T`.
 *
 * @see {@link nullishMap}
 */
export type NullishMap<T, R> = T extends null ? null : T extends undefined ? undefined : R;
