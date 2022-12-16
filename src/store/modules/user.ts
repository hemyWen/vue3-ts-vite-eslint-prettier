import { getUserInfoApi, loginApi } from "@/api/login";
import router, { resetRouter } from "@/router";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import { defineStore } from "pinia";
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import store from "@/store";
import { usePermissionStore } from "./permission";
import { LoginFormInstance } from "@/types";

export const useUserStore = defineStore("user", () => {
	const token = ref<string>(getToken());
	const roles = ref<string[]>([]);
	const username = ref<string>("");

	const setRoles = (value: string[]) => {
		roles.value = value;
	};

	const login = (loginData: LoginFormInstance) => {
		return new Promise((resolve, reject) => {
			loginApi({
				username: loginData.username,
				password: loginData.password
			})
				.then((res: any) => {
					setToken(res.data.token);
					token.value = res.data.token;
					resolve(true);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	};

	const getInfo = () => {
		return new Promise((resolve, reject) => {
			getUserInfoApi()
				.then((res: any) => {
					roles.value = res.data.roles;
					username.value = res.data.username;
					resolve(res);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	};

	const changeRoles = async (role: string) => {
		const newToken = "token-" + role;
		token.value = newToken;
		setToken(newToken);
		await getInfo();
		const permissionStore = usePermissionStore();
		permissionStore.setRoutes(roles.value);
		resetRouter();
		permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
			router.addRoute(item);
		});
	};
	const logout = () => {
		removeToken();
		token.value = "";
		roles.value = [];
		resetRouter();
	};
	const resetToken = () => {
		removeToken();
		token.value = "";
		roles.value = [];
	};
	return { token, roles, username, setRoles, login, getInfo, changeRoles, logout, resetToken };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
	return useUserStore(store);
}
