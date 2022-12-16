import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"; // 创建vue实例
import router from "@/router";
import "@/router/permission";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/styles/index.less";
import * as antIcons from "@ant-design/icons-vue";
const app = createApp(App); // 挂载pinia

Object.keys(antIcons).forEach(key => {
	app.component(key, antIcons[key]);
});
app.use(Antd);
app.use(store); // 挂载实例
app.use(router);
app.mount("#app");
