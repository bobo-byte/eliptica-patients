// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
import { BaseProvider } from "./contexts/BaseContext";
import AuthenticatedStack from "./navigation/AuthenticatedStack";
import UnAuthenticatedStack from "./navigation/UnAuthenticatedStack";
import supabase from "./services/supabase";
import useSession from "./hooks/useSession";
import { log, logError } from "./utils/helpers";
import { NativeBaseProvider } from "native-base";
import Loading from "./components/Loading";

export default function App() {
  const {
    sessionState: { session, error },
    isAuthenticated,
  } = useSession(supabase);

  if (error) logError("useSession error from App.tsx")(error);

  log("is authenticated: ", isAuthenticated);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <BaseProvider value={supabase}>
          {isAuthenticated ? (
            isAuthenticated === undefined ? (
              <Loading />
            ) : (
              <AuthProvider value={session}>
                <AuthenticatedStack />
              </AuthProvider>
            )
          ) : (
            <UnAuthenticatedStack />
          )}
        </BaseProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
