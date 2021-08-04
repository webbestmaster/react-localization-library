import {Spinner} from '../../layout/spinner/spinner';
import {IsRender} from '../../layout/is-render/is-render';
import {IsHidden} from '../../layout/is-hidden/is-hidden';
import {Empty} from '../../layout/empty/empty';

export function Error404(): JSX.Element {
    return (
        <div>
            <h1>Page 404</h1>

            <IsRender isRender={false}>
                <IsHidden isHidden={false}>
                    <Empty mainText="EMPTY__THERE_IS_NOTHING_HERE_YET" secondaryText="EMPTY__TRY_CHANGING_FILTERS" />

                    <Spinner position="static" />
                </IsHidden>
            </IsRender>
        </div>
    );
}
