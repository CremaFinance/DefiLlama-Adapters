import { ComponentStory } from "@storybook/react";

import StakeInputMenuItem from "./index";

export default { title: "Molecules/StakeInputMenuItem" };

export const Default: ComponentStory<typeof StakeInputMenuItem> = (args) => {
  return <StakeInputMenuItem {...args} />;
};

Default.args = {
  icon: "",
  balance: 0.3,
  title: "SOL",
  subTitle: "SOL (stake account)",
  onClick: () => {},
  shortenSubtitle: false,
};
