import type { ComponentStory } from "@storybook/react";

import SuccessStakeModal from "./index";

export default { title: "Molecules/SuccessStakeModal" };

export const Default: ComponentStory<typeof SuccessStakeModal> = (args) => {
  return <SuccessStakeModal {...args} />;
};

Default.args = {
  stakedAmount: "12.15984",
  stakedCurrency: "mSOL",
  isOpen: true,
  onClose: () => {},
};
