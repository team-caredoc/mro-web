module.exports = {
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^@/(.*)$',
    '', // empty line
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // empty line
    '^@/hooks(.*)$',
    '', // empty line
    '^@/components/ui(.*)$',
    '', // empty line
    '^@/(.*)$',
    '', // empty line
    '^[.]', // relative imports
  ],
  importOrderTypeScriptVersion: '5.0.0',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: false,
};
