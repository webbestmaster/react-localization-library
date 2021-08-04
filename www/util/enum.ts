import {findInArrayByValue} from './array';

export function getEnumValue<EnumType>(enumData: Record<string, EnumType>, value: unknown): EnumType | null {
    const valueList: Array<EnumType> = Object.values(enumData);

    return findInArrayByValue<EnumType>(valueList, value);
}

export function getEnumValueEnsure<EnumType>(
    enumData: Record<string, EnumType>,
    value: unknown,
    defaultValue: EnumType
): EnumType {
    const enumValue: EnumType | null = getEnumValue<EnumType>(enumData, value);

    return enumValue === null ? defaultValue : enumValue;
}
