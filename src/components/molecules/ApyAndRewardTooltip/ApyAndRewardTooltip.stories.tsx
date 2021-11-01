import { Flex } from "@chakra-ui/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../../atoms/Button";

import ApyAndRewardTooltip from "./index";

export default {
  title: "Atoms/ApyAndRewardTooltip",
  component: ApyAndRewardTooltip,
} as ComponentMeta<typeof ApyAndRewardTooltip>;

const Template: ComponentStory<typeof ApyAndRewardTooltip> = (args) => (
  <ApyAndRewardTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  anualPercentageYield: {
    trading: 2.47,
    emission: 2.51,
    doubleDip: 3.25,
  },
  rewardPerDay: {
    marinade: 66363.57,
    provider: 801.37,
    providerShortName: "ORCA",
  },
  children: (
    <Flex alignItems="center" justifyContent="center">
      <Button variant="solid" width="400px">
        Test
      </Button>
    </Flex>
  ),
};
