import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FeaturedView } from "./FeaturedView";

const meta = {
    title: "Featured/View",
    component: FeaturedView,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof FeaturedView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        primary: true,
        label: "FeaturedView",
    },
};

export const Secondary: Story = {
    args: {
        label: "FeaturedView",
    },
};

export const Large: Story = {
    args: {
        size: "large",
        label: "FeaturedView",
    },
};

export const Small: Story = {
    args: {
        size: "small",
        label: "FeaturedView",
    },
};
