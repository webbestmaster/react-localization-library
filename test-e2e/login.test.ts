/* global beforeAll, afterAll, beforeEach, afterEach, describe, it */

import {Browser, Page} from 'puppeteer';

import {createBrowser, makeLogin} from './util/util';

let browser: Browser | null = null;

beforeAll(async () => {
    browser = await createBrowser();
});

afterAll(async () => {
    await browser?.close();
});

describe('Auth', () => {
    let page: Page | null = null;

    beforeEach(async () => {
        page = (await browser?.newPage()) || null;
    });

    afterEach(async () => {
        await page?.close();
    });

    it('Login', async () => {
        await makeLogin(page);
    });
});
