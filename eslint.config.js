/* eslint-env node */
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    plugins: {
      // loaded from package.json
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];