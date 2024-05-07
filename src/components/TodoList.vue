<template>
  <main>
      <div v-for="(todo, idx) in data" :key="todo.id">
          <div class="input-group my-2 input-group-sm">
              <div class="input-group-text">
                  <input
                    type="checkbox"
                    class="form-check-input mt-0" 
                    :checked="todo.doneYn"
                    :disabled="todo.doneYn"
                    @click="completeTodo(todo.id)"
                    >
              </div>
              <div class="input-group-text">
                  <input
                    class="form-input mt-0"
                    type="date"
                    :min="today"
                    disabled
                    :value="formattedDeadline(todo.deadline)"
                  >
              </div>
              <input
                type="text"
                class="form-control"
                :value="todo.title"
              >
              <button class="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
              할 일 관리
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                  <li v-for="item in menu" :key="item.str">
                      <a class="dropdown-item" @click="item.func(todo.id)">
                        {{item.str}}
                      </a>
                  </li>
              </ul>
          </div>
          <div v-show="idx + 1 < data.length" class="col border border-second"/>
      </div>
  </main>
</template>

<script>
import { inject } from 'vue'
export default {

    // Props 로 들어온 데이터를 리스트 형식으로 렌더링하는 역할
    name: 'TodoList',
    props: {
        data: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: [], // 데이터가 들어오지 않을 경우 빈 배열,
        },
    },
    setup() {
        const removeTodo = inject('removeTodo');
        const completeTodo = inject('completeTodo');
        const today = inject('today');
        const menu = [
            {
                str: '할 일 삭제',
                func: removeTodo,
            },
            {
                str: '할 일 완료',
                func: completeTodo,
            },
        ]

      // 날짜 포맷 변환 함수
      const formattedDeadline = (deadline) => {
        const deadlineDate = new Date(deadline);
        const offset = deadlineDate.getTimezoneOffset(); // 현재 시간대의 오프셋을 가져옴 (분 단위)
        const deadlineDateUTC = new Date(deadlineDate.getTime() - offset * 60000); // UTC 시간으로 변환

        return deadlineDateUTC.toISOString().slice(0, 10); // "YYYY-MM-DD" 형식으로 반환
      }
        return {
            menu, today, completeTodo, formattedDeadline
        }
    }
}
</script>

<style>

</style>