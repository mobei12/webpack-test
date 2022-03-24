module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		requireConfigFile: false
	},
	env: {
		// 项目运行环境
		browser: true, // 浏览器端
		node: true // 支持CJS
	},
	root: true, // 只使用当前配置,不去根目录找
	extends: ['eslint:recommended', 'airbnb-base'], // Airbnb的校验规则
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
		'operator-linebreak': ['error', 'after'],
		'arrow-parens': ['error', 'as-needed'], // 箭头函数参数的括号按需
		quotes: ['error', 'single'],
		'implicit-arrow-linebreak': ['error', 'below']
	}
}
