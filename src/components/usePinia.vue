<template>
	<div>{{ userStore.name }}</div>
	<input type="text" v-model="name" />
	<input type="submit" value="提交" @click="updateName" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const name = ref("");
const updateName = () => {
	console.log(name.value);
	userStore.updateName(name.value);
};
</script>
