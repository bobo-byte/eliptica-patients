import { RealtimeSubscription } from "@supabase/supabase-js";
import { useState, useEffect, useRef } from "react";
import { PatientsResponse } from "../models/Patients";
import { UsePatientErrorFetchingAll } from "../utils/errors/hooks/UsePatientErrors";
import { log } from "../utils/helpers";

import useSupabase from "./useSupabase";
/**
 * A hook function for reading subscribing to patient data
 * @returns an object containing the list of patients, error (if exits), and loading state
 */
export default function usePatients() {
  const supabase = useSupabase();

  const [patients, setPatients] = useState<PatientsResponse[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const initalised = useRef<boolean>(false);

  /**
   * a function used to update the list of patients
   * @param patients a list of {@link PatientsResponse}
   */
  function updatePatients(patients: PatientsResponse[]) {
    setPatients(patients);
  }

  /**
   * a function for updating the error from {@link fetch}
   * @param error an error {@link Error}
   */
  function updateError(error: Error) {
    setError(error);
  }

  /**
   * Function for querying database to fetch list of patients
   * @throws {@link UsePatientErrorFetchingAll} if thre is a {@link PostgrestError}
   * @returns a list of promise containing {@link PatientsResponse} or an error
   */
  async function fetch() {
    const { data: Patients, error } = await supabase
      .from("Patients")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setLoading(false);
      throw new UsePatientErrorFetchingAll(error.message);
    }

    setLoading(false);

    return Patients;
  }

  /**
   * Function used to {@link fetch} and subscribe to patient table for any event changes
   */
  function subscribe() {
    const subscription = supabase
      .from("Patients")
      .on("*", (_payload) => {
        console.log("Change received!", _payload);
        setLoading(true);

        fetch()
          .then(updatePatients)
          .catch(updateError)
          .finally(() => setLoading(false));
      })
      .subscribe();

    return subscription;
  }

  useEffect(() => {
    log("Mounting initalised: ", initalised.current);
    let subscription: RealtimeSubscription | null = null;
    if (!initalised.current) {
      console.log("setting subscription");
      subscription = subscribe();
      initalised.current = true;
      fetch()
        .then(updatePatients)
        .catch(updateError)
        .finally(() => setLoading(false));
    } else console.log("subscriptions", supabase.getSubscriptions());

    return () => {
      log("Unmounting initalised: ", initalised.current);
      if (subscription) supabase.removeSubscription(subscription);
    };
  }, []);

  return { data: patients, error: error, loading };
}
