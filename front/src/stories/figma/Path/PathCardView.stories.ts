import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { PathView } from "./PathView";

const meta = {
    title: "PathCard/View",
    component: PathView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof PathView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PathLinked: Story = {};

export const PathUnlinked: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const linkPathButton = canvas.getByRole("button", {
            name: /Path Linked/i,
        });
        await expect(linkPathButton).toBeInTheDocument();
        await userEvent.click(linkPathButton);
        await expect(linkPathButton).not.toBeInTheDocument();

        const unlinkPathButton = canvas.getByRole("button", {
            name: /Path Unlinked/i,
        });
        await expect(unlinkPathButton).toBeInTheDocument();
    },
};
