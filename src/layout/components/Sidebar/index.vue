<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
import SidebarItem from "./SidebarItem.vue";
import SidebarLogo from "./SidebarLogo.vue";
import { storeToRefs } from "pinia";
import { computed, reactive, watch } from "vue";
import { usePermissionStore } from "@/store/modules/permission";
const settings = useSettingsStore();
const appStore = useAppStore();
const { showSidebarLogo } = storeToRefs(settings);

const isCollapse = computed(() => {
	return !appStore.sidebar.opened;
});
const state = reactive({
	collapsed: false,
	selectedKeys: ["1"],
	openKeys: ["sub1"],
	preOpenKeys: ["sub1"]
});
watch(
	() => state.openKeys,
	(_val, oldVal) => {
		state.preOpenKeys = oldVal;
	}
);

const permissionStore = usePermissionStore();
</script>

<template>
	<div :class="{ 'has-logo': showSidebarLogo }">
		<SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
		<a-menu mode="inline" theme="dark" :inline-collapsed="isCollapse">
			<SidebarItem
				v-for="route in permissionStore.routes"
				:key="route.path"
				:item="route"
				:base-path="route.path"
				:is-collapse="isCollapse"
			/>
		</a-menu>
	</div>
</template>

<style lang="less" scoped>
.has-logo {
	.ant-menu {
		height: calc(100% - var(--hemy-header-height));
	}
}
.ant-menu {
	border: none;
	width: 100%;
	height: 100%;
}
</style>
