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

describe('Reviews', () => {
    let page: Page | null = null;

    beforeEach(async () => {
        page = (await browser?.newPage()) || null;
        await makeLogin(page);
    });

    afterEach(async () => {
        await page?.close();
    });

    it('Review list', async () => {
        await page?.goto(pageFullUrl.reviewsManagementReviews, defaultPageGoToOption);

        // review should contain at least one review, main ul li svg[fill=currentColor] - rating selector
        await page?.waitForSelector('main ul li svg[fill=currentColor]', {timeout: 5e3});
    });
});
