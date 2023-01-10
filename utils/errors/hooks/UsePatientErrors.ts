/**
 * A custom error for when fetching all patients client call
 */
export class UsePatientErrorFetchingAll extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PatientCreationError";
  }
}
