import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";

import GovernanceNotification from "../GovernanceNotification";
import PerformanceNotification from "../PerformanceNotification";

const SystemNotificationHandler: FunctionComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [keepClosed, setKeepClosed] = useState(false);
  const [paddingTop, setPaddingTop] = useState(10);
  useEffect(() => {
    if (isOpen && !keepClosed) {
      setPaddingTop(20);
    } else if (!isOpen && keepClosed) {
      setPaddingTop(0);
    } else {
      setPaddingTop(10);
    }
  }, [isOpen, keepClosed]);

  return (
    <Box pt={paddingTop}>
      <PerformanceNotification
        showNotification={isOpen}
        onOpen={() => onOpen()}
        onClose={() => onClose()}
      />
      {!keepClosed ? (
        <GovernanceNotification onClose={setKeepClosed} />
      ) : undefined}
      {children}
    </Box>
  );
};

export default SystemNotificationHandler;
