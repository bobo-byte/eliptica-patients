import {
  FormControl,
  IFormControlErrorMessageProps,
  IFormControlHelperTextProps,
  IFormControlLabelProps,
  IFormControlProps,
  ISelectItemProps,
  ISelectProps,
  Select,
} from "native-base";
import React from "react";

/**
 * Wrapped form controlled  {@link Select} props typr
 */
export type FormControlSelectProp = {
  labelText: string;
  helperText: string;
  errorMessage: string;
  formProps: Omit<IFormControlProps, "children">;
  labelProps: Omit<IFormControlLabelProps, "children">;
  selectProps: Omit<ISelectProps, "children">;
  helperProps: Omit<IFormControlHelperTextProps, "children">;
  errorProps: Omit<IFormControlErrorMessageProps, "children">;
  items: Omit<Partial<ISelectItemProps>, "children">[];
};

/**
 * Select item prop types without the children property
 */
export type SelectItemsType = {
  [n: string]: Partial<Omit<ISelectItemProps, "children">>[];
};

/**
 * A wrapped select that is form controlled using {@link FormControl}
 * @param props {@link FormControlSelectProp}
 * @returns wrapped select component from native-base
 */
export default function FormControlSelect({
  labelText,
  helperText,
  errorMessage,
  selectProps,
  formProps,
  labelProps,
  helperProps,
  errorProps,
  items,
}: Partial<FormControlSelectProp>) {
  return (
    <FormControl {...formProps}>
      <FormControl.Label {...labelProps}>
        {(items && labelText) || "Select does not render without items"}
      </FormControl.Label>
      {items ? (
        <Select {...selectProps}>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            items.map((selectItemProps, index) => {
              if (
                typeof selectItemProps.value === "undefined" &&
                typeof selectItemProps.label !== "undefined"
              )
                return (
                  <Select.Item
                    key={index + "-item"}
                    label={selectItemProps.label}
                    value={selectItemProps.label}
                  />
                );
              if (selectItemProps.label && selectItemProps.value)
                return (
                  <Select.Item
                    key={index + "-item"}
                    {...selectItemProps}
                    label={selectItemProps.label}
                    value={selectItemProps.value}
                  />
                );
            })
          }
        </Select>
      ) : null}
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
