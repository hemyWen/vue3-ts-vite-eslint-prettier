<script setup lang="ts">
const props = defineProps({
	isActive: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits<{
	(e: "toggle-click"): void;
}>();
const toggleClick = () => {
	emit("toggle-click");
};
</script>

<template>
	<div @click="toggleClick" style="font-size: 20px">
		<menu-fold-outlined v-if="props.isActive" />
		<menu-unfold-outlined v-else />
	</div>
</template>

<style lang="less" scoped>
.anticon {
	vertical-align: middle;
}
</style>
