

export function groupBy<Item, Key extends PropertyKey>(
    items: Iterable<Item>,
    keySelector: (item: Item, index: number) => Key,
): Record<Key, Item[]> {
    return Array.from(items).reduce((output, item, index) => {
        const k = keySelector(item, index);

        if (!output.hasOwnProperty(k)) {
            output[k] = [];
        }

        output[k].push(item);

        return output;
    }, {} as Record<Key, Item[]>);
}