import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { ChartView } from "./ChartView";

const meta = {
    title: "Chart/View",
    component: ChartView,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof ChartView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ended: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Begun: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const beginButton = canvas.getByRole("button", { name: /Begun/i });
        await expect(beginButton).toBeInTheDocument();
        await userEvent.click(beginButton);
        await expect(beginButton).not.toBeInTheDocument();

        const endButton = canvas.getByRole("button", { name: /Ended/i });
        await expect(endButton).toBeInTheDocument();
    },
};
