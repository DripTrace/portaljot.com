import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { SettingsView } from "./SettingsView";

const meta = {
    title: "Setting/View",
    component: SettingsView,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsUsed: Story = {};

export const SettingsUnused: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const useSettingsButton = canvas.getByRole("button", {
            name: /Settings used/i,
        });
        await expect(useSettingsButton).toBeInTheDocument();
        await userEvent.click(useSettingsButton);
        await expect(useSettingsButton).not.toBeInTheDocument();

        const unuseSettingsButton = canvas.getByRole("button", {
            name: /Settings unused/i,
        });
        await expect(unuseSettingsButton).toBeInTheDocument();
    },
};
