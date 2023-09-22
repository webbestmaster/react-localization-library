/* global setTimeout */
export async function waitForTime(timeInMilliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeInMilliseconds);
    });
}
//# sourceMappingURL=timer.js.map