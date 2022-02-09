import { Alert as Toast } from "@chakra-ui/react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Atoms/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Toast {...args}>{args.status}</Toast>
);

export const Info = Template.bind({});
Info.args = {
  status: "info",
};

export const Warning = Template.bind({});
Warning.args = {
  status: "warning",
};

export const Success = Template.bind({});
Success.args = {
  status: "success",
};

export const Error = Template.bind({});
Error.args = {
  status: "error",
};
