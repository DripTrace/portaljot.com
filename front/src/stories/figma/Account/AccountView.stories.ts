import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { AccountView } from "./AccountView";

const meta = {
    title: "Account/View",
    component: AccountView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AccountView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountFinished: Story = {};

export const AccountUnfinished: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const finishAccountButton = canvas.getByRole("button", {
            name: /Account finished/i,
        });
        await expect(finishAccountButton).toBeInTheDocument();
        await userEvent.click(finishAccountButton);
        await expect(finishAccountButton).not.toBeInTheDocument();

        const unfinishAccountButton = canvas.getByRole("button", {
            name: /Account unfinished/i,
        });
        await expect(unfinishAccountButton).toBeInTheDocument();
    },
};
