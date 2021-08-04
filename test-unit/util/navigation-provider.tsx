import {BrowserRouter, Route, Switch} from 'react-router-dom';

type NavigationProviderPropsType = {
    component: () => JSX.Element;
};

// eslint-disable-next-line react/no-multi-comp
export function NavigationProvider(props: NavigationProviderPropsType): JSX.Element {
    const {component} = props;

    return (
        <BrowserRouter>
            <Switch>
                <Route component={component} />
            </Switch>
        </BrowserRouter>
    );
}
