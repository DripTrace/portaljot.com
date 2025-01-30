import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ProfileButton } from "./ProfileButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Profile/Button",
    component: ProfileButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        backgroundColor: { control: "color" },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof ProfileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        primary: true,
        label: "ProfileButton",
    },
};

export const Secondary: Story = {
    args: {
        label: "ProfileButton",
    },
};

export const Large: Story = {
    args: {
        size: "large",
        label: "ProfileButton",
    },
};

export const Small: Story = {
    args: {
        size: "small",
        label: "ProfileButton",
    },
};

// Replace your-framework with the name of your framework
// import type { Meta, StoryObj } from "@storybook/react";

// import { ProfileButton } from "./ProfileButton";

// const meta: Meta<typeof ProfileButton> = {
//     component: ProfileButton,
// };

// export default meta;
// type Story = StoryObj<typeof ProfileButton>;

// //👇 Throws a type error it the args don't match the component props
// export const Primary: Story = {
//     args: {
//         primary: true,
//     },
// };
