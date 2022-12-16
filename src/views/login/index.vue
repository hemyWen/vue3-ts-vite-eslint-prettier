<template>
	<div class="login-container">
		<div class="login-card">
			<div class="title">
				<img src="@/assets/layout/hemy.png" />
				Admin
				<!-- <a-avatar src="@/assets/layout/hemy.png" /> -->
			</div>
			<div class="content">
				<a-form ref="modalFormRef" :rules="loginFormRules" :model="formState">
					<a-form-item name="username">
						<a-input v-model:value="formState.username">
							<template #prefix>
								<UserOutlined class="site-form-item-icon" />
							</template>
						</a-input>
					</a-form-item>

					<a-form-item name="password">
						<a-input-password v-model:value="formState.password">
							<template #prefix>
								<LockOutlined class="site-form-item-icon" />
							</template>
						</a-input-password>
					</a-form-item>

					<a-button type="primary" :loading="loading" block @click="handleLogin">登录</a-button>
				</a-form>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LoginFormInstance } from "@/types";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { type FormInstance } from "ant-design-vue";
import { Rule } from "ant-design-vue/lib/form/interface";
import { useUserStore } from "@/store/modules/user";
import router from "@/router";

const loading = ref(false);

const formState: LoginFormInstance = reactive({
	username: "admin",
	password: "12345678"
});
/** 登录表单校验规则 */
const loginFormRules: Record<string, Rule[]> = {
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
	]
};

const modalFormRef = ref<FormInstance | null>(null);
const handleLogin = () => {
	modalFormRef.value?.validate().then(() => {
		loading.value = true;
		useUserStore()
			.login(formState)
			.then(() => {
				router.push("/");
			})
			.catch(() => {
				formState.password = "";
			})
			.finally(() => {
				loading.value = false;
			});
	});
};
</script>
<style lang="less" scoped>
.login-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100%;
	.theme-switch {
		position: fixed;
		top: 5%;
		right: 5%;
		cursor: pointer;
	}
	.login-card {
		width: 480px;
		overflow: hidden;
		background-color: #ffffff;
		border-radius: 20px;
		box-shadow: 0 0 10px #dcdfe6;
		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150px;
			font-size: 50px;
			font-weight: 700;
			img {
				height: 100%;
			}
		}
		.content {
			padding: 20px 50px 50px;
			:deep(.el-input-group__append) {
				padding: 0;
				overflow: hidden;
				.el-image {
					width: 100px;
					height: 40px;
					text-align: center;
					cursor: pointer;
					user-select: none;
					border-left: 0;
				}
			}
			.el-button {
				width: 100%;
				margin-top: 10px;
			}
		}
	}
}
</style>
