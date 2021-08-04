import {ReactNode} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {ObjectToUrlParametersType} from './url-hook-type';
import {useUrl} from './url-hook';
import {objectToUrlParameters} from './url-hook-helper';

// import {classNames} from '../../util/css';

// import linkStyle from './navigation-link.scss';

type PropsType<QueryMap> = {
    children?: ReactNode;
    className?: string;
    isSaveQueries?: boolean;
    queries?: QueryMap;
    title?: string;
    to: string;
};

export function NavigationLink<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType>(
    props: PropsType<QueryMap>
): JSX.Element {
    const {className, to, children, isSaveQueries = true, title, queries: passedQueries = {}} = props;

    const {queries: currentQueries} = useUrl<QueryMap>();

    const resultQueries: ObjectToUrlParametersType = isSaveQueries
        ? {...currentQueries, ...passedQueries}
        : passedQueries;

    const queriesAsString: string = objectToUrlParameters(resultQueries);

    const queriesAsPartUrl = queriesAsString && `?${queriesAsString}`;

    return (
        <RouterLink className={className} title={title} to={to + queriesAsPartUrl}>
            {children}
        </RouterLink>
    );
}
