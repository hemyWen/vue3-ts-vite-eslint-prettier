import layoutSettings from "@/config/layout";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
	const fixedHeader = ref<boolean>(layoutSettings.fixedHeader);
	const showSettings = ref<boolean>(layoutSettings.showSettings);
	const showTagsView = ref<boolean>(layoutSettings.showTagsView);
	const showSidebarLogo = ref<boolean>(layoutSettings.showSidebarLogo);
	const showNotify = ref<boolean>(layoutSettings.showNotify);
	const showThemeSwitch = ref<boolean>(layoutSettings.showThemeSwitch);
	const showScreenfull = ref<boolean>(layoutSettings.showScreenfull);

	return { fixedHeader, showSettings, showTagsView, showSidebarLogo, showNotify, showThemeSwitch, showScreenfull };
});
