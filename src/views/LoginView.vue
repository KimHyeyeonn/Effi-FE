<template>
  <div class="container">
    <!-- 이미지 삽입 -->
    <a href="/">
      <p class="logo_txt" style="font-size: 36px; font-weight: bold; text-align: center;">Effi Planner</p>
    </a>
    <div class="login-container">
      <form class="login-form" @submit.prevent="login">
        <input type="text" v-model="email" placeholder="아이디 입력">
        <br>
        <input type="password" v-model="password" placeholder="비밀번호 입력">
        <br>
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const accessToken = ref('')
// const refreshToken = ref('')
const router = useRouter()

// 페이지가 로드될 때 마다 확인하는 함수
onMounted( () => {
  //로컬 스토리지에서 accessToken 존재하는지 확인
  accessToken.value = localStorage.getItem('accessToken');

  // accessToken이 존재할 경우 리다이렉트
  if (accessToken.value) {
    router.push({ name: 'todo' })
  }
})

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/signin", {
      email: email.value,
      password: password.value
    })
    console.log(response.data)
    accessToken.value = response.data.token
    // refreshToken.value = response.data.refreshToken

    localStorage.setItem('accessToken', accessToken.value)
    localStorage.setItem('email', email.value) // 이메일 저장
    localStorage.setItem('password', password.value) // 비밀번호 저장
    localStorage.setItem('userNickname', response.data.userNickname)
    // localStorage.setItem('refreshToken', refreshToken.value)

    router.push({ name: "todo" })

  } catch (error) {
    console.error(error)
    alert("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요");
    localStorage.removeItem('accesstoken');  // 로그인 실패 시 토큰 삭제
    localStorage.removeItem('email');  // 로그인 실패 시 이메일 삭제
    localStorage.removeItem('password');  // 로그인 실패 시 비밀번호 삭제
    this.isLoggedIn = false;  // 로그인 상태를 false로 설정
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 이미지 및 폼을 세로로 정렬하기 위해 추가 */
  height: 100vh; /* 화면 전체 높이 */
}

.login-container {
  text-align: center;
  width: 350px; /* 폼의 너비를 조정합니다. */
  padding: 20px;
  border-radius: 10px; /* 모서리 둥근 사각형 */
  background-color: #ffffff; /* 로그인 입력 부분의 배경색 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  margin-top: 20px; /* 이미지와 간격 조정 */
}
.login-container input {
  width: calc(100% - 16px);
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px; /* 입력란의 모서리 둥글게 */
  border: 1px solid #ccc;
}
.login-container button {
  width: 100%;
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-form {
  background-color: #ffffff; /* 로그인 입력 부분의 배경색 */
}

/* 로고 이미지 스타일 */
.logo {
  width: 250px; /* 로고 이미지의 너비를 조정합니다. */
  height: auto; /* 높이 자동 조정 */
}

/* 로고 텍스트 스타일 */
.logo_txt {
  color: black; /* 텍스트 색상 변경 */
  width: 200px; /* 로고 텍스트의 너비를 조정합니다. */
  height: auto; /* 높이 자동 조정 */
  font-size: 36px; /* 폰트 크기를 36px로 설정합니다. */
  font-weight: bold; /* 폰트를 굵게 설정합니다. */
  text-align: center; /* 가운데 정렬합니다. */
}
</style>
