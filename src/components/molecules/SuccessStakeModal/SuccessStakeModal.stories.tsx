import { ComponentStory } from "@storybook/react";

import Button from "../../atoms/Button";

import SuccessStakeModal from "./index";

export default { title: "Molecules/SuccessStakeModal" };

export const Default: ComponentStory<typeof SuccessStakeModal> = (args) => {
  return <SuccessStakeModal {...args} />;
};

Default.args = {
  children: ({ openModal }) => (
    <Button variant="solid" onClick={openModal}>
      Open modal
    </Button>
  ),
};
