import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { NFTModalView } from "./NFTModalView";

const meta = {
    title: "NFT/Modal",
    component: NFTModalView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof NFTModalView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const openModalButton = canvas.getByRole("button", {
            name: /Open NFT/i,
        });
        await expect(openModalButton).toBeInTheDocument();
        await userEvent.click(openModalButton);
        await expect(openModalButton).not.toBeInTheDocument();

        const closeModalButton = canvas.getByRole("button", {
            name: /Close NFT/i,
        });
        await expect(closeModalButton).toBeInTheDocument();
    },
};
