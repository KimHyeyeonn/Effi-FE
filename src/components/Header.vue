<template>
  <header>
    <div class="logo-container">
      <router-link :to="{ name: 'todo'}" class="logo_txt">Effi Planner</router-link>
      <div class="underline"></div>
    </div>
    <div class="user-info">
      <router-link :to="{ name: 'mypage' }">{{ userNickname }} 님</router-link>
      <button @click="logout">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userNickname = ref(localStorage.getItem('userNickname'));
const router = useRouter();

// 로그아웃 함수
const logout = () => {
  // 로그아웃 처리 로직
  // 예를 들어, 로컬 스토리지에서 토큰 삭제 등
  localStorage.removeItem('accessToken');
  localStorage.removeItem('email');
  localStorage.removeItem('password');  
  localStorage.removeItem('userNickname');
  // 홈 화면으로 이동
  router.push({ name: 'home' });
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo_txt {
  color: black;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}

.underline {
  width: 100px; /* 파란색 밑줄의 너비 */
  height: 3px; /* 파란색 밑줄의 높이 */
  background-color: #007bff; /* 파란색 밑줄의 색상 */
  margin-left: 10px; /* 로고 텍스트와의 간격 조절 */
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info p {
  margin-right: 10px; /* 닉네임과 로그아웃 버튼 사이의 간격 조절 */
}

button {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
}

/* 사용자 닉네임 링크 스타일 */
router-link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
</style>
