export type Locale = 'en-GB' | 'nl-NL';
export type Direction = 'ltr' | 'rtl';

export type Dictionary<Definition extends Branch> = Readonly<{
    locale: Locale;
    items: Definition;
}>;

type Key<Definition extends Entry> = Leaves<Definition>;

type Entry = Branch | Leaf;

type Branch = Readonly<{
    [key: string]: Entry;
}>;

type Leaf =
    | Translation
    | Readonly<{
          other: Translation;
          few?: Translation;
          many?: Translation;
          zero?: Translation;
          one?: Translation;
          two?: Translation;
      }>;

type TemplateCallback<Args extends ValidArg[]> = (
    ctx: { number: (value: number, options?: NumberFormatOptions) => string },
    ...args: Args
) => string;

type ValidArg = string | number;
type ValidArgs<T extends (...args: ValidArg[]) => string> = T extends (...args: infer Args) => string ? Args : never;

type Translation<T extends string | ((...args: ValidArg[]) => string) = string> = T extends string
    ? string
    : T extends (...args: ValidArg[]) => string
    ? TemplateCallback<ValidArgs<T>>
    : never;

export type Context<Definition extends Branch> = {
    locale: Locale;
    dictionary: Dictionary<Definition>;
    args: any[];
};

export type Provider<Definition extends Branch> = {
    translate(key: Key<Definition>, context: Context<Definition>): string;
};
