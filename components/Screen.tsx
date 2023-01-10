import { ScrollView, StyleSheet } from "react-native";
import { ScreenProvider } from "../contexts/ScreenContext";
import React, { useEffect, useState, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AuthenticatedRootDrawerNavigationProps,
  AuthenticatedRootDrawerParamList,
} from "../utils/navigation/types/authenticated";
import { Box } from "native-base";

/**
 * Screen props containing screen metadata
 */
export type IScreenProps = {
  children: ReactNode;
  style: object;
  scroll: boolean;
  name: string;
  route: keyof AuthenticatedRootDrawerParamList;
};

export type IScreenState = { name: string } | object;

/**
 * A contextful component that can be used for complex prop drilling components
 * @param props {@link IScreenProps}
 * @returns a {@link ScrollView} or {@link Box}
 */
function Screen({ children, style, scroll, name, route }: IScreenProps) {
  const [state, setState] = useState<IScreenState>({
    name,
  });
  const navigation =
    useNavigation<AuthenticatedRootDrawerNavigationProps<typeof route>>();

  useEffect(() => {
    function onFocus() {
      console.log(`${name.toUpperCase()}`, "MOUNTING");
    }

    function onMount() {
      console.log(`${name.toUpperCase()}`, "UNMOUNTING");
    }

    const unsubscribeFocus = navigation.addListener("focus", onFocus);
    const unsubscribeBlur = navigation.addListener("blur", onMount);

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
      navigation.removeListener("focus", onFocus);
      navigation.removeListener("blur", onMount);
    };
  }, [navigation, name]);

  return (
    <ScreenProvider
      value={{
        screenState: state,
        setScreenState: setState,
        navigation,
      }}
    >
      {(scroll && (
        <ScrollView contentContainerStyle={styles.scroll}>
          {children}
        </ScrollView>
      )) || (
        <Box p={2} h="full" w="full" style={[style]}>
          {children}
        </Box>
      )}
    </ScreenProvider>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  scroll: {
    padding: 24,
  },
});
