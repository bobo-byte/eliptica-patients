import React from "react";
import { Mask, useMaskedInputProps } from "react-native-mask-input";
import { useController, ControllerProps, FieldValues } from "react-hook-form";
import FormControlInput, { FormControlInputProp } from "./FCInput";
import { isInvalid } from "../utils/components/FCHelpers";

type MaskedInputProps = {
  Component?: JSX.Element;
  fieldType: FieldValues;
  formInputProps: Partial<FormControlInputProp>;
  controllerProps: ControllerProps;
  mask: Mask;
};

/**
 * A masked input that masks specified {@link Mask}
 * @param props {@link MaskedInputProps}
 * @returns a {@link FormControlInput} with the masked state
 */
export default function MaskedInput(props: MaskedInputProps) {
  const { controllerProps, formInputProps, mask } = props;

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController(controllerProps);

  const maskedInputProps = useMaskedInputProps({
    value,
    onChangeText: onChange,
    mask: mask,
  });

  return (
    <FormControlInput
      labelText={formInputProps.labelText}
      helperText={formInputProps.helperText}
      errorMessage={formInputProps.errorMessage}
      formProps={{
        ...formInputProps.formProps,
        isInvalid: isInvalid(error?.message),
      }}
      inputProps={{
        ...maskedInputProps,
        placeholder: formInputProps.inputProps?.placeholder || "",
        w: "100%",
        onBlur,
      }}
    />
  );
}
