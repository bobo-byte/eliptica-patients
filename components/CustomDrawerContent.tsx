import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  Flex,
  Text,
  Box,
  HStack,
  Center,
  Button,
  Avatar,
  VStack,
  useToast,
} from "native-base";
import useSession from "../hooks/useSession";
import supabase from "../services/supabase";
import { getTimePassed } from "../utils/constants/date";
import { log, truncate } from "../utils/helpers";

/**
 * A custom header for the custom drawer component
 * @returns jsx component containing current user details
 */
function HeaderComponent() {
  const { user } = useSession(supabase);

  return (
    <Box safeArea>
      <VStack space={1}>
        <HStack m={1} shadow={1} borderRadius={3} p={3} pt={5} pb={5} space={2}>
          <Center>
            <Text>
              Logged in as:
              <Text isTruncated> {truncate(user?.email, 10)} </Text>
            </Text>
          </Center>

          <Avatar
            bg="green.500"
            borderWidth={3}
            borderColor="grey"
            source={{
              uri: `https://avatars.dicebear.com/api/big-ears-neutral/${user?.email}.png`,
            }}
          >
            {user?.user_metadata.name[0]}
          </Avatar>
        </HStack>
      </VStack>
    </Box>
  );
}

/**
 * Navigation items for the custom drawer component
 * @param props {@link DrawerContentComponentProps}
 * @returns stack of drawer items
 */
function NavigationContent({ navigation }: DrawerContentComponentProps) {
  return (
    <VStack>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate("Patients")}
      />
      <DrawerItem
        label="Add a patient"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "AddPatients",
                params: {
                  isEdit: false,
                },
              },
            ],
          })
        }
      />
    </VStack>
  );
}

/**
 * A custom footer for the custom drawer component
 * @returns a stack of footer options i.e. logout and copyright
 */
function FooterComponent() {
  const { user } = useSession(supabase);
  const toast = useToast();

  return (
    <Box w="full" p={12} alignSelf="baseline">
      <Center>
        <Button
          onPress={() =>
            supabase.auth.signOut().then(({ error }) => {
              if (!error) {
                toast.show({
                  id: "Logging out",
                  description: "Signed out succesfully",
                });
              } else {
                log("Error from CustomDrawerComponent", error.message);
                toast.show({
                  id: "Error logging out",
                  description: "Error while logging out",
                });
              }
            })
          }
        >
          Logout
        </Button>
        <Text pt={4}>Eliptica patients</Text>
        <Text p={2}>
          Last logged in: {getTimePassed(user?.last_sign_in_at)} ago
        </Text>
      </Center>
    </Box>
  );
}

/**
 * Custom Drawer Component needed to override default Drawer
 * @param props {@link DrawerContentComponentProps}
 * @returns complete custom drawer component served with the header, content, and footer
 */
export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <Flex w="full" h="full">
      <HeaderComponent />
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <NavigationContent {...props} />
      </DrawerContentScrollView>
      <FooterComponent />
    </Flex>
  );
}
