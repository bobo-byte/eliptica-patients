/**
 * A custom error for creating a new Patient that is invalid
 */
export class PatientCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PatientCreationError";
  }
}
