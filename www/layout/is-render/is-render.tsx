import {ReactNode} from 'react';

type PropsType = {
    children?: ReactNode;
    isRender: boolean;
};

export function IsRender(props: PropsType): JSX.Element | null {
    const {isRender, children} = props;

    if (isRender) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return null;
}
