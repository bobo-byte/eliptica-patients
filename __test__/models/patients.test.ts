import { PatientBuilder, PATIENT_SEX } from "../../models/Patients";
import { expect, jest, test, describe } from "@jest/globals";

describe("creating a Patient", () => {
  test("Invalid new patient", () => {
    const builder = new PatientBuilder();

    builder.setFirstname("Micheal");
    builder.setLastname("Thomas");
    builder.setBirthday(new Date().toUTCString());

    expect(() => builder.build()).toThrow();
  });

  test("Valid new patient", () => {
    const builder = new PatientBuilder();

    builder.setFirstname("Micheal");
    builder.setLastname("Stabborn");
    builder.setSex(PATIENT_SEX.MALE);
    builder.setBirthday(new Date().toUTCString());

    const build = jest.fn(() => builder.build());

    build();

    expect(build).toReturn();
  });
});
