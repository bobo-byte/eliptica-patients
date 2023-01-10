import { useEffect, useState } from "react";
import { isBrowser, log, logError } from "../utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupabaseClient, AuthSession } from "@supabase/supabase-js";
import { getCurrentSession } from "../services/supabase";

/** Default state types */
const DEFUALT_STATE: STATE_TYPE = {
  session: null,
  error: null,
  eventMessage: null,
};

/** session type */
type SESSION_TYPE = AuthSession | null | undefined;

/** error types */
type ERROR_TYPE = string | null;

/** event message type */
type ONAUTH_EVENT_MESSAGE_TYPE = string | null;

/** state type combination of {@link SESSION_TYPE}, {@link ERROR_TYPE}, {@link ONAUTH_EVENT_MESSAGE_TYPE} */
type STATE_TYPE = {
  session: SESSION_TYPE;
  error: ERROR_TYPE;
  eventMessage: ONAUTH_EVENT_MESSAGE_TYPE;
};

/**
 * A hook function for subscribing to initalising and subscribing to the session
 * @param supabase a {@link SupabaseClient} or an object
 * @returns an set of read and set data for the current session
 */
export default function useSession(supabase?: SupabaseClient | object) {
  const [session, setSession] = useState<STATE_TYPE>(DEFUALT_STATE);

  /**
   * A function that checks if the session is defined or not
   * @returns `true` if session is defined or `false` if session is not defined
   */
  function isSession() {
    return session?.session !== null && session?.session !== undefined;
  }

  /**
   * Function that checks if the {@link session.error} is not null
   * @returns `true` if {@link session.error}
   */
  function isResetError() {
    return session.error !== null;
  }

  /**
   * A function that checks if session has user defined
   * @returns checks if {@link session.session.user} is defined
   */
  function isUnauthenticated() {
    if (session === DEFUALT_STATE) return;

    if (isSession())
      return (
        session?.session?.user !== undefined && session?.session?.user !== null
      );

    return false;
  }

  /**
   * A function that updates the session state
   * @param session current session {@link SESSION_TYPE}
   */
  function updateSession(session: SESSION_TYPE = null) {
    setSession((prev) => ({
      ...prev,
      session,
    }));
  }

  /**
   * A function that updates the session error state
   * @param error current session error {@link ERROR_TYPE}
   */
  function updateError(error: ERROR_TYPE = null) {
    setSession((prev) => ({
      ...prev,
      error,
    }));
  }

  /**
   * A function to update when event messages from subscription is fired
   * @param eventMessage a {@link ONAUTH_EVENT_MESSAGE_TYPE}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function updateEventMessage(eventMessage: ONAUTH_EVENT_MESSAGE_TYPE = null) {
    setSession((prev) => {
      return {
        ...prev,
        eventMessage,
      };
    });
  }

  /**
   * A function for reseting the session error state
   */
  function resetError() {
    if (isResetError())
      setSession((prev) => ({
        ...prev,
        error: null,
      }));
  }

  /**
   * A function for reseting the session object
   * @param fetchedSession current session from {@link AsyncStorage}
   */
  function resetSession(fetchedSession: string | null | undefined = undefined) {
    if (!fetchedSession)
      setSession((prev) => ({
        ...prev,
        session: prev.session === undefined ? null : prev.session,
      }));
  }

  /**
   * A function for getting the current user in session
   * @returns if the user exists else `undefined`
   */
  function getUser() {
    if (isSession()) return session?.session?.user;

    return undefined;
  }

  /**
   * A function for verifying a supabase instance.
   * if undefined or an object that is not a {@link SupabaseClient}
   * @returns `true` or `false`
   */
  function isVerifiedASupabaseInstance() {
    if (!supabase || !(supabase instanceof SupabaseClient)) {
      const errorMessage =
        "Supabase is undefined or an empty object. Pass a vaild supabase client";

      updateError(errorMessage);
      return false;
    }

    return true;
  }

  /**
   * A function used to initalise the session
   * @param fetchedSession current fetched session
   */
  function initaliseSession(fetchedSession: SESSION_TYPE) {
    const session = fetchedSession || isBrowser() ? fetchedSession : undefined;

    updateSession(session);

    (async () => {
      if (isBrowser()) return;
      await AsyncStorage.getItem("supabase.auth.token")
        .then(resetSession)
        .catch(logError("AsyncStorageError from useSession"));
    })();
  }

  useEffect(() => {
    if (!isVerifiedASupabaseInstance())
      return () => {
        // unmounting
      };

    const session_ = getCurrentSession();

    resetError(); // reset any errors

    initaliseSession(session_);

    const {
      // data: {
      //   subscription: { unsubscribe },
      // }, v2
      data: { unsubscribe },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      log("AUTH_EVENT: ", event); // TODO: handle different event types like login and sign out etc
      updateSession(session);
    });

    return () => {
      log("unmounting: ", session.session);
      unsubscribe();
    };
  }, []);

  return {
    sessionState: session,
    isAuthenticated: isUnauthenticated(),
    user: getUser(),
    setSession,
  };
}
