// Link.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import LinkView from "./LinkView";
import { linkViews } from "./LinkView.mocks";
// Importing the entire links array

const meta: Meta<typeof LinkView> = {
    title: "Components/LinkView",
    component: LinkView,
};
export default meta;

type LinkViewStory = StoryObj<typeof LinkView>;

export const Default: LinkViewStory = {
    args: {
        linkView: linkViews[0], // Using the first link as the default prop
    },
};
