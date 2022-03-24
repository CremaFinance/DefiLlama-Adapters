import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import PerformanceNotification from "../PerformanceNotification";

const SystemNotificationHandler: FunctionComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box pt={isOpen ? 10 : 0}>
      <PerformanceNotification
        showNotification={isOpen}
        onOpen={() => onOpen()}
        onClose={() => onClose()}
      />
      {children}
    </Box>
  );
};

export default SystemNotificationHandler;
