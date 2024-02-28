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
    ? { property: Trim<Property>, value: Trim<Value> }
    : never
;

type RuleList<T extends string> = {
    [R in Rule<Split<Trim<T>, '\n'>[number]> as R['property'] ]: R['value']; 
};

type Class<T extends string> = T extends `.${infer Class}${Whitespace}{${infer Rules}}` 
    ? { 
        class: Class,
        rules: {
            [R in Rule<Split<Trim<Rules>, '\n'>[number]> as R['property'] ]: R['value']; 
        },
        kaas: RuleList<Rules>,
    }
    : T;

type Style<T extends string> = Class<Trim<T>>;

type MyStyle = Style<`
    .my-aweome-class {
        inline-size: 10em;
        block-size: 10em;
    }
`>;

const myAwesomeStyle: MyStyle = {
    class: 'my-aweome-class',
    rules: {
        'inline-size': '10em',
        'block-size': '10em',
    },
    kaas: {
        'inline-size': '10em',
        'block-size': '10em',
    },
};