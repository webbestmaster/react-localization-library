/* global beforeAll, afterAll, beforeEach, afterEach, describe, it */

import {Browser, Page} from 'puppeteer';

import {createBrowser, makeLogin} from './util/util';
import {defaultPageGoToOption, pageFullUrl} from './util/const';

let browser: Browser | null = null;

beforeAll(async () => {
    browser = await createBrowser();
});

afterAll(async () => {
    await browser?.close();
});

describe('My companies', () => {
    let page: Page | null = null;

    beforeEach(async () => {
        page = (await browser?.newPage()) || null;
        await makeLogin(page);
    });

    afterEach(async () => {
        await page?.close();
    });

    it('Main table', async () => {
        await page?.goto(pageFullUrl.myCompanies, defaultPageGoToOption);

        // wait for table's pagination, .ant-pagination-options - item for page selector
        await page?.waitForSelector('.ant-pagination-options', {timeout: 5e3});
    });
});
