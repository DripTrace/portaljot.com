import type { Meta, StoryObj } from "@storybook/react";
import ProfileTemplate from "./ProfileTemplate";
import { mockProfileTemplateProps } from "./ProfileTemplate.mocks";

const meta: Meta<typeof ProfileTemplate> = {
    component: ProfileTemplate,
    title: "templates/ProfileTemplate",
};
export default meta;

type ProfileStoryTemplate = StoryObj<typeof ProfileTemplate>;

export const ProvileViewTemplate: ProfileStoryTemplate = {
    args: {
        ...mockProfileTemplateProps.profileView,
    },
};

export const ProfileView: ProfileStoryTemplate = ProvileViewTemplate;
ProfileView.args = {
    ...mockProfileTemplateProps.profileView,
};
