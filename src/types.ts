import { DefaultTheme } from 'styled-components';

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type Split<S extends string> =
    S extends `${infer T}.${infer U}` ? [T, ...Split<U>] : [S];

export type DotNestedKeys<T> = (T extends object ?
    { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
    : "") extends infer D ? Extract<D, string> : never;

export type ThemeColor = DotNestedKeys<DefaultTheme['pallete']>;
