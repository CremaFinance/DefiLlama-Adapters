import { ComponentStory } from "@storybook/react";

import StakeInput from "./index";

export default { title: "Molecules/StakeInput" };

export const Default: ComponentStory<typeof StakeInput> = (args) => {
  return <StakeInput {...args} />;
};

Default.args = {
  tokenName: "mSOL",
  tokenIcon: "",
  tokenBalance: 40,
  tokenCardWidth: ["87px"],
  width: ["256px", "400px"],
  mb: 2,
};
