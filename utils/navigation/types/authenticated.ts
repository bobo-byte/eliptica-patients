import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
} from "@react-navigation/native";

import Patient, { PatientsResponse } from "../../../models/Patients";
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";
/**
 * Root stack type routes with param types
 */
export type AuthenticiatedRootStackParamList = {
  Patients: undefined;
  AddPatients: { isEdit: boolean } & Partial<Patient>;
};
/**
 * Root drawer type routes with param types
 */
export type AuthenticatedRootDrawerParamList = {
  Patients: undefined;
  AddPatients: { isEdit: boolean } & Partial<PatientsResponse>;
};
/**
 * For nested param list
 */
export type AuthenticatedRootNestedDrawerParamList = {
  Home: undefined;
};

//Demonstration requirements navigation
/**
 * For Drawer navigational props
 */
export type AuthenticatedRootDrawerNavigationProps<
  T extends keyof AuthenticatedRootDrawerParamList
> = NativeStackNavigationProp<AuthenticatedRootDrawerParamList, T>;
/**
 * For Drawer screen props
 */
export type AuthenticatedRootDrawerScreenProps<
  T extends keyof AuthenticatedRootDrawerParamList
> = RouteProp<AuthenticatedRootDrawerParamList, T>;

// Stack navigation for development
/**
 * For Stack navigational props
 */
export type AuthenticiatedRootStackNavigationProps<
  T extends keyof AuthenticiatedRootStackParamList
> = NativeStackNavigationProp<AuthenticiatedRootStackParamList, T>;
/**
 * For Stack screen props
 */
export type AuthenticiatedRootStackScreenProps<
  T extends keyof AuthenticiatedRootStackParamList
> = RouteProp<AuthenticiatedRootStackParamList, T>;

// Nested drawer with Stack only one route Home
/**
 * For Drawer nested navigational props
 */
export type AuthenticatedRootNestedDrawerNavigationProps<
  T extends keyof AuthenticatedRootNestedDrawerParamList
> = CompositeNavigationProp<
  DrawerNavigationProp<AuthenticatedRootNestedDrawerParamList, T>,
  NativeStackNavigationProp<AuthenticiatedRootStackParamList>
>;
/**
 * For Drawer nested screen props
 */
export type AuthenticatedRootNestedDrawerScreenProps<
  T extends keyof AuthenticatedRootNestedDrawerParamList
> = CompositeScreenProps<
  DrawerScreenProps<AuthenticatedRootNestedDrawerParamList, T>,
  NativeStackScreenProps<AuthenticiatedRootStackParamList>
>;
