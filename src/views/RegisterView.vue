<script setup>
import { reactive } from "vue";
import router from "../router/index.js";
import axios from "axios";

import { SwalHandle } from "../stores/sweetAlertStore";

const user = reactive({
  account: "",
  password: "",
  confirmPassword: "",
  id: "",
  idNumber: "",
  gender: "male",
  name: "",
  birthday: "",
  mobileNumber: "",
  landlineNumber: "",
  permanentAddress: "",
  mailingAddress: "",
});

const resetForm = () => {
    user.account = "";
  user.password = "";
  user.confirmPassword = "";
  user.id = "";
  user.idNumber = "";
  user.gender = "";
  user.name = "";
  user.birthday = "";
  user.mobileNumber = "";
  user.landlineNumber = "";
  user.permanentAddress = "";
  user.mailingAddress = "";
}

const register = () => {
  console.log(user);

  axios
    .post("/api/auth/register", user)
    .then((res) => {
      if (res.data === "註冊成功") {
        SwalHandle.showSuccessMsg("註冊成功");
        //清空欄位
        resetForm()
        router.push("/");
      }
    })
    .catch((err) => {
        if (err.response.data === "Account already exists") {
            SwalHandle.showErrorMsg(`帳號已存在`);
        }else {

      SwalHandle.showErrorMsg(`註冊失敗`);
        }
        
    });
};

const pushToLoginPage = () => {
  router.push("/");
};
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="register-container">
      <h2>註冊</h2>
      <form @submit.prevent="register">
        <!-- 帳號密碼 -->
        <div class="d-flex">
          <div class="form-group mb-3">
            <label for="account">帳號</label>
            <input
              type="account"
              id="account"
              v-model="user.account"
              class="form-control"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="password">密碼</label>
            <input
              type="password"
              id="password"
              v-model="user.password"
              class="form-control"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="password">確認密碼</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="user.confirmPassword"
              class="form-control"
              required
            />
          </div>
        </div>
        <!-- 個人資料 -->
        <div class="form-group mb-3">
          <label for="identity">身分證號</label>
          <input
            type="text"
            id="identity"
            v-model="user.idNumber"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="gender">性別</label>
          <select
            id="gender"
            v-model="user.gender"
            class="form-control"
            required
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="name">姓名</label>
          <input
            type="text"
            id="name"
            v-model="user.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="birthdate">生日</label>
          <input
            type="date"
            id="birthdate"
            v-model="user.birthday"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="mobile">手機號碼</label>
          <input
            type="tel"
            id="mobile"
            v-model="user.mobileNumber"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="phone">市話號碼</label>
          <input
            type="tel"
            id="phone"
            v-model="user.landlineNumber"
            class="form-control"
          />
        </div>
        <div class="form-group mb-3">
          <label for="residence">戶籍地址</label>
          <input
            type="text"
            id="residence"
            v-model="user.permanentAddress"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="address">通訊地址</label>
          <input
            type="text"
            id="address"
            v-model="user.mailingAddress"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-3">註冊</button>
        <button class="btn btn-secondary w-100" @click="pushToLoginPage">
          回登入頁
        </button>
      </form>
    </div>
  </div>
</template>
<style></style>
