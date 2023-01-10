import ModelService from "./ModelService";
import supabase from "../supabase";
import Patient from "../../models/Patients";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Response type from database client calls
 */
export type FEEDBACK = Partial<{
  data: unknown;
  success: boolean;
  error: PostgrestError;
}>;
/**
 * Patient service that implements the base model service subscribing to {@link Patient} class
 */
export default abstract class PatientService implements ModelService<Patient> {
  #patient!: Patient;

  /**
   * A function that binds the patient object that extends the {@link PatientService}
   * @param patient a {@link Patient} reference
   */
  bindService(patient: Patient) {
    this.#patient = patient;
  }

  /**
   * A function that executes the delete functionality through supabase client
   * @param id the patient id
   * @returns a promised {@link FEEDBACK} object
   */
  delete<FEEDBACK>(id: unknown) {
    return (async () => {
      const { data, error } = await supabase
        .from("Patients")
        .delete()
        .match({ id });

      if (error) return { success: false, error } as FEEDBACK;

      if (data) return { success: true, data, error } as FEEDBACK;

      return { success: true } as FEEDBACK;
    })();
  }

  /**
   * A function that executes the update/insert functionality through supabase client
   * @returns a promised {@link FEEDBACK} object
   */
  save<FEEDBACK>() {
    if (this.#patient.id) {
      // already exists and are therefore updating
      return (async () => {
        const { error } = await supabase
          .from("Patients")
          .update(this.toObject())
          .eq("id", this.#patient.id);

        if (error) return { success: false, error } as FEEDBACK;

        return { success: true } as FEEDBACK;
      })();
    }

    // does not exist
    return (async () => {
      const { error } = await supabase.from("Patients").insert(this.toObject());

      if (error) return { success: false, error } as FEEDBACK;

      return { success: true } as FEEDBACK;
    })();
  }

  /**
   * A function to convert {@link Patient} object to postgres object
   * @returns a patient object that is a one to one map with postgres database
   */
  toObject(): object {
    return {
      patient_name: this.#patient.getPatientName(),
      firstname: this.#patient.firstname,
      lastname: this.#patient.lastname,
      sex: this.#patient.sex,
      birthday: this.#patient.birthday,
    };
  }
}
