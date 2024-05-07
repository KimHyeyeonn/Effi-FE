<template>
  <div>
    <Header />
    <div class="user-info-container">
      <br>
      <div class="user-info">
        <h2>사용자 정보</h2>
        <div class="info-item">
          <label>아이디:</label>
          <p>{{ userInfo.email }}</p>
        </div>
        <div class="info-item">
          <label>이름:</label>
          <p>{{ userInfo.userName }}</p>
        </div>
        <div class="info-item">
          <label>닉네임:</label>
          <p>{{ userInfo.userNickname }}</p>
        </div>
        <!-- <button class="reset-password-btn" @click="showPwdResetModal = true">비밀번호 재설정</button> -->
        <button class="delete-account-btn" @click="showDeleteModal = true">회원 탈퇴</button>

        <!-- 회원 탈퇴 모달 -->
        <div v-if="showDeleteModal" class="modal">
          <div class="modal-content">
            <h2>회원 탈퇴</h2>
            <h6>확인을 위해 비밀번호를 다시 한 번 입력해주세요</h6>
            <br />
            <input v-model="password" type="password" placeholder="비밀번호">
            <div class="button-container">
              <button class="cancel-btn" @click="cancelDeletion">취소</button>
              <button class="delete-btn" @click="deleteAccount">회원 탈퇴</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
  export default {
    name: 'UserInfo',
    components: {
      Header
    },
  setup() {
    const router = useRouter();
    const showDeleteModal = ref(false);
    const password = ref('');
    const userInfo = reactive({
      email: '',
      userName: '',
      userNickname: ''
    });

    const deleteAccount = async () => {
      try {
        const response = await axios.delete('http://localhost:8080/api/auth/signout', {
          data: {
            email: localStorage.getItem('email'),
            password: password.value,
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (response.status === 200) {
          console.log('회원 탈퇴 성공:', response.data);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          alert('회원 탈퇴가 완료되었습니다.');
          router.push({ name: 'home' });
        } else {
          console.log('회원 탈퇴 실패', response.data);
          alert('회원 탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원 탈퇴 오류:', error);
      }
      showDeleteModal.value = false;
    };

    const cancelDeletion = () => {
      showDeleteModal.value = false;
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/userinfo', {
          params: {
            email: localStorage.getItem('email') // 현재 사용자의 이메일
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (response.status === 200) {
          userInfo.email = response.data.email;
          userInfo.userName = response.data.userName;
          userInfo.userNickname = response.data.userNickname;
        } else {
          console.error('사용자 정보 불러오기 실패:', response);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    onMounted(() => {
      fetchUserInfo();
    });

    return { showDeleteModal, password, userInfo, deleteAccount, cancelDeletion };
  }
}
</script>


<style scoped>
.user-info {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-password-btn {
  background-color: #013B7A;
  color: #fff;
}

.delete-account-btn {
  background-color: #3B85CE;
  color: #fff;
}

.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  max-width: 50%;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.cancel-btn,
.delete-btn {
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #3B85CE;
  color: #fff;
}

.delete-btn {
  background-color: #013B7A;
  color: #fff;
}

.cancel-btn:hover,
.delete-btn:hover {
  opacity: 0.8;
}
</style>
