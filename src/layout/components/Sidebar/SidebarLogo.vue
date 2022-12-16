<script setup lang="ts">
const props = defineProps({
	collapse: {
		type: Boolean,
		default: true
	}
});
</script>

<template>
	<div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
		<transition name="sidebar-logo-fade">
			<router-link v-if="props.collapse" key="collapse" to="/">
				<img src="@/assets/layout/hemy.png" class="sidebar-logo" />
			</router-link>
			<router-link v-else key="expand" to="/">
				<img src="@/assets/layout/hemy.png" class="sidebar-logo-text" />
			</router-link>
		</transition>
	</div>
</template>

<style lang="less" scoped>
.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: var(--hemy-header-height);
	line-height: var(--hemy-header-height);
	background-color: var(--hemy-sidebarlogo-bg-color);
	text-align: center;
	overflow: hidden;
	.sidebar-logo {
		display: none;
	}
	.sidebar-logo-text {
		height: 100%;
		vertical-align: middle;
	}
}
.collapse {
	.sidebar-logo {
		width: 32px;
		height: 32px;
		vertical-align: middle;
		display: inline-block;
	}
	.sidebar-logo-text {
		display: none;
	}
}
</style>
