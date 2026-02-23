
/**
 * Return the current date in a Date type
 */
export const today = (): Date => new Date(Date.now());

/**
 * Returns the current year
 * @returns
 */
export const currentYear = (): number => today().getFullYear();
