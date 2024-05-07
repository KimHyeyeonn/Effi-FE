<template>
    <todo-list-new />
    <section class="container">
        <div class="row justify-content-center m-2">
            <todo-list-main />
        </div>
    </section>
</template>

<script>
import { ref, provide } from 'vue'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'
import axios from 'axios'


export default {
    name: 'TodoListContainer',

    components: {
        TodoListNew,
        TodoListMain
    },

    setup() {
        const todos = ref([]);

        // 할 일 목록 불러오기
        const loadTodos = async () => {
          try {
            const accessToken = localStorage.getItem('accessToken');
            console.log("accessToken:", accessToken);

            const response = await axios.get('http://localhost:8080/api/todo/all',{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            console.log(response.data);
            todos.value = response.data;
          } catch (error) {
                console.error('할 일 목록 불러오는 중 에러 발생:', error);
            }
        };

        // 할 일 추가 함수
        const addTodo = async (todo) => {
            try {

                const response = await axios.post('http://localhost:8080/api/todo/add', {
                    ...todo,
                    deadline: `${todo.deadline}T00:00:00`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deleteYn: false,
                    doneYn: false,
                    email: todo.email ,
                    categoryId: todo.categoryId // 선택한 카테고리 ID 전달
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  }
                    }
                );
                console.log(response.data)
                todos.value.push(response.data);
            } catch (error) {
                console.error('할 일 추가하던 중 에러 발생:', error);
            }
        };

      // 할 일 업데이트 함수
      const updatedTodo = async (id, updatedTodo) => {
        try {
          const response = await axios.post(`http://localhost:8080/api/todo/update/${id}`, {
            ...updatedTodo,
            updatedAt: new Date().toISOString(),
          },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          const index = todos.value.findIndex(todo => todo.id === id);
          if (index !== -1) {
            todos.value[index] = response.data;
          }
        } catch (error) {
          console.error('할 일 업데이트 중 에러 발생:', error);
        }
      }

      // 할 일 삭제 함수
      const removeTodo = async (id) => {
        try {
          await axios.post(
              `http://localhost:8080/api/todo/delete/${id}`,
              {
                      deleteYn: true },
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
              }
          );
          const index = todos.value.findIndex(todo => todo.id === id);
          if (index !== -1) {
            todos.value.splice(index, 1);
          }
        } catch (error) {
          console.error('할 일 삭제 중 에러 발생:', error);
        }
      };

      // 할 일 완료 함수
      const completeTodo = async (id) => {
        try {
          await axios.post(
              `http://localhost:8080/api/todo/done/${id}`,
              {doneYn: true},
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
              }
          );
          console.log('할 일이 성공적으로 완료로 표시되었습니다.');
          // 필요한 경우, 완료된 Todo를 UI에서 숨기거나 갱신할 수 있습니다.
          // 예: this.fetchTodoList(); // Todo 목록 다시 불러오기
        } catch (error) {
          console.error('할 일 완료 중 에러 발생:', error);
        }
      };


      provide('todos', todos);
        provide('addTodo', addTodo);
        provide('updatedTodo', updatedTodo);
        provide('removeTodo', removeTodo);
      provide('completeTodo', completeTodo);


      loadTodos();

        return {
            todos
        }
    }
}
</script>

<style></style>
