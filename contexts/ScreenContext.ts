import { createContext } from "react";
import { IScreenState } from "../components/Screen";
import { Dispatch, SetStateAction } from "react";
import {
  AuthenticatedRootDrawerNavigationProps,
  AuthenticatedRootDrawerParamList,
} from "../utils/navigation/types/authenticated";

export type IWithScreenContextType<T> = {
  screenState: T & IScreenContext["screenState"];
  setScreenState: Dispatch<SetStateAction<T & IScreenContext["screenState"]>>;
};

/**
 * {@link ScreenContext } props
 */
export type IScreenContext = {
  screenState: IScreenState;
  setScreenState: Dispatch<SetStateAction<IScreenState>>;
  navigation?: AuthenticatedRootDrawerNavigationProps<
    keyof AuthenticatedRootDrawerParamList
  >;
};
/** ScreenContext defining state for each screen  */
const ScreenContext = createContext<IScreenContext>({
  screenState: { name: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScreenState: (_state: IScreenState) => {
    return;
  },
});

export const ScreenProvider = ScreenContext.Provider;

export const ScreenConsumer = ScreenContext.Consumer;

export default ScreenContext;
