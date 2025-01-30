import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { ProfileStatsView } from "./ProfileStatsView";

const meta = {
    title: "Profile/View/Stats",
    component: ProfileStatsView,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileStatsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatsActive: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const StatsInactive: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const activateStatsButton = canvas.getByRole("button", {
            name: /Stats activated/i,
        });
        await expect(activateStatsButton).toBeInTheDocument();
        await userEvent.click(activateStatsButton);
        await expect(activateStatsButton).not.toBeInTheDocument();

        const deactivateStatsButton = canvas.getByRole("button", {
            name: /Stats inactive/i,
        });
        await expect(deactivateStatsButton).toBeInTheDocument();
    },
};
