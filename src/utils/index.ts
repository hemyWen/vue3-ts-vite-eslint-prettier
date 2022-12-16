import dayjs from "dayjs";
export const formatDateTime = (time: string | number | Date) => {
	if (!time) {
		return "N/A";
	}
	const date = new Date(time);
	return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
export const getCssVariableValue = (cssVariableName: string) => {
	let cssVariableValue = "";
	try {
		cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName);
	} catch (error) {
		console.error(error);
	}
	return cssVariableValue;
};
