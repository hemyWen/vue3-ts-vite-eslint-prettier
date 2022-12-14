module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	overrides: [],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: "@typescript-eslint/parser"
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
		"@typescript-eslint/ban-types": "off", // 禁止使用特定类型
		"vue/multi-word-component-names": "off", //关闭组件名称校验
		"@typescript-eslint/no-non-null-assertion": "off"
	}
};
