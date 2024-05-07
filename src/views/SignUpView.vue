<template>
  <div class="container" style="background-color: #ffffff;">
    <!-- 이미지 삽입 -->
    <a href="/">
      <p class="logo_txt" style="color: black; font-size: 36px; font-weight: bold; text-align: center;">Effi Planner</p>
    </a>
    <div class="signup-container" style="background-color: #3B85CE;">
      <div style="display: flex; align-items: center;"> 
        <!-- 이메일 입력 -->
        <div style="width: calc(70% - 5px); margin-right: 5px">
          <label style="color: white;">이메일</label>
          <br>
          <input type="email" v-model="email" placeholder="이메일을 입력해주세요." style="color: #3B85CE; background-color: #ffffff; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
        </div>
        <!-- 중복 확인 버튼 -->
        <div style="width: calc(30% - 5px); margin-left: 5px"> 
          <button @click="checkDuplicateEmail" style="background-color: #013B7A; color: white; width: 100%; margin-bottom: 20px; padding: 8px; border-radius: 5px; border: none; cursor: pointer;">중복 확인</button>
        </div>
      </div>
      <!-- 인증번호 전송 버튼 -->
      <button :disabled="emailExists" @click="sendAuthEmail" style="background-color: #013B7A; color: white; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: none; cursor: pointer;">인증번호 전송</button>
      <br>
      <!-- 인증번호 입력 -->
      <input type="text" v-model="verificationCode" placeholder="인증번호를 입력하세요." style="color: #3B85CE; background-color: #ffffff; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      <!-- 인증번호 확인 버튼 -->
      <button @click="checkEmailVerification" style="background-color: #013B7A; color: white; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: none; cursor: pointer;">인증번호 확인</button>
      <br>
      <!-- 이름 입력 -->
      <p style="color: white;">이름</p>
      <input type="text" v-model="username" placeholder="이름을 입력해주세요." style="background-color: #ffffff; color: #3B85CE; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      <br>
      <!-- 비밀번호 입력 -->
      <p style="color: white;">비밀번호</p>
      <input type="password" v-model="password1" placeholder="비밀번호를 입력하세요." style="background-color: #ffffff; color: #3B85CE; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      <br>
      <input type="password" v-model="password2" placeholder="비밀번호를 다시 입력하세요." style="background-color: #ffffff; color: #3B85CE; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      <br>
      <button @click="checkPasswordMatch" style="background-color: #013B7A; color: white; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: none; cursor: pointer;">비밀번호 일치 확인하기</button>
      <br>
      <!-- 닉네임 입력 -->
      <p style="color: white;">닉네임</p>
      <input type="text" v-model="userNickname" placeholder="닉네임을 입력해주세요." style="background-color: #ffffff; color: #3B85CE; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc;">
      <br>
      <!-- 회원가입 버튼 -->
      <button @click="signUp" style="background-color: #013B7A; color: white; width: calc(100% - 16px); margin-bottom: 10px; padding: 8px; border-radius: 5px; border: none; cursor: pointer;">가입 완료</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      userNickname: '',
      username: '',
      password1: '',
      password2: '',
      verificationCode: '',
      emailExists: false // 이메일 존재 여부를 저장하는 변수
    }
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/signup", {
          email: this.email,
          userNickname: this.userNickname,
          username: this.username,
          password1: this.password1,
          password2: this.password2
        });
        // 회원가입 성공 시 로그인 페이지로 이동
        this.$router.push({
          name: "login",
        });
      } catch (error) {
        console.error(error);
      }
    },
    async checkPasswordMatch() {
      if (this.password1 === this.password2) {
        alert('비밀번호가 일치합니다.');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },
    async sendAuthEmail() {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/send", {
          email: this.email
        });
        // 이메일 인증이 성공했다는 메시지를 알립니다.
        alert('이메일로 인증번호가 전송되었습니다.');
      } catch (error) {
        console.error(error);
        alert('이메일 인증에 실패했습니다.');
      }
    },
    async checkDuplicateEmail() {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/emailcheck", {
          params: {
            email: this.email
          }
        });
        alert('이메일이 존재하지 않습니다.');
        this.emailExists = false; // 이메일이 존재하지 않음을 설정
      } catch (error) {
        console.error(error);
        alert('이메일이 존재합니다.');
        this.emailExists = true; // 이메일이 존재함을 설정
      }
    },
    async checkEmailVerification() {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/check", {
          email: this.email,
          authCode: this.verificationCode
        });
        alert('이메일 인증에 성공했습니다.');
      } catch (error) {
        console.error(error);
        alert('인증에 실패했습니다.');
      }
    }
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

.signup-container {
  text-align: center;
  width: 400px; /* 폼의 너비를 조정합니다. */
  padding: 20px;
  border-radius: 10px; /* 모서리 둥근 사각형 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  margin-top: 20px; /* 이미지와 간격 조정 */
}
.signup-container button {
  width: calc(100% - 16px);
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.signup-form{
  background-color: #ffffff;
}

/* 로고 텍스트 스타일 */
.logo_txt {
  width: 200px; /* 로고 텍스트의 너비를 조정합니다. */
  height: auto; /* 높이 자동 조정 */
  font-size: 36px; /* 폰트 크기를 36px로 설정합니다. */
  font-weight: bold; /* 폰트를 굵게 설정합니다. */
  text-align: center; /* 가운데 정렬합니다. */
}
</style>
