import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
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
  ...pluginQuery.configs["flat/recommended"],
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
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true, // 대소문자 무시
          callbacksLast: true, // 콜백 props 마지막으로
          shorthandFirst: true, // shorthand props 먼저
          noSortAlphabetically: false, // 알파벳 순서 정렬
          reservedFirst: true, // key/ref 같은 예약 props 먼저
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
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

      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/no-unescaped-entities": "off",
    },
  },
);
