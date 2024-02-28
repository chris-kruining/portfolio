type Whitespace = '\n' | '\t' | '\r' | ' ';
type EndOfInput = '';

type Split<UnprocessedInput extends string, SplitOn extends Whitespace = Whitespace, Current extends string = '', Result extends string[] = []> = UnprocessedInput extends EndOfInput
    ? Current extends EndOfInput
        ? Result
        : [...Result, Current]
    : UnprocessedInput extends `${infer Head}${infer Rest}`
        ? Head extends SplitOn
            ? Current extends EndOfInput
                ? Split<Rest, SplitOn, Current, Result>
                : Split<Rest, SplitOn, '', [...Result, Current]>
            : Split<Rest, SplitOn, `${Current}${Head}`, Result>
        : [never];

type TrimLeft<T extends string> = T extends `${Whitespace}${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer R}${Whitespace}` ? TrimRight<R> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;

type Rule<T extends string> = T extends `${infer Property}:${Whitespace|''}${infer Value};` 
    ? { property: Trim<Property>, value: Value }
    : never
;

type RuleList<T extends string[]> = {
    [R in Rule<T[number]> as R['property'] ]: R['value'];
};

type Class<T extends string> = T extends `.${infer Class}${Whitespace}{${infer Rules}}` 
    ? { class: Class, rules: RuleList<Split<Trim<Rules>, '\n'>> }
    : T;

type Style<T extends string> = Class<Trim<T>>;

type MyStyle = Style<`
    .my-aweome-class {
        inline-size: 10em;
        block-size: 10em;
    }
`>;

const myStyle: MyStyle = {
    class: 'my-aweome-class',
    rules: {
        'inline-size': '10em',
        'block-size': '10em',
    },
};