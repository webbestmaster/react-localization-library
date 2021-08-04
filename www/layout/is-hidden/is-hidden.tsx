import {ReactNode} from 'react';

import {classNames} from '../../util/css';

import isHiddenStyle from './is-hidden.scss';

type PropsType = {
    children?: ReactNode;
    className?: string;
    isHidden: boolean;
};

export function IsHidden(props: PropsType): JSX.Element {
    const {isHidden, children, className} = props;
    const fullClassName = classNames(isHiddenStyle.is_hidden, {[isHiddenStyle.is_hidden__hidden]: isHidden}, className);

    return <div className={fullClassName}>{children}</div>;
}
