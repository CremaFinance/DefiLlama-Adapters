import type { ComponentStory } from "@storybook/react";

import InfoIconWithTooltip from "./index";

export default { title: "Molecules/SwitchButtons" };

export const Default: ComponentStory<typeof InfoIconWithTooltip> = (args) => {
  return <InfoIconWithTooltip {...args} />;
};

Default.args = {
  tooltipText: "Text on tooltip",
};
