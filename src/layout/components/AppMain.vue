<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const key = computed(() => {
	return route.path;
});
</script>

<template>
	<section class="app-main">
		<router-view v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<component :is="Component" :key="key"></component>
			</transition>
		</router-view>
	</section>
</template>

<style lang="less" scoped>
.app-main {
	min-height: calc(100vh-var(--hemy-navigationbar-height));
	width: 100%;
	position: relative;
	overflow: hidden;
	background-color: var(--hemy-body-bg-color);
}
.fixed-header + .app-main {
	padding-top: var(--hemy-navigationbar-height);
	height: 100vh;
	overflow: auto;
}
.hasTagsView {
	.app-main {
		min-height: calc(100vh - var(--hemy-header-height));
	}
	.fixed-header + .app-main {
		padding-top: var(--hemy-header-height);
	}
}
</style>
