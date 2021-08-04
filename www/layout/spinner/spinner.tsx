import {classNames} from '../../util/css';

import spinnerStyle from './spinner.scss';
import {defaultSpinnerSize} from './spinner-const';
import {SpinnerPositionEnum} from './spinner-type';

type PropsType = {
    arcColor?: string; // default - $color-border
    circleColor?: string; // default - $light-gray
    className?: string; // default = ''
    isShow?: boolean; // default - true
    lineWidth?: number; // default - 5px
    position?: keyof typeof SpinnerPositionEnum; // default - static
    size?: number; // default - 48px
    wrapperColor?: string; // default - rgba(255, 255, 255, 0.5)
    wrapperHeight?: number | string; // default - 100%
    wrapperPadding?: number | string; // default - 12px
    wrapperWidth?: number | string; // default - 100%
};

export function Spinner(props: PropsType): JSX.Element | null {
    const {
        size = defaultSpinnerSize,
        lineWidth,
        arcColor,
        circleColor,
        isShow,
        wrapperWidth,
        wrapperHeight,
        position = SpinnerPositionEnum.static,
        wrapperColor,
        wrapperPadding,
        className,
    } = props;

    if (isShow === false) {
        return null;
    }

    const spinnerImageStyle = {
        borderColor: circleColor,
        borderTopColor: arcColor,
        borderWidth: lineWidth,
        height: size,
        width: size,
    };

    const spinnerWrapperStyle = {
        backgroundColor: wrapperColor,
        height: wrapperHeight,
        minHeight: size,
        minWidth: size,
        padding: wrapperPadding,
        position,
        width: wrapperWidth,
    };

    return (
        <div className={classNames(spinnerStyle.spinner_wrapper, className)} style={spinnerWrapperStyle}>
            <div className={spinnerStyle.spinner_image} style={spinnerImageStyle} />
        </div>
    );
}
