import { Button, Popover } from "native-base";
import React, { useState } from "react";

/**
 * Patient delete button props
 */
type IDeletePatientButtonProps = {
  patient_name: string;
  isLoading?: boolean;
  onDelete: () => void;
};

/**
 * A delete button component that will execute a popover dialog
 * @param props {@link IDeletePatientButtonProps}
 * @returns
 */
export default function DeletePatientButton({
  patient_name,
  isLoading = false,
  onDelete,
}: IDeletePatientButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Button
            colorScheme="danger"
            {...triggerProps}
            onPress={() => setIsOpen(true)}
          >
            Delete
          </Button>
        );
      }}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content w="56">
        <Popover.Arrow />
        <Popover.CloseButton onPress={() => setIsOpen(false)} />
        <Popover.Header>Delete Patient</Popover.Header>
        <Popover.Body>
          This will remove all data relating to {patient_name}. This action
          cannot be reversed. Deleted data can not be recovered.
        </Popover.Body>
        <Popover.Footer justifyContent="flex-end">
          <Button.Group space={2}>
            <Button
              colorScheme="coolGray"
              variant="ghost"
              onPress={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="danger"
              isLoading={isLoading}
              onPress={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </Button.Group>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
}
