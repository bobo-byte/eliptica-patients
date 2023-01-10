import { Center, Box, VStack, Button, ScrollView, useToast } from "native-base";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormControlInput from "../components/FCInput";
import FormControlSelect, { SelectItemsType } from "../components/FCSelect";
import { PATIENT_SEX, PatientBuilder } from "../models/Patients";
import { FEEDBACK } from "../services/database/PatientService";
import { isInvalid } from "../utils/components/FCHelpers";
import {
  parseDateFromClientToSupabase,
  validateBirthDate,
} from "../utils/constants/date";
import { logError } from "../utils/helpers";
import MaskedInput from "../components/RHFMaskedInput";
import { Masks } from "react-native-mask-input";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AuthenticatedRootDrawerNavigationProps,
  AuthenticatedRootDrawerScreenProps,
} from "../utils/navigation/types/authenticated";

/** Form data types */
type AddPatientFormData = {
  firstName: string;
  lastName: string;
  sex: PATIENT_SEX;
  birthday: string;
};

/** A list of sexs for the select form */
const FORM_SELECT_ITEMS: SelectItemsType = {
  SELECT_SEX: [
    { label: PATIENT_SEX.MALE },
    { label: PATIENT_SEX.FEMALE },
    { label: PATIENT_SEX.TRANSGENDER_MAN },
    { label: PATIENT_SEX.TRANSGENDER_WOMAN },
    { label: PATIENT_SEX.AGENDER },
    { label: PATIENT_SEX.NON_BINARY },
    { label: PATIENT_SEX.PRIVATE },
    { label: PATIENT_SEX.OTHER },
  ],
};

/**
 * A Screen for creating and updating a patient
 * @returns a screen with controlled inupt fields for creating and updating patient
 */
export default function AddPatient() {
  const { params } =
    useRoute<AuthenticatedRootDrawerScreenProps<"AddPatients">>();

  const [isRequestDone, setRequestDone] = useState(false);

  const toast = useToast();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPatientFormData>({
    defaultValues: {
      firstName: params?.firstname,
      lastName: params?.lastname,
      sex: params?.sex as PATIENT_SEX,
      birthday: params?.birthday as string,
    },
  });

  const navigation =
    useNavigation<AuthenticatedRootDrawerNavigationProps<"AddPatients">>();

  const isSubmittionSuccessful = isSubmitting && !isRequestDone;

  /**
   * A function for reseting the form after submitting
   */
  function resetForm() {
    reset();
  }

  /**
   * A function for executing toast callback
   */
  function onCloseToastComplete() {
    setRequestDone(true);
  }

  /**
   * A function used to show different toasts for updating and creating new patient
   */
  function showToast() {
    // TODO: toast message
    if (params?.isEdit) {
      // for edit
      toast.show({
        id: "Updated patient successfully",
        description: "Successfully updated patient",
        onCloseComplete: onCloseToastComplete,
      });
    } else {
      // for insert
      toast.show({
        id: "Created patient successfully",
        description: "Successfully created new patient",
        onCloseComplete: onCloseToastComplete,
      });
    }
  }

  /**
   * A callback function for submiting data form
   * @param data a {@link AddPatientFormData}
   */
  function onSubmit(data: AddPatientFormData) {
    const builder = new PatientBuilder();
    const patient = builder
      .setFirstname(data.firstName)
      .setLastname(data.lastName)
      .setBirthday(parseDateFromClientToSupabase(data.birthday))
      .setSex(data.sex)
      .build();

    if (params.isEdit) patient.id = String(params.id);

    patient
      .save<FEEDBACK>()
      .then(({ success, error }) => {
        // TODO: show toast message
        if (success) {
          showToast();
          navigation.navigate("Patients");
        }
        if (error) logError("onSubmit() error from database")(error);
      })
      .catch(logError("runtime error onSubmit() trying to save patient object"))
      .finally(resetForm);
  }

  return (
    <Box w={"100%"}>
      <ScrollView>
        <Center p="20">
          <VStack space="5">
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <FormControlInput
                  labelText="First name"
                  helperText="Enter Patients first name"
                  errorMessage="Patient first name is required!"
                  formProps={{
                    isRequired: true,
                    isInvalid: isInvalid(error?.message),
                  }}
                  inputProps={{
                    placeholder: "First name",
                    w: "100%",
                    value,
                    onBlur,
                    onChangeText: onChange,
                  }}
                />
              )}
              name="firstName"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <FormControlInput
                  labelText="Last name"
                  helperText="Enter Patients last name"
                  errorMessage="Patient last name is required!"
                  formProps={{
                    isRequired: true,
                    isInvalid: isInvalid(error?.message),
                  }}
                  inputProps={{
                    placeholder: "Last name",
                    w: "100%",
                    value,
                    onBlur,
                    onChangeText: onChange,
                  }}
                />
              )}
              name="lastName"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <FormControlSelect
                  labelText="Patient sex"
                  helperText="Choose patients gender"
                  errorMessage="Patient gender is required!"
                  formProps={{
                    isRequired: true,
                    isInvalid: isInvalid(error?.message),
                  }}
                  selectProps={{
                    placeholder: "Select patient sex",
                    minWidth: "64",
                    selectedValue: value,
                    onClose: onBlur,
                    onValueChange: onChange,
                  }}
                  items={FORM_SELECT_ITEMS.SELECT_SEX}
                />
              )}
              name="sex"
              rules={{ required: true }}
            />

            <MaskedInput
              controllerProps={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                control: control,
                name: "birthday",
                rules: {
                  required: "Birth date is required",
                  validate: validateBirthDate,
                },
              }}
              formInputProps={{
                labelText: "Birth date",
                helperText: "Enter Patients birth date",
                errorMessage: errors.birthday?.message,
                formProps: {
                  isRequired: true,
                },
                inputProps: {
                  placeholder: "DD/MM/YYYY",
                  keyboardType: "number-pad",
                },
              }}
              mask={Masks.DATE_DDMMYYYY}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmittionSuccessful}
              isDisabled={isSubmittionSuccessful}
            >
              {params?.isEdit ? "Update patient" : "Add patient"}
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </Box>
  );
}
