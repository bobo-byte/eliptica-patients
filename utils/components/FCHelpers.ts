/**
 * A function for checking if an object is valid or not
 * - For the form control components.
 * @param obj of generic type
 * @returns `true` if object is not undefined
 */
export function isInvalid<T>(obj: T) {
  return obj !== undefined;
}
