<template>
    <section class="mb-5">
        <div class="container">
            <div class="row justify-content-center m-2">
                <div class="col border border-primary rounded">
                    <input type="text" id="todo_input" class="form-control my-2" v-model="job" placeholder="할 일을 적어주세요">
                    <div class="row my-2">
                        <div class="col-6">
                            <input type="date" v-model="date" :min="today" class="form-control">
                        </div>
                        <div class="col-4">
                            <select v-model="categoryId" class="form-select" aria-label="카테고리 선택">
                                <option disabled value="">카테고리 선택</option>
                                <option v-for="category in categories" :key="category.category_id" :value="category.category_id">{{ category.category_name }}</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-primary btn-sm rounded float-end" @click="onAddTodo">
                                추가하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'

export default {
    name: 'TodoListNew',
    setup() {
        const today = inject('today');
        const addTodo = inject('addTodo');

       const userEmail = localStorage.getItem('email'); // 로컬 스토리지에서 사용자의 이메일을 가져옴

        const state = reactive({
            job: '',
            date: today,
            today,
            email: userEmail,
            categoryId: '' 
        });

        const categories = [
            { category_id: 1, category_name: '업무' },
            { category_id: 2, category_name: '개인' },
            { category_id: 3, category_name: '긴급' },
            { category_id: 4, category_name: '기타' },
        ]; // 카테고리 목록을 가져와야 함

        const onAddTodo = async () => {
            if (state.job.trim().length === 0) {
                console.error('Error: 할 일을 입력해주세요');
                return;
            }

            const newTodo = {
                title: state.job,
                deadline: state.date,
                createdAt: new Date(),
                updatedAt: new Date(),
                deleteYn: false,
                doneYn: false,
                email: state.email,
                categoryId: state.categoryId,
            };

            try {
                await addTodo(newTodo);
                state.job = '';
                state.date = today;
            } catch (error) {
                console.error('Error adding new todo:', error);
            }
        };

        return {
            ...toRefs(state),
            categories,
            userEmail,
            onAddTodo,
        };
    },
};
</script>

<style></style>
