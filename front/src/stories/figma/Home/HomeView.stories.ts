import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { HomeView } from "./HomeView";

const meta = {
    title: "Home/View",
    component: HomeView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof HomeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeAccessed: Story = {};

export const HomeUnaccessed: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const accessHomeButton = canvas.getByRole("button", {
            name: /Home accessed/i,
        });
        await expect(accessHomeButton).toBeInTheDocument();
        await userEvent.click(accessHomeButton);
        await expect(accessHomeButton).not.toBeInTheDocument();

        const unaccessHomeButton = canvas.getByRole("button", {
            name: /Home unaccessed/i,
        });
        await expect(unaccessHomeButton).toBeInTheDocument();
    },
};
