import React from "react";
import { Button, View } from "react-native";
import useOAuth from "../hooks/useOAuth";

/**
 * A function with the login screen
 * @returns a oauth button
 */
export default function Login() {
  const { signInWithGoogle } = useOAuth();

  return (
    <View>
      <Button title="Login with Google" onPress={signInWithGoogle} />
    </View>
  );
}
