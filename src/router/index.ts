import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
			hidden: true
		}
	},
	{
		path: "/",
		component: Layout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				name: "Dashboard",
				meta: {
					title: "首页",
					iconName: "HomeFilled",
					affix: true
				}
			}
		]
	},
	{
		path: "/table",
		component: Layout,
		name: "Table",
		meta: {
			title: "表格",
			iconName: "table-outlined"
		},
		children: [
			{
				path: "element-plus",
				component: () => import("@/views/table/element-plus/index.vue"),
				name: "ElementPlus",
				meta: {
					title: "Element Plus"
				}
			},
			{
				path: "xxx",
				component: () => import("@/views/table/element-plus/index.vue"),
				name: "xxxx",
				meta: {
					title: "Element Plus"
				}
			}
		]
	}
];
export const asyncRoutes: RouteRecordRaw[] = [
	{
		path: "/permission",
		component: Layout,
		redirect: "/permission/page",
		name: "Permission",
		meta: {
			title: "权限管理",
			iconName: "lock-outlined",
			roles: ["admin", "editor"], // 可以在根路由中设置角色
			alwaysShow: true // 将始终显示根菜单
		},
		children: [
			{
				path: "page",
				component: () => import("@/views/permission/page.vue"),
				name: "PagePermission",
				meta: {
					title: "页面权限",
					roles: ["admin"] // 或者在子导航中设置角色
				}
			}
		]
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes
});
/** 重置路由 */
export function resetRouter() {
	// 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
	try {
		router.getRoutes().forEach(route => {
			const { name, meta } = route;
			if (name && meta.roles?.length) {
				router.hasRoute(name) && router.removeRoute(name);
			}
		});
	} catch (error) {
		// 强制刷新浏览器也行，只是交互体验不是很好
		window.location.reload();
	}
}
export default router;
