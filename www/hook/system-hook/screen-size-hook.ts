/* global window */

import {useCallback, useEffect, useMemo, useState} from 'react';

import {debounce} from '../../util/function';

import {RectangleSizeType} from './system-hook-type';
import {getScreenSize} from './system-hook-helper';

export function useScreenSize(): RectangleSizeType {
    const {width: defaultWidth, height: defaultHeight} = getScreenSize();

    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);

    const handleResize = useCallback(() => {
        const {width: newWidth, height: newHeight} = getScreenSize();

        setWidth(newWidth);
        setHeight(newHeight);
    }, []);

    useEffect(() => {
        const handleResizeDebounced = debounce<[]>(handleResize, 150);

        window.addEventListener('resize', handleResizeDebounced, {capture: false, passive: true});

        return () => {
            window.removeEventListener('resize', handleResizeDebounced, {capture: false});
        };
    }, [handleResize]);

    return useMemo((): RectangleSizeType => {
        return {height, width};
    }, [height, width]);
}
