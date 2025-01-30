import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { WalletView } from "./WalletView";

const meta = {
    title: "Wallet/View",
    component: WalletView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof WalletView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WalletConnected: Story = {};

export const WalletDisconnected: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const addWalletButton = canvas.getByRole("button", {
            name: /Wallet Connected/i,
        });
        await expect(addWalletButton).toBeInTheDocument();
        await userEvent.click(addWalletButton);
        await expect(addWalletButton).not.toBeInTheDocument();

        const removeWalletButton = canvas.getByRole("button", {
            name: /Wallet Disconnected/i,
        });
        await expect(removeWalletButton).toBeInTheDocument();
    },
};
