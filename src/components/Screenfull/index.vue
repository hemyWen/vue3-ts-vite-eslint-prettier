<script setup lang="ts">
import { message } from "ant-design-vue";
import screenfull from "screenfull";
import { onUnmounted, ref } from "vue";
const props = defineProps({
	element: {
		type: String,
		default: "html"
	},
	openTips: {
		type: String,
		default: "全屏"
	},
	exitTips: {
		type: String,
		default: "退出全屏"
	}
});
const isFullscreen = ref<boolean>(false);
const tips = ref<string>(props.openTips);
const click = () => {
	const dom = document.querySelector(props.element) || undefined;
	if (!screenfull.isEnabled) {
		message.warning("您的浏览器无法工作");
		return;
	}
	screenfull.toggle(dom);
};
const change = () => {
	isFullscreen.value = screenfull.isFullscreen;
	tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips;
};
screenfull.on("change", change);
onUnmounted(() => {
	if (screenfull.isEnabled) {
		screenfull.off("change", change);
	}
});
</script>

<template>
	<div @click="click">
		<a-tooltip placement="left">
			<template #title>{{ tips }}</template>
			<fullscreen-exit-outlined v-if="isFullscreen" />
			<fullscreen-outlined v-else />
		</a-tooltip>
	</div>
</template>

<style lang="less" scoped>
.anticon {
	font-size: 20px;
	&:focus {
		outline: none;
	}
}
</style>
