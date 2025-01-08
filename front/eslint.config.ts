import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import * as tseslint from "typescript-eslint";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	...compat.config({
		extends: ["next/core-web-vitals", "plugin:@next/next/recommended"],
	}),
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": [
				"error",
				{
					allowDeclarations: true,
					allowDefinitionFiles: true,
				},
			],
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"prefer-const": "off",
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
	},
	{
		ignores: [".next/*", "node_modules/*"],
	},
] as const;
