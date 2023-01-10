import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Patients from "../screens/Patients";
import AddPatients from "../screens/AddPatient";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

// for developement:
// const Stack = createNativeStackNavigator();
// function HomeNavigatorStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Patients" component={Patients} />
//       <Stack.Screen name="AddPatients" component={AddPatients} />
//     </Stack.Navigator>
//   );
// }

/**
 * {@link AuthenticatedStack} props
 */
export type IAuthenticatedStackProps = {
  user: string;
};

/**
 * A function that returns a stack of authenticated screens
 * @returns a navigator stack of authenticated screens
 */
export default function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Patients"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Patients" component={Patients} />
      <Drawer.Screen name="AddPatients" component={AddPatients} />
    </Drawer.Navigator>
  );
}
