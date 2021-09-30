import React from "react";
import { ComponentStory } from "@storybook/react";
import { Heading } from ".";
export default { title: "Atoms/Heading" };

export const Default: ComponentStory<typeof Heading> = (args) => {
  return <Heading {...args}>This is a heading</Heading>;
};
