import {classNames} from '../../util/css';
import {Locale, LocaleKeysType} from '../../page/home/home';

import errorDataStyle from './error-data.scss';

type PropsType = {
    className?: string;
    langKey: LocaleKeysType;
};

export function ErrorData(props: PropsType): JSX.Element {
    const {langKey, className} = props;

    return (
        <div className={classNames(errorDataStyle.error_data, className)}>
            <p className={errorDataStyle.error_data__text}>
                <Locale stringKey={langKey} />
            </p>
        </div>
    );
}
