<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
import Hamburger from "../Hamburger/index.vue";
import Breadcrumb from "../Breadcrumb/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
const appStore = useAppStore();
const sidebar = computed(() => {
	return appStore.sidebar;
});

const toggleSidebar = () => {
	appStore.toggleSidebar(false);
};
</script>

<template>
	<div class="navigation-bar">
		<Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
		<Breadcrumb class="breadcrumb" />
		<div class="right-menu">
			<Screenfull />
		</div>
	</div>
</template>

<style lang="less" scoped>
.navigation-bar {
	height: var(--hemy-navigationbar-height);
	overflow: hidden;
	background: #fff;

	.hamburger {
		display: flex;
		align-items: center;
		height: 100%;
		float: left;
		padding: 0 15px;
		cursor: pointer;
	}

	.breadcrumb {
		float: left;
	}

	.right-menu {
		float: right;
		margin-right: 10px;
		height: 100%;
		display: flex;
		align-items: center;
		color: #606266;
	}
}
</style>
