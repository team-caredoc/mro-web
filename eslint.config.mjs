import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
// files 옵션 제거 후 다시 실행
export default tseslint.config(
  eslint.configs.recommended,
  react.configs.flat.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
    },
  },
);
