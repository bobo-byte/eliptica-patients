import React, { useRef, useContext } from "react";
import { HStack } from "native-base";
import Chip from "./Chip";
import ScreenContext, {
  IWithScreenContextType,
} from "../contexts/ScreenContext";
import { QueryColumn } from "../utils/database/helper";

/**
 * Selectable item props
 */
export type IBoxState = {
  key: string;
  value: number; // 1, 2, 3, 4, 5,
  selected: boolean;
  queryColumn: QueryColumn;
  description: string;
};

/** The shared prop type with screen context */
export type SearchSelectComponentContextType = { currentValue: number };

/**
 * Search select list props
 */
export type ISearchSelectComponentProps = {
  boxes: IBoxState[];
  onSelected?: (currentValue: number, key: IBoxState["key"]) => void;
  renderItems?: (
    boxes: IBoxState[]
  ) => React.ReactElement<React.PropsWithChildren<IBoxState>>;
};

/**
 * A list of chips that are selected one at a time
 * @param props {@link ISearchSelectComponentProps}
 * @returns a list of select items/boxes that can only have one selected at a time
 */
export default function SelectComponent({
  boxes: boxes_,
  onSelected,
  renderItems,
}: ISearchSelectComponentProps) {
  const { screenState } = useContext(
    ScreenContext
  ) as IWithScreenContextType<SearchSelectComponentContextType>;

  const boxes = useRef<IBoxState[]>(boxes_).current;

  function handleChips(box: IBoxState) {
    if (screenState.currentValue === box.value && onSelected) {
      // already selected therefore toggle
      box.selected = false;
      onSelected(0, "");
    } else if (screenState.currentValue !== box.value && onSelected) {
      box.selected = true;
      onSelected(box.value, box.key);
    }
  }

  if (renderItems) {
    return renderItems(boxes);
  }

  return (
    <HStack>
      {boxes.map((box) => {
        return (
          <Chip
            key={box.value}
            m={1}
            isHidden={
              screenState.currentValue && screenState.currentValue !== box.value
            }
            isSelected={box.selected}
            text={box.description}
            onPress={() => handleChips(box)}
          />
        );
      })}
    </HStack>
  );
}
