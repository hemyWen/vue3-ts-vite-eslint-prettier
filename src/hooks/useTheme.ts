import { getActiveThemeName, setActiveThemeName } from "@/utils/cache/localStorage";
import { ref } from "vue";

interface IThemeList {
	title: string;
	name: ThemeName;
}
export type ThemeName = "normal" | "dark" | "dark-blue";
const themeList: IThemeList[] = [
	{ title: "默认", name: "normal" },
	{ title: "黑暗", name: "dark" },
	{ title: "深蓝", name: "dark-blue" }
];

const activeThemeName = ref<ThemeName>(getActiveThemeName() || "normal");

const initTheme = () => {
	setHtmlClassName(activeThemeName.value);
};
const setTheme = (value: ThemeName) => {
	activeThemeName.value = value;
	setActiveThemeName(value);
	setHtmlClassName(value);
};

const setHtmlClassName = (value: ThemeName) => {
	document.documentElement.className = value;
};

export function useTheme() {
	return { themeList, activeThemeName, initTheme, setTheme };
}
