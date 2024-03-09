export type Locale = 'en-GB' | 'nl-NL';
export type Direction = 'ltr' | 'rtl';

export type Dictionary<Definition extends Branch<AnyTranslation>> = Readonly<{
    locale: Locale;
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

type Entry<T extends AnyEntry = string> = T extends AnyBranch ? Branch<T> : T extends AnyTranslation ? Leaf<T> : never;

type Branch<T extends AnyBranch> = {
    readonly [K in keyof T]: Entry<T[K]>;
};

type Leaf<T extends AnyTranslation = string> =
    | Translation<T>
    | Readonly<{
          other: Translation<T>;
          few?: Translation<T>;
          many?: Translation<T>;
          zero?: Translation<T>;
          one?: Translation<T>;
          two?: Translation<T>;
      }>;

type TemplateCallback<Args extends ValidArg[]> = (
    ctx: { number: (value: number, options?: NumberFormatOptions) => string },
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

type Leaves<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
}[keyof T] : never

export type Context<Definition extends AnyBranch> = {
    locale: Locale;
    dictionary: Dictionary<Definition>;
    args: any[];
};

export type Provider<Definition extends AnyBranch> = {
    translate(key: Key<Definition>, context: Context<Definition>): string;
};
