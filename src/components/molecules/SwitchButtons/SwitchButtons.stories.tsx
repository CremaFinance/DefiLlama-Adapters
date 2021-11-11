import { ComponentStory } from "@storybook/react";

import SwitchButtons from "./index";

export default { title: "Molecules/SwitchButtons" };

export const Default: ComponentStory<typeof SwitchButtons> = (args) => {
  return <SwitchButtons {...args} />;
};

Default.args = {
  leftText: "On",
  rightText: "Off",
  height: 40,
  width: ["60px"],
  buttonWidth: ["280px"],
  my: [4],
  active: false,
  font: "text-lg",
  display: "flex",
  handleSwitch: () => {},
};
