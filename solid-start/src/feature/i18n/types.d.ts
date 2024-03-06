export type Locale = 'en-GB' | 'nl-NL';
export type Direction = 'ltr' | 'rtl';

export type Dictionary<Definition extends Branch> = Readonly<{
    locale: Locale;
    items: Definition;
}>;

type Key<Definition extends Entry> = Leaves<Definition>;

type Entry = Branch|Leaf;

type Branch = Readonly<{
    [key: string]: Entry;
}>;

type Leaf = Translation | Readonly<{
    other: Translation;
    few?: Translation;
    many?: Translation;
    zero?: Translation;
    one?: Translation;
    two?: Translation;
}>;

type Translation = string | ((...args: any[]) => string);

export type Context<Definition extends Branch> = {
    locale: Locale;
    dictionary: Dictionary<Definition>;
};

export type Provider<Definition extends Branch> = {
    translate(key: Key<Definition>, context: Context<Definition>): string
};