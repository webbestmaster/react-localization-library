export class NeverError extends Error {
    // if it comes to calling a constructor with a parameter, typescript throws an error
    constructor(value: never) {
        super(`Unreachable statement: ${value}`);
    }
}
