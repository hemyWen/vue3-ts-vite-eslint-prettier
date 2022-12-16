<script setup lang="ts">
import { ref, watch } from "vue";
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router";
import { compile } from "path-to-regexp";
const route = useRoute();
const router = useRouter();
const breadcrumbs = ref<RouteLocationMatched[]>([]);
const getBreadcrumb = () => {
	breadcrumbs.value = route.matched.filter(item => {
		return item.meta && item.meta.title;
	});
};
const pathCompile = (path: string) => {
	const { params } = route;
	const toPath = compile(path);
	return toPath(params);
};
const handleLink = (item: RouteLocationMatched) => {
	const { redirect, path } = item;
	if (redirect) {
		router.push(redirect as string);
		return;
	}
	router.push(pathCompile(path));
};
watch(
	() => route.path,
	(path: string) => {
		if (path.startsWith("/redirect/")) {
			return;
		}
		getBreadcrumb();
	}
);
getBreadcrumb();
</script>

<template>
	<a-breadcrumb>
		<a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
			<span v-if="!item.redirect || index === breadcrumbs.length - 1" class="no-redirect">
				{{ item.meta.title }}
			</span>
			<a v-else @click.prevent="handleLink(item)">
				{{ item.meta.title }}
			</a>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<style lang="less" scoped>
.ant-breadcrumb {
	font-weight: 400 !important;
	font-size: 14px;
	line-height: var(--hemy-navigationbar-height);
	margin-left: 8px;
}
</style>
