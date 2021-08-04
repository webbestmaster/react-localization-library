import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export function App(): JSX.Element {
    return (
        <AppProvider>
            <AppRouting />
        </AppProvider>
    );
}
