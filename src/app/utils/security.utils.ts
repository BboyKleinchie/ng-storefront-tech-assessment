/**
 * Parses a JWT token to JSON
 * @param {string} token
 * @returns the jwt token in json format
 */
export const parseJWT = (token: string): JSON => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
}
