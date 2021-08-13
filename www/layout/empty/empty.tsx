import React, {useMemo} from 'react';

import {LangKeyType} from '../../provider/locale/translation/type';
// import {Locale} from '../../provider/locale/locale-context';
import {classNames} from '../../util/css';

import emptyImageSrc from './image/empty.svg';
import emptyStyle from './empty.scss';

type PropsType = {
    className?: string;
    mainText?: LangKeyType;
    secondaryText?: LangKeyType;
};

export function Empty(props: PropsType): JSX.Element {
    const {className, mainText, secondaryText} = props;

    const mainTextNode = useMemo((): JSX.Element | null => {
        if (!mainText) {
            return null;
        }

        return <h4 className={emptyStyle.empty__header}>{/* <Locale stringKey={mainText} />*/}</h4>;
    }, [mainText]);

    const secondaryTextNode = useMemo((): JSX.Element | null => {
        if (!secondaryText) {
            return null;
        }

        return <p className={emptyStyle.empty__text}>{/* <Locale stringKey={secondaryText} />*/}</p>;
    }, [secondaryText]);

    return (
        <div className={classNames(emptyStyle.empty, className)}>
            <img alt="" className={emptyStyle.empty__image} src={emptyImageSrc} />

            {mainTextNode}

            {secondaryTextNode}
        </div>
    );
}
