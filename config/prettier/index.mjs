/**
 * @typedef {import("prettier").Config} PrettierConfig
 */

/** @type {PrettierConfig} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  quoteProps: "as-needed",
  trailingComma: "es5",
  arrowParens: "avoid",
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  bracketSameLine: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
