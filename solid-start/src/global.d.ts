/// <reference types="@solidjs/start/env" />

declare interface ObjectConstructor {
    groupBy<Item, T extends (item: Item) => any>(items: Item[], callbackFn: T): Record<ReturnType<T>, Item[]>;
}