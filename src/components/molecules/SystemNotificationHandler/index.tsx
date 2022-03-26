import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import GovernanceNotification from "../GovernanceNotification";
import PerformanceNotification from "../PerformanceNotification";

const SystemNotificationHandler: FunctionComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box pt={isOpen ? 20 : 10}>
      <PerformanceNotification
        showNotification={isOpen}
        onOpen={() => onOpen()}
        onClose={() => onClose()}
      />
      <GovernanceNotification />
      {children}
    </Box>
  );
};

export default SystemNotificationHandler;
