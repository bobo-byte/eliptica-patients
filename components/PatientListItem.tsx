import { Box, Divider, Heading, HStack, VStack, Button } from "native-base";
import React, { useState, memo } from "react";
import Patient, { PatientsResponse, PATIENT_SEX } from "../models/Patients";
import { FEEDBACK } from "../services/database/PatientService";
import { parseDateFromSupabase } from "../utils/constants/date";
import { logError } from "../utils/helpers";
import DeletePatientButton from "./DeletePatientButton";
/**
 * Patient list item prop
 */
export type PatienListItemProps = {
  handleEdit?: (obj: PatientsResponse) => void;
} & PatientsResponse;

/**
 * A patient list item component for the patient data
 * @param props {@link PatienListItemProps }
 * @returns a stacked component for interacting with patient data
 */
function PatientListItem(props: PatienListItemProps) {
  const [isDeleting, setLoadingDelete] = useState<boolean>(false);

  function handleDelete() {
    setLoadingDelete(true);

    const patient = new Patient(
      props.firstname,
      props.lastname,
      props.sex as PATIENT_SEX,
      props.birthday
    );

    patient
      .delete<FEEDBACK>(props.id)
      .then(({ success, data, error }) => {
        if (error) logError("Error when deleting from PatientList.tsx")(error);

        if (success) {
          setLoadingDelete(false);
          if (data) console.log(data);
        }
      })
      .catch(logError("Error from client not database PatientList.tsx"));

    setLoadingDelete(false);
  }

  return (
    <Box shadow={1} m={2} borderRadius={5}>
      <VStack space={1} p={5} m={2}>
        <Heading size="md" p={2}>
          {props.firstname} {props.lastname}
        </Heading>
        <Divider colorScheme="black" />
        <Heading size="sm" fontWeight="normal" p={2}>
          Patient ID: {props.id}
        </Heading>
        <Heading size="sm" fontWeight="normal" p={2}>
          Patient Sex: {props.sex}
        </Heading>
        <Heading size="sm" fontWeight="normal" p={2}>
          Patient DOB: {props.birthday}
        </Heading>
        <Divider colorScheme="black" />
        <Heading size="sm" fontWeight="normal" p={2}>
          createdAt: {props.created_at}
        </Heading>
        {props.modified_at && (
          <Heading size="sm" fontWeight="normal" p={2}>
            modifiedAt: {props.modified_at}
          </Heading>
        )}

        <HStack m={1} space={2}>
          <Button
            onPress={() => {
              if (props.handleEdit !== undefined) {
                props.handleEdit({
                  id: props.id,
                  firstname: props.firstname,
                  lastname: props.lastname,
                  sex: props.sex,
                  birthday: parseDateFromSupabase(props.birthday),
                });
              }
            }}
          >
            Edit
          </Button>

          <DeletePatientButton
            patient_name={props.firstname + " " + props.lastname}
            isLoading={isDeleting}
            onDelete={handleDelete}
          />
        </HStack>
      </VStack>
    </Box>
  );
}

export default memo(PatientListItem);
