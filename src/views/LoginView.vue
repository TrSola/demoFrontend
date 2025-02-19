<script setup>

import axios from 'axios';
import { reactive } from 'vue';
import router from "../router/index.js";
import { SwalHandle } from '../stores/sweetAlertStore.js';

const userInfos = reactive({
    account: '',
    password: ''
})

const pushToRegisterPage = () => {
    router.push('/register')
}

const login = () => {
    axios.post('/api/auth/login', userInfos).then(() => {

        router.push("/userInfo")
        
        SwalHandle.showSuccessMsg("登入成功")


    }).catch(() => {
        
        SwalHandle.showErrorMsg("登入失敗")
    })
}



</script>

<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="login-container">
            <h2>登入</h2>
            <form @submit.prevent="login">
                <div class="form-group mb-3">
                    <label for="account">帳號</label>
                    <input type="account" id="account" v-model="userInfos.account" class="form-control" required />
                </div>
                <div class="form-group mb-3">
                    <label for="password">密碼</label>
                    <input type="password" id="password" v-model="userInfos.password" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">登入</button>
            </form>
            <div class="text-center mt-3">
                <button class="btn btn-secondary w-100" @click="pushToRegisterPage">註冊</button>
            </div>
        </div>
    </div>
</template>



<style></style>