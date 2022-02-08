import type { ComponentStory } from "@storybook/react";

import UnstakeOptions from "./index";

export default { title: "Molecules/UnstakeOptions" };

export const Default: ComponentStory<typeof UnstakeOptions> = (args) => {
  return <UnstakeOptions {...args} />;
};

Default.args = {
  active: true,
  unstakeNowReceive: "0",
  delayedUnstakeReceive: "0",
  initialUnstakeNowFee: 0,
  actualUnstakeNowFee: () => 0.3,
  inputValue: "0",
  my: 2,
  handleSwitch: () => {},
};
