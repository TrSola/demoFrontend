<script setup>
import { reactive } from "vue";
import router from "../router/index.js";
import axios from "axios";
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min, max, confirmed } from '@vee-validate/rules';
import { SwalHandle } from "../stores/sweetAlertStore";

// 註冊驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('confirmed', confirmed);

// 自定義身分證字號驗證規則
defineRule('taiwanId', value => {
  const idRegex = /^[A-Z][12]\d{8}$/;
  if (!idRegex.test(value)) {
    return '請輸入有效的身分證字號';
  }
  return true;
});

// 自定義手機號碼驗證規則
defineRule('mobileNumber', value => {
  const phoneRegex = /^09\d{8}$/;
  if (!phoneRegex.test(value)) {
    return '請輸入有效的手機號碼';
  }
  return true;
});

const user = reactive({
  account: "",
  password: "",
  confirmPassword: "",
  idNumber: "",
  gender: "male",
  name: "",
  birthday: "",
  mobileNumber: "",
  landlineNumber: "",
  permanentAddress: "",
  mailingAddress: "",
});

const validationSchema = {
  account: { required: true, email: true },
  password: { required: true, min: 8 },
  confirmPassword: { required: true, confirmed: '@password' },
  idNumber: { required: true, taiwanId: true },
  name: { required: true, min: 2 },
  birthday: { required: true },
  mobileNumber: { required: true, mobileNumber: true },
  permanentAddress: { required: true },
  mailingAddress: { required: true }
};

const register = async (values, { resetForm }) => {
  try {
    const response = await axios.post("/api/auth/register", values);
    if (response.data === "註冊成功") {
      SwalHandle.showSuccessMsg("註冊成功");
      resetForm();
      router.push("/");
    }
  } catch (err) {
    if (err.response?.data === "帳戶已存在") {
      SwalHandle.showErrorMsg("帳戶已存在");
    } else {
      SwalHandle.showErrorMsg("註冊失敗");
    }
  }
};

const pushToLoginPage = () => {
  router.push("/");
};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="register-container">
      <h2>註冊</h2>
      <Form :validation-schema="validationSchema" @submit="register" v-slot="{ errors }">
        <!-- 帳號密碼 -->
        <div class="d-flex">
          <div class="form-group mb-3">
            <label for="account">帳號 (Email)</label>
            <Field 
              name="account"
              type="email"
              id="account"
              v-model="user.account"
              class="form-control"
              :class="{ 'is-invalid': errors.account }"
            />
            <ErrorMessage name="account" class="invalid-feedback" />
          </div>

          <div class="form-group mb-3">
            <label for="password">密碼</label>
            <Field
              name="password"
              type="password"
              id="password"
              v-model="user.password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
            />
            <ErrorMessage name="password" class="invalid-feedback" />
          </div>

          <div class="form-group mb-3">
            <label for="confirmPassword">確認密碼</label>
            <Field
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              v-model="user.confirmPassword"
              class="form-control"
              :class="{ 'is-invalid': errors.confirmPassword }"
            />
            <ErrorMessage name="confirmPassword" class="invalid-feedback" />
          </div>
        </div>

        <!-- 個人資料 -->
        <div class="form-group mb-3">
          <label for="idNumber">身分證號</label>
          <Field
            name="idNumber"
            type="text"
            id="idNumber"
            v-model="user.idNumber"
            class="form-control"
            :class="{ 'is-invalid': errors.idNumber }"
          />
          <ErrorMessage name="idNumber" class="invalid-feedback" />
        </div>

        <div class="form-group mb-3">
          <label for="gender">性別</label>
          <Field
            name="gender"
            as="select"
            id="gender"
            v-model="user.gender"
            class="form-control"
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </Field>
        </div>

        <div class="form-group mb-3">
          <label for="name">姓名</label>
          <Field
            name="name"
            type="text"
            id="name"
            v-model="user.name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <ErrorMessage name="name" class="invalid-feedback" />
        </div>

        <div class="form-group mb-3">
          <label for="birthday">生日</label>
          <Field
            name="birthday"
            type="date"
            id="birthday"
            v-model="user.birthday"
            class="form-control"
            :class="{ 'is-invalid': errors.birthday }"
          />
          <ErrorMessage name="birthday" class="invalid-feedback" />
        </div>

        <div class="form-group mb-3">
          <label for="mobileNumber">手機號碼</label>
          <Field
            name="mobileNumber"
            type="tel"
            id="mobileNumber"
            v-model="user.mobileNumber"
            class="form-control"
            :class="{ 'is-invalid': errors.mobileNumber }"
          />
          <ErrorMessage name="mobileNumber" class="invalid-feedback" />
        </div>

        <div class="form-group mb-3">
          <label for="landlineNumber">市話號碼</label>
          <Field
            name="landlineNumber"
            type="tel"
            id="landlineNumber"
            v-model="user.landlineNumber"
            class="form-control"
          />
        </div>

        <div class="form-group mb-3">
          <label for="permanentAddress">戶籍地址</label>
          <Field
            name="permanentAddress"
            type="text"
            id="permanentAddress"
            v-model="user.permanentAddress"
            class="form-control"
            :class="{ 'is-invalid': errors.permanentAddress }"
          />
          <ErrorMessage name="permanentAddress" class="invalid-feedback" />
        </div>

        <div class="form-group mb-3">
          <label for="mailingAddress">通訊地址</label>
          <Field
            name="mailingAddress"
            type="text"
            id="mailingAddress"
            v-model="user.mailingAddress"
            class="form-control"
            :class="{ 'is-invalid': errors.mailingAddress }"
          />
          <ErrorMessage name="mailingAddress" class="invalid-feedback" />
        </div>

        <button type="submit" class="btn btn-primary w-100 mb-3">註冊</button>
        <button type="button" class="btn btn-secondary w-100" @click="pushToLoginPage">
          回登入頁
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
</style>