/* global setTimeout */

import {lazy, Suspense, useEffect, useState} from 'react';

import {Locale, useLocale} from '../../provider/locale/locale-context';
import {Spinner} from '../../layout/spinner/spinner';
import {ErrorData} from '../../layout/error-data/error-data';
import {useSystem} from '../../hook/system-hook/system-hook';
import {NavigationLink} from '../../hook/url-hook/navigation-link';
import {appRoute} from '../../component/app/app-route';
import {LocaleNameEnum} from '../../provider/locale/locale-context-type';
import {useFormat} from '../../hook/format-hook/format-hook';
import {getTestNodeData, getTestNodeId} from '../../util/auto-test';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

console.log(ErrorData);

const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'load-me-async-lazy' */
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);

export function Home(): JSX.Element {
    const {getLocalizedString, setLocaleName, localeName} = useLocale();
    const {getFormattedNumber} = useFormat();
    const {screen} = useSystem();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    useEffect(() => {
        console.log('home');
    });

    console.log('evaluate home');

    return (
        <div>
            <h1 className={homeStyle.home_header}>home page</h1>

            <hr />

            <button
                data-test-data={getTestNodeData({data: 'some-string'})}
                data-test-id={getTestNodeId('language-button')}
                onClick={() =>
                    setLocaleName(localeName === LocaleNameEnum.enUs ? LocaleNameEnum.ruRu : LocaleNameEnum.enUs)}
                type="button"
            >
                {localeName}
            </button>

            <hr />

            <NavigationLink to={appRoute.info.path}>to info</NavigationLink>

            <hr />

            <code>{getFormattedNumber(321, {style: 'unit', unit: 'liter', unitDisplay: 'long'})}</code>

            <pre>{JSON.stringify(screen, null, 4)}</pre>

            <Locale stringKey="BUTTON__APPLY" />

            <h4>{getLocalizedString('BUTTON__APPLY')}</h4>

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="home" />
            </Suspense>
        </div>
    );
}
