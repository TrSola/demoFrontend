<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
import router from "../router/index.js";
import { SwalHandle } from '../stores/sweetAlertStore';
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';

// 註冊驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 自定義手機號碼驗證規則
defineRule('mobileNumber', value => {
  if (!value) return true; // 允許空值
  const phoneRegex = /^09\d{8}$/;
  if (!phoneRegex.test(value)) {
    return '請輸入有效的手機號碼';
  }
  return true;
});

const modelStatus = ref(false)
const userInfo = ref({});
const editUserInfo = ref({
    id: '',
    idNumber: '',
    gender: '',
    name: '',
    birthday: '',
    mobileNumber: '',
    landlineNumber: '',
    permanentAddress: '',
    mailingAddress: '',
});

const validationSchema = {
    mobileNumber: { mobileNumber: true },
    permanentAddress: { required: true },
    mailingAddress: { required: true }
};

const getUserInfo = () => {
    axios.post('/api/userInfo/get').then((res) => {
        userInfo.value = res.data;
    }).catch(() => {
        SwalHandle.showErrorMsg('無法取得用戶資訊')
    })
}

const updateUserInfo = (values) => {
    axios.post('/api/userInfo/update', values).then(() => {
        SwalHandle.showSuccessMsg("修改成功");
        modelStatus.value = false
        getUserInfo()
    }).catch(() => {
        SwalHandle.showErrorMsg('無法取得用戶資訊')
    })
}

const openModel = () => {
    modelStatus.value = true;
    editUserInfo.value = JSON.parse(JSON.stringify(userInfo.value));
}

const closeModel = () => {
    modelStatus.value = false;
}

const logout = () => {
    axios.post('/api/auth/logout').then(() => {
        SwalHandle.showSuccessMsg("登出成功")
        router.push('/')
    }).catch(() => {
        SwalHandle.showErrorMsg("登出失敗")
    })
}

const deleteAccount = () => {
    axios.post('/api/auth/deleteAccount').then(() => {
        SwalHandle.showSuccessMsg("帳號刪除成功")
        router.push('/')
    }).catch(() => {
        SwalHandle.showErrorMsg("登出失敗")
    })
}

const confirmDeleteAccount = () => {
    SwalHandle.confirm('刪除帳號?', '確定要刪除此帳號?', '刪除帳號成功', deleteAccount)
}

onMounted(() => {
    getUserInfo();
})
</script>

<template>
    <div class="container justify-content-center align-items-center" style="height: 100vh;">
        <div>
            <h2>用戶資料表</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>身分證號</th>
                        <th>性別</th>
                        <th>姓名</th>
                        <th>生日</th>
                        <th>手機號碼</th>
                        <th>市話號碼</th>
                        <th>戶籍地址</th>
                        <th>通訊地址</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ userInfo.id }}</td>
                        <td>{{ userInfo.idNumber }}</td>
                        <td>{{ userInfo.gender === 'male' ? '男' : '女' }}</td>
                        <td>{{ userInfo.name }}</td>
                        <td>{{ userInfo.birthday }}</td>
                        <td>{{ userInfo.mobileNumber }}</td>
                        <td>{{ userInfo.landlineNumber }}</td>
                        <td>{{ userInfo.permanentAddress }}</td>
                        <td>{{ userInfo.mailingAddress }}</td>
                        <td class="btn btn-primary" @click="openModel()">編輯</td>
                    </tr>
                </tbody>
            </table>

            <div v-if="modelStatus">
                <Form :validation-schema="validationSchema" @submit="updateUserInfo" v-slot="{ errors }">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>身分證號</th>
                                <th>性別</th>
                                <th>姓名</th>
                                <th>生日</th>
                                <th>手機號碼</th>
                                <th>市話號碼</th>
                                <th>戶籍地址</th>
                                <th>通訊地址</th>
                                <th>編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" class="form-control" v-model="editUserInfo.id" readonly></td>
                                <td><input type="text" class="form-control" v-model="editUserInfo.idNumber" disabled></td>
                                <td>
                                    <select class="form-select" v-model="editUserInfo.gender" disabled>
                                        <option value="Male">男</option>
                                        <option value="Female">女</option>
                                    </select>
                                </td>
                                <td><input type="text" class="form-control" v-model="editUserInfo.name" disabled></td>
                                <td><input type="date" class="form-control" v-model="editUserInfo.birthday" disabled></td>
                                <td>
                                    <Field
                                        name="mobileNumber"
                                        type="tel"
                                        v-model="editUserInfo.mobileNumber"
                                        class="form-control"
                                        :class="{ 'is-invalid': errors.mobileNumber }"
                                    />
                                    <ErrorMessage name="mobileNumber" class="invalid-feedback" />
                                </td>
                                <td><input type="tel" class="form-control" v-model="editUserInfo.landlineNumber"></td>
                                <td>
                                    <Field
                                        name="permanentAddress"
                                        type="text"
                                        v-model="editUserInfo.permanentAddress"
                                        class="form-control"
                                        :class="{ 'is-invalid': errors.permanentAddress }"
                                    />
                                    <ErrorMessage name="permanentAddress" class="invalid-feedback" />
                                </td>
                                <td>
                                    <Field
                                        name="mailingAddress"
                                        type="text"
                                        v-model="editUserInfo.mailingAddress"
                                        class="form-control"
                                        :class="{ 'is-invalid': errors.mailingAddress }"
                                    />
                                    <ErrorMessage name="mailingAddress" class="invalid-feedback" />
                                </td>
                                <td>
                                    <button type="submit" class="btn btn-primary">儲存變更</button>
                                    <button type="button" class="btn btn-secondary" @click="closeModel">關閉</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
        </div>

        <button class="btn btn-secondary w-100 mt-5" @click="logout">登出</button>
        <button class="btn btn-secondary w-100 mt-5" @click="confirmDeleteAccount">刪除帳號</button>
    </div>
</template>

<style scoped>
.invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
}
</style>