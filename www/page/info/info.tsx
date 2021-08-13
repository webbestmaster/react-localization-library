/* global setTimeout */

import {lazy, Suspense, useEffect, useState} from 'react';

// import {Locale, useLocale} from '../../provider/locale/locale-context';
import {Spinner} from '../../layout/spinner/spinner';
// import {ErrorData} from '../../layout/error-data/error-data';
import {useSystem} from '../../hook/system-hook/system-hook';
import {NavigationLink} from '../../hook/url-hook/navigation-link';
import {appRoute} from '../../component/app/app-route';
import pngImageSrc from '../home/image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from '../home/image/questions-with-an-official-answer.svg';
import homeStyle from '../home/home.scss';
import {useScreenSize} from '../../hook/system-hook/screen-size-hook';

// console.log(ErrorData);

const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'load-me-async-lazy' */
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);

export function Info(): JSX.Element {
    // const {getLocalizedString} = useLocale();
    const screen = useSystem();
    const screenSize = useScreenSize();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log('info');
    });

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    console.log('evaluate info');

    return (
        <div>
            <h1 className={homeStyle.home_header}>info page</h1>

            <NavigationLink to={appRoute.root.path}>to home</NavigationLink>

            <pre>{JSON.stringify(screen, null, 4)}</pre>
            <pre>{JSON.stringify(screenSize, null, 4)}</pre>

            {/* <Locale stringKey="BUTTON__APPLY" />*/}

            {/* <h4>{getLocalizedString('BUTTON__APPLY')}</h4>*/}

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="info" />
            </Suspense>
        </div>
    );
}
