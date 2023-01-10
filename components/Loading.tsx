import React from "react";
import { Box, Spinner } from "native-base";

/**
 * A loading component for loading states
 * @returns centered spinner of size 70
 */
export default function Loading() {
  return (
    <Box width="full" h="full" justifyContent="center">
      <Spinner size={70} />
    </Box>
  );
}
