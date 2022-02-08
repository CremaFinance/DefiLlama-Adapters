import type { FlexProps } from "@chakra-ui/react";
import { Flex, Image } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

import type { SortingState } from "./constants";
import { COLUMNS } from "./constants";

const poolSortPicker = (
  { column, isInverted }: SortingState,
  clickedColumn: COLUMNS
): SortingState => {
  if (clickedColumn === column) {
    if (isInverted) {
      return { column: COLUMNS.PROVIDER, isInverted: false };
    }
    return { column, isInverted: true };
  }
  return {
    column: clickedColumn,
    isInverted: false,
  };
};

type DesktopSortingColumnProps = {
  column: COLUMNS;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  sorting: SortingState;
} & FlexProps;

const DesktopSortingColumn = ({
  column,
  children,
  setSorting,
  sorting,
  ...rest
}: DesktopSortingColumnProps) => {
  return (
    <Flex
      {...rest}
      cursor="pointer"
      onClick={() => setSorting((s) => poolSortPicker(s, column))}
    >
      {children}
      {sorting.column === column && (
        <Image
          src="/icons/sorting-icon.svg"
          transform={`rotate(${sorting.isInverted ? "180deg" : "0deg"})`}
          marginLeft="10px"
        />
      )}
    </Flex>
  );
};

export default DesktopSortingColumn;
