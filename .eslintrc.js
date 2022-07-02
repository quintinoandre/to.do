module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'eslint-plugin-import-helpers',
		'@typescript-eslint/eslint-plugin',
		'prettier',
		'unused-imports',
	],
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: [
					'module',
					'/^@server/shared/',
					'/^@/',
					['parent', 'sibling', 'index'],
				],
				alphabetize: {
					order: 'asc',
					ignoreCase: true,
				},
			},
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: true,
				},
			},
			{
				selector: 'typeAlias',
				format: ['PascalCase'],
				custom: {
					regex: '^T[A-Z]',
					match: true,
				},
			},
			{
				selector: 'class',
				format: ['PascalCase'],
			},
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
