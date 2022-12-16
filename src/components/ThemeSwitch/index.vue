<script setup lang="ts">
import { type ThemeName, useTheme } from "@/hooks/useTheme";
const { themeList, activeThemeName, setTheme } = useTheme();
const handleSetTheme = (name: ThemeName) => {
	setTheme(name);
};
</script>

<template>
	<el-dropdown trigger="click" @command="handleSetTheme">
		<div>
			<el-tooltip effect="dark" content="主题模式" placement="bottom">
				<el-icon :size="20">
					<a-button type="primary"></a-button>
				</el-icon>
			</el-tooltip>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="(theme, index) in themeList"
					:key="index"
					:disabled="activeThemeName === theme.name"
					:command="theme.name"
				>
					{{ theme.title }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style scoped></style>
