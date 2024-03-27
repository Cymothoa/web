<template>
	<view class="register">
		<img src="@/static/image/head.png" alt="" class="head"/>
		<view class="inputGroup userName">
			<van-field :userName="userName" label="用户名" placeholder="请输入用户名" @change="getName" />
		</view>
		<view class="inputGroup password">
			<van-field :passWord="passWord" label="密码" placeholder="请输入密码" @change="getPassword" />
		</view>
		<button class="btn" @click="submit">注册</button>
	</view>
</template>

<script>
	import { toRegister } from "@/api/login.js";
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
			async submit() {
				const result = await toRegister({
					userName: this.userName,
					passWord: encrypto(this.passWord)
				});
				if(result){
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}
				// console.log(result,"打印result");
			}
		}
	}
</script>

<style>
	.head{
		width: 400rpx;
		height: 400rpx;
		margin: 50rpx auto;
		display: flex;
		justify-content: center;
	}
	
	.inputGroup{
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	
	.btn{
		display: flex;
		margin: 70rpx 50rpx;
		background-color: #ff0000;
		color: #fff;
		text-align: center;
		justify-content: center;
	}
	
	.gotoReg{
		display: flex;
		justify-content: center;
		color: blue;
	}
</style>