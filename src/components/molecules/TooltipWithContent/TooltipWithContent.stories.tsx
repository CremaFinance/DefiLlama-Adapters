import { Flex } from "@chakra-ui/react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../../atoms/Button";

import TooltipWithContent from "./index";

export default {
  title: "Atoms/TooltipWithContent",
  component: TooltipWithContent,
} as ComponentMeta<typeof TooltipWithContent>;

const Template: ComponentStory<typeof TooltipWithContent> = (args) => (
  <TooltipWithContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tooltipText: "Text or toolyip",
  children: (
    <Flex alignItems="center" justifyContent="center">
      <Button variant="solid" width="400px">
        Test
      </Button>
    </Flex>
  ),
};
