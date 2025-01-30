import type { Meta, StoryObj } from "@storybook/react";
import BaseTemplate from "./BaseTemplate";
import { mockBaseTemplateProps } from "./BaseTemplate.mocks";

const meta: Meta<typeof BaseTemplate> = {
    component: BaseTemplate,
    title: "templates/BaseTemplate",
};
export default meta;

type StoryTemplate = StoryObj<typeof BaseTemplate>;

export const Template: StoryTemplate = {
    args: {
        ...mockBaseTemplateProps.base,
    },
};

export const Base: StoryTemplate = Template;
Base.args = {
    ...mockBaseTemplateProps.base,
};
