import { IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import colors from "../../../styles/customTheme/colors";

type InfoIconWithTooltipProps = {
  tooltipText: string;
};

const InfoIconWithTooltip = ({ tooltipText }: InfoIconWithTooltipProps) => {
  const [isTooltiplOpen, setIsTooltipOpen] = useState(false);

  return (
    <Tooltip
      hasArrow
      isOpen={isTooltiplOpen}
      label={tooltipText}
      bg={colors.marinadeEvenLighterGreen}
      color="black"
    >
      <IconButton
        _focus={{ boxShadow: "none" }}
        onClick={() => setIsTooltipOpen(true)}
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
        variant="link"
        aria-label="Info epoch"
        size="sm"
        icon={<MdInfoOutline />}
      />
    </Tooltip>
  );
};

export default InfoIconWithTooltip;
