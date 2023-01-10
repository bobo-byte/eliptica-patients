// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as dotenv from "dotenv";
dotenv.config();
import { expect, test, describe } from "@jest/globals";
import { createClient } from "@supabase/supabase-js";

export function createSupbaseClient() {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      // storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

describe("configure supabase client", () => {
  test("environment variables are loaded", () => {
    let loaded = false;

    if (process.env.SUPABASE_KEY && process.env.SUPABASE_URL) loaded = true;

    expect(loaded).toBe(true);
  });

  test("to create a client", () => {
    let client = undefined;

    expect(() => {
      client = createSupbaseClient();
    }).not.toThrow();

    expect(client).toBeDefined();
  });
});
