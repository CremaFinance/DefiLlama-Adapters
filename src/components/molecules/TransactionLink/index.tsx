import { Image } from "@chakra-ui/react";

import Link from "../../atoms/Link";

type TransactionLinkProps = {
  transactionid: string;
  chainName: string;
};

const TransactionLink = ({
  transactionid,
  chainName,
}: TransactionLinkProps) => {
  return (
    <Link
      font="text-md"
      href={`https://solscan.io/tx/${transactionid}?cluster=${chainName}`}
      isExternal
      fontWeight="bold"
      display="flex"
      flexDirection="row"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      overflow="hidden"
      width="180px"
      textDecoration="underline"
    >
      {transactionid}
      <Image
        src="/icons/external-link-green.svg"
        width="1rem"
        marginLeft="10px"
      />
    </Link>
  );
};

export default TransactionLink;
