<template>
  <div>
    <input
      class="form-control"
      type="text"
      v-model="search"
      placeholder="검색"
    />
    <hr>
  </div>

  <div>
    <todo-list-menu v-on:change-filter="onChangeFilter" class="p-0"/>
    <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
      <div v-if="use_category">
        <em>{{key}}</em>
      </div>
      <todo-list :data="filtered_todos[key]" />
    </div>
    
    <div class="my-2 mt-5">
      <hr style="border:solid">
      <span style="background-color: red">&nbsp;</span>&nbsp;
      <strong>미 완료 작업</strong>
    </div>
    <todo-list :data="pending_todos"/>
  </div>
</template>

<script>
import { ref, provide, inject, watch, computed } from 'vue'
import { useFilter } from '../compositions/filters'

import TodoList from './TodoList.vue'
import TodoListMenu from './TodoListMenu.vue'

export default {
  name: 'TodoListMain',
  setup() {
    const { 
      getPendingTodos,
      getActiveTodayTodos,
      getCompletedTodayTodos,
      getAllTodayTodos,
      getAllTodos,
    } = useFilter()

    const filter = ref(0);
    const filtered_todos = ref([]);
    const pending_todos = ref([]);
    const use_category = ref(false);
    const todos = inject('todos');
    const search = ref("");

    const filters = {
      0: {
        str: '해야 할 작업들',
        func: getActiveTodayTodos,
        category: false,
      },
      1: {
        str: '완료한 작업들',
        func: getCompletedTodayTodos,
        category: false,
      },
      2: {
        str: '오늘의 모든 기록',
        func: getAllTodayTodos,
        category: false,
      },
      3: {
        str: '모든 작업',
        func: getAllTodos,
        category: false,
      },
    }
    
    provide('filters', filters)

    const groupBy = (todos) => {
      return todos.reduce((acc, cur) => {
        acc[cur['date']] = acc[cur['date']] || []
        acc[cur['date']].push(cur);
        return acc;
      }, {})
    }

    const onChangeFilter = (filter_idx) => {
      filter.value = Number(filter_idx)
    }

    watch(
      [() => filter.value, todos.value],
      ([new_filter, new_todos], [old_filter, old_todos]) => {
        pending_todos.value = getPendingTodos(todos);
        if(typeof new_filter != 'undefined') {
          let temp_todos = filters[new_filter].func(todos)
          filtered_todos.value = groupBy(temp_todos);
          use_category.value = filters[new_filter].category
        }
      },
      { immediate: true }
    )

    const filterTodolist = computed(() => {
      if (search.value) {
        return todos.value.filter((tmp) => {
          return tmp.sbj.includes(search.value);
        });
      } else {
        return todos.value;
      }
    });

    return {
      filter, 
      pending_todos, 
      filtered_todos, 
      use_category, 
      onChangeFilter,
      filterTodolist,
      search,
    }
  },

  components: { 
    TodoListMenu, TodoList
  },
}
</script>

<style>
</style>
