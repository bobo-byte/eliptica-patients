import React from "react";
import { Button, Icon, IButtonProps } from "native-base";
import { AntDesign } from "@expo/vector-icons";

/**
 * Intersecting props for {@link Chip} component
 */
type IChipType = {
  isSelected: boolean;
  text: string;
  isHidden: number | boolean | null;
  onPress: () => void;
};

/**
 * Chip prop type declaration
 * Combination of {@link IChipType}, {@link IButtonProps}(without children)
 */
export type IChipProps = IChipType & Omit<IButtonProps, "children">;

/**
 * Chip component used to toggle or highlight a tags option
 * @param props chip props
 * @returns a rounded chip component based of outlined button from native-base
 */
export default function Chip(props: IChipProps) {
  if (props.isHidden) {
    return null;
  }

  if (props.isSelected) {
    return (
      <Button
        {...props}
        variant="outline"
        colorScheme="black"
        size="sm"
        borderRadius={20}
        onPress={props.onPress}
        leftIcon={<Icon as={AntDesign} name="check" size="sm" />}
      >
        {props.text}
      </Button>
    );
  }

  return (
    <Button
      {...props}
      variant="outline"
      colorScheme="black"
      size="sm"
      borderRadius={20}
      onPress={props.onPress}
    >
      {props.text}
    </Button>
  );
}
