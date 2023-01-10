/**
 * An enum mapping of the supabase "Patients" table
 */
export enum QueryColumn {
  AGE = "birthday",
  SEX = "sex",
  NAME = "patient_name",
  CREATED_AT = "created_at",
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  MODIFIED_AT = "modified_at",
}

export type SUPABASE_TABLES = "Patients";
