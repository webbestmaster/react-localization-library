/* global describe, it, expect */
import {useEffect} from 'react';
import {render, screen} from '@testing-library/react';

import {NavigationProvider} from '../../../test-unit/util/navigation-provider';

import {useUrl} from './url-hook';
import {NavigationLink} from './navigation-link';

describe('NavigationLink', () => {
    it('default state', () => {
        // eslint-disable-next-line react/no-multi-comp
        function DefaultState(): JSX.Element {
            return <NavigationLink to="/default-state" />;
        }

        const {unmount, container} = render(<NavigationProvider component={DefaultState} />);

        const link = container.querySelector('a[href="/default-state"]');

        expect(link).toBeInTheDocument();

        unmount();
    });

    it('with props', () => {
        // eslint-disable-next-line react/no-multi-comp
        function WithProps(): JSX.Element {
            return (
                <NavigationLink className="props-class-name" title="props-title" to="/with-props">
                    some text
                </NavigationLink>
            );
        }

        const {unmount, container} = render(<NavigationProvider component={WithProps} />);

        const link = container.querySelector(
            'a.props-class-name[href="/with-props"][class="props-class-name"][title="props-title"]'
        );

        expect(link).toBeInTheDocument();
        expect(screen.getByText('some text')).toBeInTheDocument();

        unmount();
    });

    it('use query by default', () => {
        // eslint-disable-next-line react/no-multi-comp
        function UseQuery(): JSX.Element {
            const {setQuery} = useUrl();

            useEffect(() => {
                setQuery({nick: 'mike'});
            }, [setQuery]);

            return <NavigationLink to="/use-query-by-default" />;
        }

        const {unmount, container} = render(<NavigationProvider component={UseQuery} />);

        const link = container.querySelector('a[href="/use-query-by-default?nick=mike"]');

        expect(link).toBeInTheDocument();

        unmount();
    });

    it('use query by props', () => {
        // eslint-disable-next-line react/no-multi-comp
        function UseQuery(): JSX.Element {
            const {setQuery} = useUrl();

            useEffect(() => {
                setQuery({nick: 'mike'});
            }, [setQuery]);

            return <NavigationLink isSaveQueries to="/use-query-by-props" />;
        }

        const {unmount, container} = render(<NavigationProvider component={UseQuery} />);

        const link = container.querySelector('a[href="/use-query-by-props?nick=mike"]');

        expect(link).toBeInTheDocument();

        unmount();
    });

    it('do not use query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function DoNotUseQuery(): JSX.Element {
            const {setQuery} = useUrl();

            useEffect(() => {
                setQuery({nick: 'mike'});
            }, [setQuery]);

            return <NavigationLink isSaveQueries={false} to="/do-not-use-query" />;
        }

        const {unmount, container} = render(<NavigationProvider component={DoNotUseQuery} />);

        const link = container.querySelector('a[href="/do-not-use-query"]');

        expect(link).toBeInTheDocument();

        unmount();
    });

    it('use own queries', () => {
        // eslint-disable-next-line react/no-multi-comp
        function UseOwnQueries(): JSX.Element {
            const {setQuery} = useUrl();

            useEffect(() => {
                setQuery({nick: 'mike'});
            }, [setQuery]);

            return <NavigationLink queries={{foo: 'bar'}} to="/use-own-queries" />;
        }

        const {unmount, container} = render(<NavigationProvider component={UseOwnQueries} />);

        const link = container.querySelector('a[href="/use-own-queries?nick=mike&foo=bar"]');

        expect(link).toBeInTheDocument();

        unmount();
    });

    it('use own queries only', () => {
        // eslint-disable-next-line react/no-multi-comp
        function UseOwnQueriesOnly(): JSX.Element {
            const {setQuery} = useUrl();

            useEffect(() => {
                setQuery({nick: 'mike'});
            }, [setQuery]);

            return <NavigationLink isSaveQueries={false} queries={{foo: 'bar'}} to="/use-own-queries-only" />;
        }

        const {unmount, container} = render(<NavigationProvider component={UseOwnQueriesOnly} />);

        const link = container.querySelector('a[href="/use-own-queries-only?foo=bar"]');

        expect(link).toBeInTheDocument();

        unmount();
    });
});
