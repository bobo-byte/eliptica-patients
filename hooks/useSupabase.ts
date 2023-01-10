import { SupabaseClient } from "@supabase/supabase-js";
import { useContext } from "react";
import BaseContext from "../contexts/BaseContext";

/**
 * A hook function that grabs the supabase instant from base context
 * @returns a {@link SupabaseClient}
 */
export default function useSupabase() {
  const supabase = useContext(BaseContext);

  return supabase as unknown as SupabaseClient;
}
