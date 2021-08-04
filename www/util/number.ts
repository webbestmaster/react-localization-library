export function getRandomNumber(fromNumber = 0, toNumber = 1e9): number {
    return Math.floor(Math.random() * (toNumber - fromNumber) + fromNumber);
}
