import type { ComponentStory } from "@storybook/react";

import Countdown from "./index";

export default { title: "Atoms/Countdown" };

export const Default: ComponentStory<typeof Countdown> = (args) => {
  return <Countdown {...args} />;
};

Default.args = {
  initialTimeLeft: 1640541861234,
};
