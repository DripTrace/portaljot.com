// ExampleButton.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import ExampleButtonView from "./ExampleButtonView";
import { exampleButtonViews } from "./ExampleButtonView.mock";
// Importing the entire exampleButtonLinkView array

const meta: Meta<typeof ExampleButtonView> = {
    title: "Components/ExampleButtonView",
    component: ExampleButtonView,
};
export default meta;

type ExampleButtonViewStory = StoryObj<typeof ExampleButtonView>;

export const Default: ExampleButtonViewStory = {
    args: {
        exampleButtonView: exampleButtonViews[0], // Using the first link as the default prop
    },
};
