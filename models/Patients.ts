import PatientService from "../services/database/PatientService";
import { PatientCreationError } from "../utils/errors/models/PatientErrors";

/** Mapping of Patients sex */
export enum PATIENT_SEX {
  MALE = "Male",
  FEMALE = "Female",
  TRANSGENDER_MAN = "Transgender man",
  TRANSGENDER_WOMAN = "Transgender woman",
  NON_BINARY = "Non-binary",
  AGENDER = "Agender/I do not identify with any gender",
  OTHER = "Other/Gender not listed",
  PRIVATE = "Prefer not to state",
}

/**
 * Type for database fetches
 */
export type PatientsResponse = {
  id: number;
  firstname: string;
  lastname: string;
  patient_name?: string;
  sex: string;
  birthday: string;
  created_at?: string;
  modified_at?: string;
};

/**
 * Class represents the patient entity object from supabase.
 */
export default class Patient extends PatientService {
  id!: string;
  firstname: string;
  lastname: string;
  #patientName!: string;
  sex: PATIENT_SEX;
  birthday: string | Date;
  created_at!: string;
  modified_at!: string;

  /**
   * Constrcutor for {@link Patient}
   * @param firstname patient firstname
   * @param lastname patient lastname
   * @param sex patient sex
   * @param birthday patient birthdate
   */
  constructor(
    firstname: string,
    lastname: string,
    sex: PATIENT_SEX,
    birthday: string | Date
  ) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.#setPatientName(firstname, lastname);
    this.sex = sex;
    this.birthday = birthday;

    this.validatePatient();
    this.bindService(this);
  }

  /**
   * @protected A function for validating the construction of a patient
   */
  protected validatePatient() {
    if (
      this.birthday === undefined ||
      this.#patientName === undefined ||
      this.sex === undefined
    )
      throw new PatientCreationError(
        "Patient cannot have undefined properties"
      );
  }

  /**
   * @private a function for setting the patient name from the first and last names
   * @param firstName patient firstname
   * @param lastName patient lastname
   */
  #setPatientName(firstName: string, lastName: string) {
    this.#patientName = firstName + " " + lastName;
  }

  /**
   * A getter for the patients name
   * @returns the patients name
   */
  getPatientName() {
    return this.#patientName;
  }
}
/**
 * A class for building a patient gradually
 */
export class PatientBuilder {
  #fistname!: string;
  #lastname!: string;
  #sex!: PATIENT_SEX;
  #birthday!: string | Date;

  /**
   * A function that sets the patients name
   * @param firstName patients firstname
   * @returns a {@link PatientBuilder}
   */
  setFirstname(firstName: string) {
    this.#fistname = firstName;
    return this;
  }

  /**
   * A function for setting the patients lastname
   * @param lastname patients lastname
   * @returns a {@link PatientBuilder}
   */
  setLastname(lastname: string) {
    this.#lastname = lastname;
    return this;
  }

  /**
   * A function for setting the patients sex
   * @param sex patients sex
   * @returns a {@link PatientBuilder}
   */
  setSex(sex: PATIENT_SEX) {
    this.#sex = sex;
    return this;
  }

  /**
   * A function for setting the patients birthdate
   * @param birthday patients birthdate
   * @returns a {@link PatientBuilder}
   */
  setBirthday(birthday: string | Date) {
    this.#birthday = birthday;
    return this;
  }

  /**
   * A function that combines all the fields to construct a {@link Patient}
   * @returns a {@link Patient}
   */
  build() {
    return new Patient(
      this.#fistname,
      this.#lastname,
      this.#sex,
      this.#birthday
    );
  }
}
