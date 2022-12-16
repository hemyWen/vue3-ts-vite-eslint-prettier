import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/localStorage";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export enum DeviceType {
	Mobile,
	Desktop
}
interface ISidebar {
	opened: boolean;
	withoutAnimation: boolean;
}
export const useAppStore = defineStore("app", () => {
	const sidebar: ISidebar = reactive({
		opened: getSidebarStatus() !== "closed",
		withoutAnimation: false
	});
	const device = ref<DeviceType>(DeviceType.Desktop);

	const toggleSidebar = (withoutAnimation: boolean) => {
		sidebar.opened = !sidebar.opened;
		sidebar.withoutAnimation = withoutAnimation;
		sidebar.opened ? setSidebarStatus("opened") : setSidebarStatus("closed");
	};
	const closeSidebar = (withoutAnimation: boolean) => {
		sidebar.opened = false;
		sidebar.withoutAnimation = withoutAnimation;
		setSidebarStatus("closed");
	};
	const toggleDevice = (value: DeviceType) => {
		device.value = value;
	};
	return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice };
});
