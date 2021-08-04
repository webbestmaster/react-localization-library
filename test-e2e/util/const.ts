import {WaitForOptions} from 'puppeteer';

const domain = 'https://mvp0.mememe.io';
// const domain = 'http://localhost:9090';

export const user = {
    login: 'user@mememe.io',
    password: 'password-is-here!',
};

export const defaultPageGoToOption: WaitForOptions = {waitUntil: 'networkidle0'};

export const pagePath = {
    login: '/auth/login',
    myCompanies: '/company',
    reviewsManagementReviews: '/reviews-management/reviews',
};

export const pageFullUrl = {
    login: domain + pagePath.login,
    myCompanies: domain + pagePath.myCompanies,
    reviewsManagementReviews: domain + pagePath.reviewsManagementReviews,
};
