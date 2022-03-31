/* global document */

import {createRoot} from 'react-dom/client';

import {ExampleApp} from './app/example-app';

const nodeWrapper = document.querySelector('.js-app-wrapper');

if (nodeWrapper !== null) {
    createRoot(nodeWrapper).render(<ExampleApp />);
} else {
    console.error('Can not find nodeWrapper');
}
