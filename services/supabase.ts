// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { SUPABASE_URL, SUPABASE_KEY } from "@env";
import { createClient } from "@supabase/supabase-js";
import { setupURLPolyfill } from "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";

setupURLPolyfill(); // fixes url issues

/**
 * A function for creating a SupabaseClient using {@link createClient}
 * @version 1 supabase v1
 */
const clientV1 = createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncStorage,
});

/**
 * A function for creating a client using version 2 of supabase
 * @version 2 supabase v2
 * @privateRemarks
 * it had issues with AuthSession from expo but could be fixed for future use
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const clientV2 = createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

/**
 * A function for getting the current session from the supabase client
 * @returns a session {@link clientV1.auth.session}
 */
export function getCurrentSession() {
  return clientV1.auth.session();
}

export default clientV1;
