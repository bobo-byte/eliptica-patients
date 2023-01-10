import { Platform } from "react-native";
/**
 * A function that checks if the current platform is web
 * @returns `true` if {@link Platform.OS} is web
 */
export const isBrowser = () => Platform.OS === "web";

/**
 * A fuction to log messages that can be modifed to have the source location
 * @param message argument of messages
 */
export function log(...message: unknown[]) {
  console.log(...message);
}

/**
 * For logging any type of error with message attachment
 * @param message error message
 * @returns
 */
export function logError(message = "") {
  if (typeof message === "string") message = message.toLocaleUpperCase() + " :";
  else message = message + " :";
  return (error: string | object) => {
    if (!(error instanceof Object)) console.log(message, error);

    if (error instanceof Object) {
      // it is an object check if contains message as a key.
      !("message" in error) && console.log(message, error);
      "message" in error && console.log(message, error.message);
    }
  };
}

/** A function used to trancate any text based on a specfied length*/
export function truncate(text: string | undefined, length: number): string {
  if (text === undefined) return typeof text;

  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}
