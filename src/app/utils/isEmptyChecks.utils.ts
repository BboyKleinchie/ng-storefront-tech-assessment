import { get } from 'lodash-es';

/**
 * Checks if the object is undefined or null
 * @param {T} propertyToCheck any object type
 * @returns {boolean} true if the property is undefined or null
 */
export const isPropertyNull = <T>(propertyToCheck: T): boolean => {
    return (
        propertyToCheck === undefined
        || propertyToCheck === null
    );
}

/**
 * Checks if string is empty or null
 * @param stringToCheck
 * @returns {boolean} true if string is empty or is null
 */
export const isStringNullOrEmpty = (stringToCheck: string): boolean => {
    return (
        isPropertyNull(stringToCheck)
        || stringToCheck.trim() === ''
    );
}

/**
 * Checks if the number is null or zero
 * @param {number} numberToCheck
 */
export const isNumberNullOrZero = (numberToCheck: number): boolean => {
    return(
        isPropertyNull(numberToCheck)
        || numberToCheck === 0
    )
}

/**
 * Checks if the array is undefined, null or is an empty array
 * @param {T[]}arrayToCheck
 * @returns {boolean} true if the array is undefined, null or empty
 */
export const isArrayNullOrEmpty = <T>(arrayToCheck: T[]): boolean => {
  return (
    isPropertyNull(arrayToCheck)
    || isNumberNullOrZero(get(arrayToCheck, 'length', 0))
  );
}

export const isCollectionNullOrEmpty = <T>(collectionToCheck: T): boolean => {
    return (
        isPropertyNull(collectionToCheck)
        || JSON.stringify(collectionToCheck) === '{}'
    )
}
