import { createStandaloneToast } from "@chakra-ui/react";

interface NotificationProps {
  title: string;
  description: string | JSX.Element;
  status: "info" | "warning" | "success" | "error";
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
  duration?: number;
  isClosable?: boolean;
}

export const toastNotification = ({
  title,
  description,
  status,
  position = "bottom",
  duration = 5000,
  isClosable = true,
}: NotificationProps) => {
  const toast = createStandaloneToast();
  return toast({
    title,
    description,
    position,
    status,
    duration,
    isClosable,
  });
};
