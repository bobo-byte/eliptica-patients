import {
  FormControl,
  IFormControlErrorMessageProps,
  IFormControlHelperTextProps,
  IFormControlLabelProps,
  IFormControlProps,
  IInputProps,
  Input,
} from "native-base";
import React from "react";

/**
 * Wrapped form controlled  {@link Input} props typr
 */
export type FormControlInputProp = {
  labelText: string;
  helperText: string;
  errorMessage: string;
  formProps: Omit<IFormControlProps, "children">;
  labelProps: Omit<IFormControlLabelProps, "children">;
  inputProps: Omit<IInputProps, "children">;
  helperProps: Omit<IFormControlHelperTextProps, "children">;
  errorProps: Omit<IFormControlErrorMessageProps, "children">;
};

/**
 * A wrapped input that is form controlled using {@link FormControl}
 * @param props {@link Partial<FormControlInputProp>}
 * @returns the wrapped input from native-base
 */
export default function FormControlInput({
  labelText,
  helperText,
  errorMessage,
  inputProps,
  formProps,
  labelProps,
  helperProps,
  errorProps,
}: Partial<FormControlInputProp>) {
  return (
    <FormControl {...formProps}>
      <FormControl.Label {...labelProps}>{labelText}</FormControl.Label>
      <Input {...inputProps} />
      <FormControl.HelperText {...helperProps}>
        {helperText}
      </FormControl.HelperText>
      <FormControl.ErrorMessage {...errorProps}>
        {!errorMessage && formProps?.isRequired
          ? `${labelText} is a required field`
          : errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
