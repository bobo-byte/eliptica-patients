// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SUPABASE_URL } from "@env";
import * as AuthSession from "expo-auth-session";
import { OAUTH_PROVIDERS } from "../utils/constants/auth";
import supabase from "../services/supabase";
import { log, logError } from "../utils/helpers";

/**
 * Hook for OAuth authentication
 * @returns an object of signin options
 */
export default function useOAuth() {
  // url: `${SUPABASE_URL}/auth/v1/authorize?provider=${OAUTH_PROVIDERS.GOOGLE}&redirect_to=${request?.redirectUri}`
  // redirect uri: https://auth.expo.io/@boboexperience/eliptica-patients

  /**
   * Function handles the GoogleOAuth request and redirection using {@link AuthSession},
   * {@link supabase.auth.signIn} refreshs the token for google oauth into storage.
   */
  async function signInWithGoogle() {
    const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

    const baseRequestURL = `${SUPABASE_URL}/auth/v1/authorize?provider=${OAUTH_PROVIDERS.GOOGLE}`; // for v1

    const requestURL = baseRequestURL + `&redirect_to=${proxyRedirectUri}`;

    try {
      const response = await AuthSession.startAsync({
        authUrl: requestURL,
        returnUrl: redirectUri,
      });

      log("response type: ", response.type); // get the type

      if (response.type !== "success") {
        return;
      }

      log("response: ", response); // see full response

      if (response.type === "success") {
        log("returned parameters: ", response.params);
        const { session, error: setSessionError } = await supabase.auth.signIn({
          // access_token: response.params.access_token,
          // ^ could not find vairable buffer! session does not require the access_token
          refreshToken: response.params.refresh_token,
        });

        if (session) log("session: ", session);

        if (setSessionError)
          logError("error signin session: ")(setSessionError);
      }
    } catch (error) {
      logError("useOAuthError from google signIn")(error as never);
    }
  }

  return { signInWithGoogle };
}
