// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copyAddressToClipboard = (v: string, toast: any, t: any) => {
  navigator.clipboard.writeText(v);

  toast({
    title: t("appPage.copy-success-title"),
    description: t("appPage.copy-success-message"),
    status: "success",
    variant: "subtle",
    isClosable: true,
  });
};
