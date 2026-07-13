const DEFAULT_LOGIN_ATTEMPTS = 20;
const DEFAULT_REGISTER_ATTEMPTS = 20;

function parseAttemptLimit(value: string | undefined, defaultValue: number): number {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1 || parsedValue > 100) {
        return defaultValue;
    }

    return parsedValue;
}

export function getLoginAttemptLimit(value = process.env.MAX_LOGIN_ATTEMPTS): number {
    return parseAttemptLimit(value, DEFAULT_LOGIN_ATTEMPTS);
}

export function getRegisterAttemptLimit(
    registerValue = process.env.MAX_REGISTER_ATTEMPTS,
    loginValue = process.env.MAX_LOGIN_ATTEMPTS,
): number {
    return parseAttemptLimit(registerValue ?? loginValue, DEFAULT_REGISTER_ATTEMPTS);
}
