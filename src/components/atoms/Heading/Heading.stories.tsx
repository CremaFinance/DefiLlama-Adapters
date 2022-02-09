import type { ComponentStory } from "@storybook/react";

import Heading from "./index";

export const Default: ComponentStory<typeof Heading> = (args) => {
  return <Heading {...args}>This is a heading</Heading>;
};

export default { title: "Atoms/Heading" };
