/// <reference types="@solidjs/start/env" />

declare interface ObjectConstructor {
    groupBy<Item, T extends (item: Item) => any>(items: Item[], callbackFn: T): Record<ReturnType<T>, Item[]>;
}





type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type Either<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type Leaves<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
}[keyof T] : never