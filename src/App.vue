<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";
import zhCN from "ant-design-vue/es/locale/zh_CN";
const { initTheme } = useTheme();
import { ConfigProvider } from "ant-design-vue";
ConfigProvider.config({
	theme: {
		primaryColor: "red"
	}
});
/** 初始化主题 */
initTheme();
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCN;
</script>

<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
