export type Locale = 'en-GB' | 'nl-NL' | 'de-DE' | 'ar-EG' | 'jp-JP';
export type Direction = 'ltr' | 'rtl';
export type WritingMode = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';

export type Dictionary<Definition extends Branch<AnyTranslation>> = Readonly<{
    locale: Locale;
    direction: Direction;
    writingMode: WritingMode;
    items: Definition;
}>;

type AnySimpleTranslation = string;
type AnyComplexTranslation = Readonly<{
    other: string;
    few?: string;
    many?: string;
    zero?: string;
    one?: string;
    two?: string;
}>;
type AnyFunctionTranslation = (...args: any[]) => string;
type AnyTranslation = AnySimpleTranslation | AnyComplexTranslation | AnyFunctionTranslation;
type AnyBranch = { [key: string]: Entry<AnyEntry> };
type AnyEntry = AnyTranslation | AnyBranch;

type Entry<T extends AnyEntry = string> = T extends AnyBranch
    ? Branch<T>
    : T extends AnyTranslation
    ? Translation<T>
    : never;

type Branch<T extends AnyBranch> = {
    readonly [K in keyof T]: Entry<T[K]>;
};

type TemplateCallback<Args extends ValidArg[]> = (
    ctx: { number: (value: number, options?: NumberFormatOptions) => string; t: (key: Key<AnyBranch>) => string },
    ...args: Args
) => string;

type ValidArg = string | number;
type ValidArgs<T extends (...args: ValidArg[]) => string> = T extends (...args: infer Args) => string ? Args : never;

type Translation<T extends AnyTranslation = string> = T extends string
    ? string
    : T extends AnyFunctionTranslation
    ? TemplateCallback<ValidArgs<T>>
    : T extends AnyComplexTranslation
    ? T
    : never;

type Key<Definition extends AnyBranch> = Leaves<Definition>;

type DepthLimit = [never, 0, 1, 2, 3, 4];
export type Leaves<T, Depth extends number = 5> = DepthLimit[Depth] extends never
    ? never
    : T extends AnyTranslation
    ? never
    : T extends object
    ? {
          [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K], DepthLimit[Depth]> extends never
              ? ''
              : `.${Leaves<T[K], DepthLimit[Depth]>}`}`;
      }[keyof T]
    : never;

export type Context<Definition extends AnyBranch> = {
    locale: Locale;
    dictionary: Dictionary<Definition>;
    args: any[];
};

export type Provider<Definition extends AnyBranch> = {
    t(key: Key<Definition>, context: Context<Definition>): string;
};
