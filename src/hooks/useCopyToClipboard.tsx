import { useToast } from "@chakra-ui/react";

export const useCopyToClipBoard = (
  v: string,
  successTitleMessage: string,
  successBodyMessage: string,
  errorTitleMessage: string,
  errorBodyMessage: string
) => {
  const toast = useToast();
  try {
    navigator.clipboard.writeText(v);
    toast({
      title: successTitleMessage,
      description: successBodyMessage,
      status: "success",
      variant: "subtle",
      isClosable: true,
    });
  } catch (err) {
    toast({
      title: errorTitleMessage,
      description: errorBodyMessage,
      status: "success",
      variant: "subtle",
      isClosable: true,
    });
  }
};
