import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

/**
 * A function that returns a stack of un-authenticated screens
 * @returns a navigator stack of un-authenticated screens
 */
export default function UnAuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
