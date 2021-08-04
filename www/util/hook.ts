import {useCallback, useMemo, useState} from 'react';

import {UseRefreshApiHookType} from '../service/api-hook/api-hook-type';

import {getRandomString} from './string';

export function useRefreshId(): UseRefreshApiHookType {
    const [refreshId, setRefreshId] = useState<string>('initial-refresh-id');

    const refresh = useCallback(() => setRefreshId(getRandomString()), [setRefreshId]);

    return useMemo(() => ({refresh, refreshId}), [refreshId, refresh]);
}

export function useUpdaterInList<ItemType>(
    itemList: Array<ItemType>,
    setItemList: (newItemList: Array<ItemType>) => void
): (oldItem: ItemType, newItem: ItemType) => void {
    return useCallback(
        (oldItem: ItemType, newItem: ItemType) => {
            const index = itemList.indexOf(oldItem);

            if (index === -1) {
                console.error('[ERROR]: Can not update: useUpdaterInList');
                return;
            }

            const newItemList = [...itemList];

            newItemList[index] = newItem;

            setItemList(newItemList);
        },
        [itemList, setItemList]
    );
}
