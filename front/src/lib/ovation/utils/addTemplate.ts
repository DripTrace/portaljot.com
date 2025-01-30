import fs from "fs";
import inquirer from "inquirer";
import path from "path";

const templatesDir = path.join(__dirname, "../../src/components/Templates");

async function createTemplate() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "templateType",
            message: "What kind of template would you like to create?",
            choices: ["Page", "Section", "Subcomponent"],
        },
        {
            type: "input",
            name: "templateName",
            message: "What is the name of the template?",
            validate: (input) =>
                input !== "" || "Please enter a valid name for the template.",
        },
    ]);

    const { templateType, templateName } = answers;
    const componentDir = path.join(templatesDir, `${templateType}s`);
    const componentName =
        templateName.charAt(0).toUpperCase() + templateName.slice(1); // PascalCase

    // Check if the Templates directory exists, if not create it
    if (!fs.existsSync(templatesDir)) {
        fs.mkdirSync(templatesDir, { recursive: true });
    }

    // Check if the specific component type directory exists, if not create it
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }

    const componentPath = path.join(componentDir, componentName);

    // Check if the component directory already exists
    if (fs.existsSync(componentPath)) {
        console.error(
            `A ${templateType.toLowerCase()} with the name ${componentName} already exists.`
        );
        return;
    }

    // Creating a directory for the new component
    fs.mkdirSync(componentPath);

    // Generate component file content
    const tsxContent = `// ${componentName}.tsx
import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div>
      {/* Add ${templateType.toLowerCase()} ${componentName} code here */}
    </div>
  );
};

export default ${componentName};
`;

    // Generate story file content
    const storyContent = `// ${componentName}.stories.ts
import React from 'react';
import { Meta, Story } from '@storybook/react';
import ${componentName} from './${componentName}';

export default {
  title: '${templateType}s/${componentName}',
  component: ${componentName},
} as Meta;

const Template: Story = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {};
`;

    // Write the component and story files
    fs.writeFileSync(
        path.join(componentPath, `${componentName}.tsx`),
        tsxContent
    );
    fs.writeFileSync(
        path.join(componentPath, `${componentName}.stories.ts`),
        storyContent
    );

    console.log(
        `${componentName} ${templateType.toLowerCase()} has been created.`
    );
}

createTemplate().catch((error) => {
    console.error("An error occurred:", error);
});
