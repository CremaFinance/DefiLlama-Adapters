import { ComponentStory } from "@storybook/react";

import UnstakeOptions from "./index";

export default { title: "Molecules/UnstakeOptions" };

export const Default: ComponentStory<typeof UnstakeOptions> = (args) => {
  return <UnstakeOptions {...args} />;
};

Default.args = {
  active: true,
  unstakeBalance: "0",
  unstakeNowFee: 0,
  mb: 2,
  handleSwitch: () => {},
};
