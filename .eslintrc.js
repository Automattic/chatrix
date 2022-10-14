module.exports = {
	root: true,
	env: {
		"browser": true,
		"es6": true
	},
	extends: [
		// "eslint:recommended",
	],
	plugins: ["@typescript-eslint",],
	parser: "@typescript-eslint/parser",
	rules: {
		semi: ["error", "always"],
	},
	overrides: [{
		files: ["*.ts", "*.tsx"],
		extends: [
			// "plugin:@typescript-eslint/recommended",
			// "plugin:@typescript-eslint/recommended-requiring-type-checking",
		],
		rules: {
			"@typescript-eslint/no-floating-promises": 2,
			"@typescript-eslint/no-misused-promises": 2,
		},
		parserOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			project: ["./tsconfig.json"]
		}
	}],
};
