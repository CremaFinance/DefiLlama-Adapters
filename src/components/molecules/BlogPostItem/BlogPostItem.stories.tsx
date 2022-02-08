import type { ComponentStory } from "@storybook/react";

import BlogPostItem from "./index";

export default { title: "Molecules/BlogPostItem" };

export const Default: ComponentStory<typeof BlogPostItem> = (args) => {
  return <BlogPostItem {...args} />;
};

Default.args = {
  title: "Great Blog Post",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
  link: "link",
  date: "10-10-2022",
};
