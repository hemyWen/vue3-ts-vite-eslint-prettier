import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { message } from "ant-design-vue";
import { get } from "lodash-es";
import { getToken } from "./cache/cookies";
import { ErrorCode } from "@/constants/error";

/** 创建请求实例 */
function createService() {
	// 创建一个 Axios 实例
	const service = axios.create();
	// 请求拦截
	service.interceptors.request.use(
		config => config,
		// 发送失败
		error => Promise.reject(error)
	);
	// 响应拦截（可根据具体业务作出相应的调整）
	service.interceptors.response.use(
		response => {
			// apiData 是 API 返回的数据
			const apiData = response.data as any;
			// 这个 Code 是和后端约定的业务 Code
			const code = apiData.code;
			// 如果没有 Code, 代表这不是项目后端开发的 API
			if (code === undefined) {
				message.error("非本系统的接口");
				return Promise.reject(new Error("非本系统的接口"));
			} else {
				switch (code) {
					case 0:
						return apiData;
					default:
						message.error(apiData.message || "Error");
						return Promise.reject(new Error("Error"));
				}
			}
		},
		error => {
			//返回错误状态码
			const code = get(error, "response.status");
			if (code === ErrorCode.TokenOverdue) {
				useUserStoreHook().logout();
				location.reload();
			} else {
				error.message = ErrorCode.CodeToMessage(code);
				message.error(error.message);
			}
			return Promise.reject(error);
		}
	);
	return service;
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
	return function (config: AxiosRequestConfig) {
		const configDefault = {
			headers: {
				// 携带 Token
				Authorization: "Bearer " + getToken(),
				"Content-Type": get(config, "headers.Content-Type", "application/json")
			},
			timeout: 5000,
			baseURL: import.meta.env.VITE_BASE_API,
			data: {}
		};
		return service(Object.assign(configDefault, config));
	};
}

/** 用于网络请求的实例 */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
