import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Box,
  Fab,
  Icon,
  Text,
  Input,
  VStack,
  Center,
  Spinner,
  IconButton,
  Button,
  HStack,
  ScrollView,
  Hidden,
} from "native-base";
import usePatients from "../hooks/usePatients";
import { AuthenticatedRootDrawerNavigationProps } from "../utils/navigation/types/authenticated";
import { logError } from "../utils/helpers";
import { FlatList } from "native-base";
import PatientListItem, {
  PatienListItemProps,
} from "../components/PatientListItem";
import { AntDesign } from "@expo/vector-icons";
import usePatientSearch from "../hooks/usePatientSearch";
import { PatientsResponse, PATIENT_SEX } from "../models/Patients";
import Loading from "../components/Loading";
import { withScreen } from "../components/HOC/withScreen";
import ScreenContext, {
  IWithScreenContextType,
} from "../contexts/ScreenContext";
import SearchSelectComponent, {
  IBoxState,
} from "../components/SearchSelectComponent";
import { QueryColumn } from "../utils/database/helper";

/** Patient screen shared content type */
type PatientScreenContextType = {
  name: string;
  key: string;
  currentValue: number;
};

const searchBoxes: IBoxState[] = [
  {
    key: "By age",
    description: "Search by age",
    selected: false,
    value: 1,
    queryColumn: QueryColumn.AGE,
  },
  {
    key: "By createdAt",
    description: "Search by createdAt",
    selected: false,
    value: 2,
    queryColumn: QueryColumn.CREATED_AT,
  },
  {
    key: "By modifiedAt",
    description: "Search by modifiedAt",
    selected: false,
    value: 3,
    queryColumn: QueryColumn.MODIFIED_AT,
  },
];
/**
 * A Screen for patient dashboard activites
 * @returns a searchable screen with a list of search results or patients
 */
function Patients() {
  const { data, error, loading } = usePatients();
  const {
    query,
    updateQuery,
    isClear,
    clear,
    search,
    loadingQuery,
    queryResult,
    setIsLoadingQuery,
  } = usePatientSearch();

  const navigation =
    useNavigation<AuthenticatedRootDrawerNavigationProps<"Patients">>();

  const { screenState, setScreenState } = useContext(
    ScreenContext
  ) as IWithScreenContextType<PatientScreenContextType>;

  console.log(screenState.key);

  /**
   * A function fro clearing the search option for the search chips
   */
  function clearSearchOptions() {
    searchBoxes.forEach((box) => {
      box.selected = false;
    });

    setScreenState((prev) => ({
      ...prev,
      key: "",
      currentValue: 0,
    }));
  }

  /**
   * A function for toggling the chips
   * @param currentValue the current value of the chip
   * @param key the strategy identifier
   */
  function onSelectedSearchOption(currentValue: number, key: IBoxState["key"]) {
    setScreenState((prev) => ({
      ...prev,
      key,
      currentValue,
    }));
  }

  if (error) logError("usePatients error from Patients.tsx")(error.message);

  /**
   * A function for handling search blur
   */
  function handleSearchBlur() {
    setIsLoadingQuery(false);
  }

  /**
   * A function for handling search submissions
   */
  function handleOnSearch() {
    setIsLoadingQuery(true);
    const nquery = query.trim();

    if (screenState.key) {
      const box = searchBoxes.find((box) => box.key === screenState.key);
      if (box?.queryColumn) {
        search(nquery, box.queryColumn);
      } else {
        search(nquery);
      }
    } else {
      search(nquery); // update the query results
    }
  }

  /**
   * A function for clearing the search
   */
  function handleSeachClear() {
    clear();
    clearSearchOptions();
  }

  /**
   * A function to hanlde the edit request
   * @param patient a {@link PatientsResponse}
   */
  function handleEdit(patient: PatientsResponse) {
    const { id, firstname, lastname, sex, birthday } = patient;

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "AddPatients",
          params: {
            id: id,
            firstname: firstname,
            lastname: lastname,
            sex: sex as PATIENT_SEX,
            birthday: birthday,
            isEdit: true,
          },
        },
      ],
    });
  }

  if (loading) return <Loading />;

  if (!error) {
    if (data?.length === 0) {
      return (
        <VStack space={2} p={10} h="100%">
          <Center>
            <Text> Empty no patients available </Text>
          </Center>
          <Fab
            renderInPortal={false}
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
            shadow={2}
            size="sm"
            icon={<Icon as={AntDesign} name="plus" />}
          />
        </VStack>
      );
    }
  }

  return (
    <Box h="100%">
      <Input
        m={5}
        placeholder={
          (screenState.key &&
            `Search ${screenState.key.toLocaleLowerCase()}`) ||
          "Search patient"
        }
        value={query}
        onBlur={handleSearchBlur}
        onChangeText={updateQuery}
        InputRightElement={
          <HStack h="full">
            {isClear && !loadingQuery && (
              <IconButton
                colorScheme="danger"
                variant="ghost"
                onPress={handleSeachClear}
                _icon={{
                  as: AntDesign,
                  name: "close",
                  size: "sm",
                }}
              />
            )}
            <Button
              variant="ghost"
              isLoading={loadingQuery}
              endIcon={<Icon as={AntDesign} name="search1" size="sm" />}
              onPress={handleOnSearch}
            >
              Search
            </Button>
          </HStack>
        }
      />

      <Hidden>
        <ScrollView horizontal h={70} showsHorizontalScrollIndicator={false}>
          <Center>
            <Text>Search: </Text>
          </Center>
          <SearchSelectComponent
            boxes={searchBoxes}
            onSelected={onSelectedSearchOption}
          />
        </ScrollView>
      </Hidden>

      {loadingQuery && (
        <HStack space={2}>
          <Text pl={5} pb={3}>
            Searching...
          </Text>
          <Spinner accessibilityLabel="searching posts" size="sm" pb={3} />
        </HStack>
      )}

      {queryResult && !loadingQuery && queryResult.length === 0 && (
        <Text pl={5} pb={3}>
          Search result: empty
        </Text>
      )}

      {queryResult && queryResult?.length > 0 && (
        <Text pl={5} pb={3}>
          Available {"(" + queryResult?.length + ")"}
        </Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          queryResult && data && queryResult.length != 0 ? queryResult : data
        }
        renderItem={({ item }) => {
          const {
            id,
            firstname,
            lastname,
            birthday,
            sex,
            created_at,
            modified_at,
          } = item as PatienListItemProps;

          return (
            <PatientListItem
              id={id}
              firstname={firstname}
              lastname={lastname}
              sex={sex}
              birthday={birthday}
              created_at={created_at}
              modified_at={modified_at}
              handleEdit={handleEdit}
            />
          );
        }}
      />
      <Fab
        renderInPortal={false}
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
        shadow={2}
        size="sm"
        icon={<Icon as={AntDesign} name="plus" />}
      />
    </Box>
  );
}

export default withScreen({
  screenProps: {
    name: "Patients.tsx",
    style: {},
    scroll: false,
    route: "Patients",
  },
})(Patients);
