import { PostgrestError } from "@supabase/supabase-js";
import { PatientsResponse } from "../../../models/Patients";
/** A client search promise response type */
export type SEARCH_FEEDBACK = {
  data: PatientsResponse[];
  error: PostgrestError;
};
