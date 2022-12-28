<script setup lang="ts">
import Screenfull from "@/components/Screenfull/index.vue";
import { computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();

const showScreenfull = computed(() => {
	return settingsStore.showScreenfull;
});
const scrollTo = (direction: "left" | "right") => {
	console.log(direction);
};
</script>

<template>
	<div class="scroll-container">
		<left-outlined class="arrow left" @click="scrollTo('left')" />
		<div ref="scrollbarRef" class="scroll-bar">
			<div ref="scrollbarContentRef" class="scrollbar-content">
				<slot />
			</div>
		</div>
		<right-outlined class="arrow right" @click="scrollTo('right')" />
		<Screenfull v-if="showScreenfull" element=".app-main" openTips="内容区全屏" class="screenfull" />
	</div>
</template>

<style lang="less" scoped>
.scroll-container {
	height: 100%;
	user-select: none;
	display: flex;
	justify-content: space-between;
	.arrow {
		width: 40px;
		height: 100%;
		line-height: 1em;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		fill: currentColor;
		font-size: inherit;

		cursor: pointer;
		&.left {
			box-shadow: 5px 0 5px -6px #ccc;
		}
		&.right {
			box-shadow: -5px 0 5px -6px #ccc;
		}
	}
	.scroll-bar {
		flex: 1;
		overflow-y: auto;
		// 横向超出窗口长度时，显示滚动条
		white-space: nowrap;
		.scrollbar-content {
			display: inline-block;
		}
	}
	.screenfull {
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
}
</style>
