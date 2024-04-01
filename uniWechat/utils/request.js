import Vue from 'vue'
import axios from 'axios'
import { Promise } from "core-js"
import adapter from 'axios-miniprogram-adapter'
// import {Notify} from '../wxcomponents/dist/notify/notify'

axios.defaults.adapter = adapter;

const request = axios.create({
    baseURL: 'http://shop-api.edu.koobietech.com'
})

request.interceptors.request.use(
	config => {
		const token = uni.getStorageSync("token")
    if (token) {
        config.headers.Authorization = token;
    }
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

request.interceptors.response.use(response => {
	const data = response.data;
	if (data.code == "00000") {
		return data.data
	}

	if (data.code === "A00004") {
		// Notify('请登录后操作!')
		uni.navigateTo({
			url:"/pages/login/login"
		})
		return Promise.reject("当前页面需要登录!")
	}
	// Notify(data.msg)
	return Promise.reject(data.msg)
}, error => {

	return Promise.reject(error)
})

export default request
