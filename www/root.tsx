/* global document */

import {createRoot} from "react-dom/client";

import {ExampleApp} from "./app/example-app";

const nodeWrapper = document.querySelector(".js-app-wrapper");

if (nodeWrapper === null) {
    console.error("Can not find nodeWrapper");
} else {
    createRoot(nodeWrapper).render(<ExampleApp />);
}
