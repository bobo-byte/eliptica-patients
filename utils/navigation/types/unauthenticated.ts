import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
/** Root stack param list */
export type UnAuthenticiatedRootStackParamList = {
  Login: undefined;
};
/** Navigation stack props */
export type UnAuthenticiatedRootStackNavigationProps<
  T extends keyof UnAuthenticiatedRootStackParamList
> = NativeStackNavigationProp<UnAuthenticiatedRootStackParamList, T>;
/** Screen stack props */
export type UnAuthenticiatedRootStackScreenProps<
  T extends keyof UnAuthenticiatedRootStackParamList
> = NativeStackScreenProps<UnAuthenticiatedRootStackParamList, T>;
