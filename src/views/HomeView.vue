<script setup>

import axios from 'axios'
import { onMounted } from 'vue';
import { ref } from 'vue';

const userInfos = ref([])

const getAllUserInfo = () => {
    axios.post('/api/userInfo').then((res) => {
        userInfos.value = res.data
        console.log(userInfos.value[0]);
        
        
    }).catch((err) => {
        console.log(err);
        
    })
}

onMounted(() => {
    getAllUserInfo()
})

</script>

<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div>
            <h2 class="text-center">用戶資料表</h2>

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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userInfos" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.idNumber }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.birthday }}</td>
                        <td>{{ user.mobileNumber }}</td>
                        <td>{{ user.landlineNumber }}</td>
                        <td>{{ user.permanentAddress }}</td>
                        <td>{{ user.mailingAddress }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>



</style>