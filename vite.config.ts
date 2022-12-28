import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
/** 路径查找 */
const pathResolve = (dir: string): string => {
	return resolve(__dirname, ".", dir);
};
/** 设置别名 */
const alias: Record<string, string> = {
	"@": pathResolve("src"),
	"@build": pathResolve("build")
};

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	server: {
		/** 是否开启 HTTPS */
		/** 接口代理 */
		proxy: {
			"/api/v1": {
				target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1",
				ws: true,
				/** 是否允许跨域 */
				changeOrigin: true,
				rewrite: path => path.replace("/api/v1", "")
			}
		}
	}
});
