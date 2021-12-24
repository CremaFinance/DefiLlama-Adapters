import { ComponentStory } from "@storybook/react";

import { Wallet } from "./index";

export default { title: "Molecules/Wallet" };

export const Default: ComponentStory<typeof Wallet> = () => {
  return <Wallet />;
};
