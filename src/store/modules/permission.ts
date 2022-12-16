import { asyncRoutes, constantRoutes } from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";
import { type RouteRecordRaw } from "vue-router";
import store from "..";
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
	if (route.meta && route.meta.roles) {
		return roles.some(role => {
			if (route.meta?.roles !== undefined) {
				return route.meta.roles.includes(role);
			} else {
				return false;
			}
		});
	} else {
		return true;
	}
};
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
	const res: RouteRecordRaw[] = [];
	routes.forEach(route => {
		const r = { ...route };
		if (hasPermission(roles, r)) {
			if (r.children) {
				r.children = filterAsyncRoutes(r.children, roles);
			}
		}
		res.push(r);
	});
	return res;
};

export const usePermissionStore = defineStore("permission", () => {
	const routes = ref<RouteRecordRaw[]>([]);
	const dynamicRoutes = ref<RouteRecordRaw[]>([]);
	const setRoutes = (roles: string[]) => {
		let accessedRoutes;
		if (roles.includes("admin")) {
			accessedRoutes = asyncRoutes;
		} else {
			accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
		}
		routes.value = constantRoutes.concat(accessedRoutes);
		dynamicRoutes.value = accessedRoutes;
	};
	return { routes, dynamicRoutes, setRoutes };
});
export function usePermissionStoreHook() {
	return usePermissionStore(store);
}
