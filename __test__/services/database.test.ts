import { test, describe } from "@jest/globals";
import { createSupbaseClient } from "./supabase.test";

// describe("PatientService testing", () => {
//   // AsyncStorage not intalised test fails
//   test("to save patient", async () => {
//     const patient = new Patient(
//       "Bob",
//       "ross",
//       PATIENT_SEX.MALE,
//       new Date().toUTCString()
//     );

//     // const { success, error } = await patient.save<FEEDBACK>();
//     // expect(success).toBe(true);
//     // expect(error).toBe(undefined);
//   });
// });

describe("attempt to test database functions", () => {
  const supabase = createSupbaseClient();

  describe("search_date sql query function", () => {
    test("by year", () => {
      (async () => {
        const { data, error } = await supabase.rpc("search_date", {
          year: "2011",
        });

        if (data) console.log(data);
        if (error) console.log(error.message);
      })();
    });
  });
});
