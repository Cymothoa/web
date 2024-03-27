<template>
	<view class="login">
		<img src="@/static/image/head.png" alt="" class="head" />
		<view class="inputGroup userName">
			<van-field :userName="userName" label="用户名" placeholder="请输入用户名" @change="getName" />
		</view>
		<view class="inputGroup password">
			<van-field :passWord="passWord" label="密码" placeholder="请输入密码" @change="getPassword" />
		</view>
		<button class="btn" @click="submit">登录</button>
		<view class="gotoReg" @click="gotoReg">没有账号去注册</view>
	</view>
</template>

<script>
	import { toLogin } from "@/api/login.js";
	import { encrypto } from "@/utils/cryptojs.js";
	export default {
		data() {
			return {
				userName: "",
				passWord: ""
			}
		},
		methods: {
			getName(event) {
				this.userName = event.detail;
			},
			getPassword(event) {
				this.passWord = event.detail;
			},
			gotoReg(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},
			async submit() {
				const result = await toLogin({
					userName: this.userName,
					passWord: encrypto(this.passWord)
				})
				if(result){
					uni.switchTab({
						url:"/pages/home/home"
					})
				}
				// console.log((result))
			}
		}
	}
</script>

<style>
	.head {
		width: 400rpx;
		height: 400rpx;
		margin: 50rpx auto;
		display: flex;
		justify-content: center;
	}

	.inputGroup {
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}

	.btn {
		display: flex;
		margin: 70rpx 50rpx;
		background-color: #ff0000;
		color: #fff;
		text-align: center;
		justify-content: center;
	}

	.gotoReg {
		display: flex;
		justify-content: center;
		color: blue;
	}
</style>