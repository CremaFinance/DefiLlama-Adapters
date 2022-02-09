import { Flex } from "@chakra-ui/react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

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
  tradingApy: 9.34,
  rewards: {
    orca: {
      aprDescription: "Emission",
      dailyRate: 400.6849315068493,
      apy: 3.2887873290521905,
    },
    mnde: {
      aprDescription: "Double Dip",
      dailyRate: 6144,
      apy: 2.876070143892445,
    },
  },
  children: (
    <Flex alignItems="center" justifyContent="center">
      <Button variant="solid" width="400px">
        Test
      </Button>
    </Flex>
  ),
};
