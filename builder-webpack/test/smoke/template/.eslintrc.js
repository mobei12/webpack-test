module.exports = {
	env: {
		// 项目运行环境
		browser: true, // 浏览器端
		commonjs: true, // 支持CJS
		es2021: true // 支持ES2021及之前的所有语法
	},
	root: true,
	extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'], // Airbnb的校验规则
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		semi: ['error', 'never'],
		eqeqeq: ['error', 'smart'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'comma-dangle': ['error', 'never'],
		indent: ['error', 'tab'],
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: true }
		],
		'arrow-parens': ['error', 'as-needed'], // 箭头函数参数的括号按需
		quotes: ['error', 'single'],
		'implicit-arrow-linebreak': ['error', 'below']
	}
}
