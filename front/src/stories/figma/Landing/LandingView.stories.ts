import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { LandingView } from "./LandingView";

const meta = {
    title: "Landing/View",
    component: LandingView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof LandingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingSeen: Story = {};

export const LandingUnSeen: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const seeLandingButton = canvas.getByRole("button", {
            name: /Landing seen/i,
        });
        await expect(seeLandingButton).toBeInTheDocument();
        await userEvent.click(seeLandingButton);
        await expect(seeLandingButton).not.toBeInTheDocument();

        const unseeLandingButton = canvas.getByRole("button", {
            name: /Landing unseen/i,
        });
        await expect(unseeLandingButton).toBeInTheDocument();
    },
};
