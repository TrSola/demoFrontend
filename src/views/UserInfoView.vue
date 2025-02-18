<script setup>

import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
import router from "../router/index.js";
import { SwalHandle } from '../stores/sweetAlertStore';

const modelStatus = ref(false)
const userInfo = ref({});
const newUser = ref({
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
})

const getUserInfo = () => {
    axios.post('/api/userInfo/get').then((res) => {

        userInfo.value = res.data;

    }).catch(() => {


        SwalHandle.showErrorMsg('無法取得用戶資訊')

    })
}

const updateUserInfo = (editUserInfo) => {

    axios.post('/api/userInfo/update', editUserInfo).then((res) => {
        
        SwalHandle.showSuccessMsg("修改成功");
        getUserInfo()

    }).catch((err) => {

        console.log(err);

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
    }).catch((err) => {
        console.log(err);
        
        SwalHandle.showErrorMsg("登出失敗")
    })
}

onMounted(() => {
    getUserInfo();
})

</script>

<template>
    <div class="container justify-content-center align-items-center" style="height: 100vh;">
        <div v-if="0">

            <h2 class="text-center mt-5">新增用戶資料</h2>

            <table class="mb-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>身分證字號</th>
                        <th>性別</th>
                        <th>姓名</th>
                        <th>生日</th>
                        <th>手機號碼</th>
                        <th>市話號碼</th>
                        <th>戶籍地址</th>
                        <th>通訊地址</th>

                    </tr>
                </thead>

                <tr>
                    <button class="btn btn-secondary" disabled>系統自行帶入</button>
                    <td><input v-model="newUser.idNumber" type="text" class="form-control" placeholder="身分證字號" />
                    </td>
                    <td>
                        <select v-model="newUser.gender" class="form-control">
                            <option value="Male">男</option>
                            <option value="Female">女</option>
                        </select>
                    </td>
                    <td><input v-model="newUser.name" type="text" class="form-control" placeholder="姓名" /></td>
                    <td><input v-model="newUser.birthday" type="date" class="form-control" /></td>
                    <td><input v-model="newUser.mobileNumber" type="text" class="form-control" placeholder="手機號碼" />
                    </td>
                    <td><input v-model="newUser.landlineNumber" type="text" class="form-control" placeholder="市話號碼" />
                    </td>
                    <td><input v-model="newUser.permanentAddress" type="text" class="form-control" placeholder="戶籍地址" />
                    </td>
                    <td><input v-model="newUser.mailingAddress" type="text" class="form-control" placeholder="通訊地址" />
                    </td>

                    <button class="btn btn-secondary" @click="addNewUser()">新增用戶</button>
                </tr>


            </table>
        </div>

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
                        <td>{{ userInfo.gender }}</td>
                        <td>{{ userInfo.name }}</td>
                        <td>{{ userInfo.birthday }}</td>
                        <td>{{ userInfo.mobileNumber }}</td>
                        <td>{{ userInfo.landlineNumber }}</td>
                        <td>{{ userInfo.permanentAddress }}</td>
                        <td>{{ userInfo.mailingAddress }}</td>
                        <button class="btn btn-primary" @click="openModel()">編輯</button>
                    </tr>


                </tbody>
            </table>

            <div v-if="modelStatus">
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
                            <td><input type="text" class="form-control" v-model="userInfo.id" readonly></td>
                            <td><input type="text" class="form-control" v-model="editUserInfo.idNumber"></td>
                            <td>
                                <select class="form-select" v-model="editUserInfo.gender">
                                    <option value="Male">男</option>
                                    <option value="Female">女</option>
                                </select>
                            </td>
                            <td><input type="text" class="form-control" v-model="editUserInfo.name"></td>
                            <td><input type="date" class="form-control" v-model="editUserInfo.birthday"></td>
                            <td><input type="tel" class="form-control" v-model="editUserInfo.mobileNumber"></td>
                            <td><input type="tel" class="form-control" v-model="editUserInfo.landlineNumber"></td>
                            <td><input type="text" class="form-control" v-model="editUserInfo.permanentAddress"></td>
                            <td><input type="text" class="form-control" v-model="editUserInfo.mailingAddress"></td>
                            <button class="btn btn-primary" @click="updateUserInfo(editUserInfo)">儲存變更</button>
                            <button class="btn btn-primary" @click="closeModel">關閉</button>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <button class="btn btn-secondary w-100 mt-5" @click="logout">登出</button>

    </div>
</template>

<style scoped></style>