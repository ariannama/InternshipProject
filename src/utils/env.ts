/**
 * Returns a concrete type for a defined environment variable
 *
 * @param {string} env
 * @returns {string}
 */
export const checkEnv = (env: string): string => {
    const value = process.env[env];
    if (!value) {
        throw new Error(`Required environment variable ${env} needs to be set`);
    }
    return value;
};