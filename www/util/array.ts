import {isObjectInclude} from './object';

export function arrayMove<ItemType>(list: Array<ItemType>, fromIndex: number, toIndex: number): Array<ItemType> {
    const item = list[fromIndex];

    list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);

    return list;
}

export function findInArray<ItemType>(list: Array<ItemType>, query: Partial<ItemType>): ItemType | null {
    return list.find((item: ItemType): boolean => isObjectInclude<ItemType>(item, query)) || null;
}

export function findInArrayEnsure<ItemType>(
    list: Array<ItemType>,
    query: Partial<ItemType>,
    defaultValue: ItemType
): ItemType {
    return findInArray<ItemType>(list, query) || defaultValue;
}

// export function findManyInArray<ItemType>(list: Array<ItemType>, query: Record<string, unknown>): Array<ItemType> {
//     return list.filter((item: ItemType): boolean => isObjectInclude<ItemType>(item, query));
// }

export function findInArrayByValue<ItemType>(list: Array<ItemType>, value: unknown): ItemType | null {
    return list.find((item: ItemType): boolean => item === value) || null;
}

export function findInArrayByValueEnsure<ItemType>(
    list: Array<ItemType>,
    value: unknown,
    defaultValue: ItemType
): ItemType {
    const findResult = findInArrayByValue<ItemType>(list, value);

    return findResult === null ? defaultValue : findResult;
}

export function getUniqueListByKey<ItemType>(list: Array<ItemType>, keyName: keyof ItemType): Array<ItemType> {
    const savedValueList: Array<unknown> = [];

    return list.reduce<Array<ItemType>>((accum: Array<ItemType>, item: ItemType): Array<ItemType> => {
        const value = item[keyName];

        if (!savedValueList.includes(value)) {
            savedValueList.push(value);
            accum.push(item);
        }

        return accum;
    }, []);
}
