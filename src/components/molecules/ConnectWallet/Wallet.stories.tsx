import { ComponentStory } from "@storybook/react";

import { ConnectWallet } from "./index";

export default { title: "Molecules/Wallet" };

export const Default: ComponentStory<typeof ConnectWallet> = () => {
  return <ConnectWallet />;
};
