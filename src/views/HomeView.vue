<template>
  <div class="cotn_principal">
    <div class="cont_centrar">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <!-- 로고와 버튼 -->
          <div class="logo_container">
            <h1 class="logo_txt">Effi Planner</h1>
            <!-- 로그인과 회원가입 버튼을 한 줄에 배치 -->
            <div class="button-container">
              <!-- 로그인 버튼 -->
              <button class="btn_login" @click="goToLogin">로그인</button>
              <!-- 회원가입 버튼 -->
              <button class="btn_sign_up" @click="goToSignUp">회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push({ name: 'login' });
};

const goToSignUp = () => {
  router.push({ name: 'signup' });
};
</script>

<style scoped>
/* 나머지 스타일은 여기에 복사해주세요 */
.cotn_principal {
  width: 100%;
  height: 100vh;
  background-color: #2980b9; /* 배경색 파란색 계열로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cont_centrar {
  width: 90%;
  max-width: 400px;
  background: #fff; /* 내부 컨테이너 배경색 흰색으로 설정 */
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.logo_container {
  text-align: center; /* 로고 텍스트 가운데 정렬 */
}

.logo_txt {
  color: black;
  font-size: 36px;
  font-weight: bold; /* 굵은 글꼴로 설정 */
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn_login,
.btn_sign_up {
  background-color: #3B85CE; 
  border: none;
  padding: 12px 30px;
  width: 200px;
  border-radius: 30px;
  box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn_sign_up {
  background-color: #013B7A; /* 회원가입 버튼 배경색 변경 */
  margin-left: 20px;
}

.btn_login:hover,
.btn_sign_up:hover {
  transform: translateY(-3px);
  box-shadow: 1px 8px 25px -5px rgba(0, 0, 0, 0.4);
}
</style>
