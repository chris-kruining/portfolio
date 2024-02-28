// Basics
type Whitespace = '\n' | '\t' | '\r' | ' ';
type EndOfInput = '';

// ====================
// | String functions |
// ====================
type TrimLeft<T extends string> = T extends `${Whitespace}${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer R}${Whitespace}` ? TrimRight<R> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;

type Join<Items extends string[], Seperator extends string> = Items extends [string, ...infer Tail]
    ? Tail extends string[]
        ? Tail['length'] extends 0
            ? Items[0]
            : `${Items[0]}${Seperator}${Join<Tail, Seperator>}`
        : Items[0]
    : Items[0];

type Split<Subject extends string, Seperator extends string> = Subject extends `${infer Head}${Seperator}${infer Tail}`
    ? [Head, ...Split<Tail, Seperator>]
    : [Subject];

type Replace<Subject extends string, Find extends string, Replacement extends string> = Join<
    Split<Subject, Find>,
    Replacement
>;

// ===============
// | CSS parsing |
// ===============
type Rule<T extends string> = T extends `${infer Property}:${Whitespace | ''}${infer Value};`
    ? { property: Trim<Property>; value: Trim<Value> }
    : never;

type RuleList<T extends string> = {
    [R in Rule<Split<Trim<T>, '\n'>[number]> as R['property']]: R['value'];
};

type Class<T extends string> = T extends `.${infer Class}${Whitespace}{${infer Rules}}`
    ? {
          class: Class;
          rules: {
              [R in Rule<Split<Trim<Rules>, '\n'>[number]> as R['property']]: R['value'];
          };
      }
    : never;

type Id<T extends string> = T extends `#${infer Id}${Whitespace}{${infer Rules}}`
    ? {
          id: Id;
          rules: {
              [R in Rule<Split<Trim<Rules>, '\n'>[number]> as R['property']]: R['value'];
          };
      }
    : never;

type Style<Input extends string, Buffer extends string = '', Result extends object[] = []> = Input extends EndOfInput
    ? Buffer extends EndOfInput
        ? Result
        : [...Result, Buffer]
    : Input extends `${infer Character}${infer Rest}`
    ? Character extends '\n'
        ? Class<Trim<Buffer>> extends never
            ? Id<Trim<Buffer>> extends never
                ? Style<Rest, `${Buffer}${Character}`, Result>
                : Style<Rest, '', [...Result, Id<Trim<Buffer>>]>
            : Style<Rest, '', [...Result, Class<Trim<Buffer>>]>
        : Style<Rest, `${Buffer}${Character}`, Result>
    : [never];

// ============
// | Examples |
// ============
type Source = 'this-is-an-awesome set-of-strings';

type Awesome1 = Replace<Source, '-', '_'>;
type Awesome2 = Replace<Source, 'i', 'u'>;
type Awesome3 = Replace<Source, '-is', '-was'>;

type MyStyle = Style<`
    .my-aweome-class {
        inline-size: 10em;
        block-size: 10em;
    }

    .another-aweome-class {
        inline-size: 10em;
        block-size: 10em;
    }

    #this-is-an-identifier {
        width: 10px;
    }
`>;

const myAwesomeStyle: MyStyle = [
    {
        class: 'my-aweome-class',
        rules: {
            'inline-size': '10em',
            'block-size': '10em',
        },
    },
    {
        class: 'another-aweome-class',
        rules: {
            'inline-size': '10em',
            'block-size': '10em',
        },
    },
    {
        id: 'this-is-an-identifier',
        rules: {
            width: '10px',
        },
    },
];
