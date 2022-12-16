<script setup lang="ts">
import { computed } from "vue";
import { Sidebar, NavigationBar } from "./components";
import { useAppStore, DeviceType } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const classObj = computed(() => {
	return {
		hideSidebar: !appStore.sidebar.opened,
		openSidebar: appStore.sidebar.opened,
		withoutAnimation: appStore.sidebar.withoutAnimation,
		mobile: appStore.device === DeviceType.Mobile
	};
});
// const showSettings = computed(() => {
// 	return settingsStore.showSettings;
// });
const showTagsView = computed(() => {
	return settingsStore.showTagsView;
});
const fixedHeader = computed(() => {
	return settingsStore.fixedHeader;
});
</script>

<template>
	<div :class="classObj" class="app-wrapper">
		<Sidebar class="sidebar-container" />
		<div :class="{ hasTagsView: showTagsView }" class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<NavigationBar />
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
@import "@/styles/mixins.less";
.app-wrapper {
	.clearfixMixin();
	position: relative;
	width: 100%;
}
.sidebar-container {
	transition: width 0.28s;
	width: var(--hemy-sidebar-width);
	height: 100%;
	position: fixed;
	font-size: 0px;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
	overflow: hidden;
}
.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - var(--hemy-sidebar-width));
	transition: width 0.28s;
}

.main-container {
	min-height: 100%;
	// transition: margin-left 0.28s;
	margin-left: var(--hemy-sidebar-width);
	position: relative;
}
.hideSidebar {
	.main-container {
		margin-left: var(--hemy-sidebar-hide-width);
	}
	.sidebar-container {
		width: var(--hemy-sidebar-hide-width);
	}
	.fixed-header {
		width: calc(100% - var(--hemy-sidebar-hide-width));
	}
}
</style>
