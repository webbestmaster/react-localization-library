/* global document */

import {render} from 'react-dom';

import {ExampleApp} from './app/example-app';

const nodeWrapper = document.querySelector('.js-app-wrapper');

if (nodeWrapper !== null) {
    render(<ExampleApp />, nodeWrapper);
} else {
    console.error('Can not find nodeWrapper');
}
