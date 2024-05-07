import { inject } from 'vue'

export const useFilter = () => {
  const today = inject('today')

  //  날짜 순 내림차순 정렬
  const dateSort = (a, b) => {
    console.log('필터 : 날짜순으로 정렬')
    const a_date = Date.parse(a.date)
    const b_date = Date.parse(b.date)
    if (a_date > b_date) return 1
    else if (a_date < b_date) return 0
    else return a.id - b.id
  }

  // 날짜가 지났지만 완료 못한 작업
  const getPendingTodos = (todos) => {
    console.log('필터 : 오늘 해야 할 작업')
    return todos.value
      .filter((todo) => todo.deadline < today && !todo.doneYn)
      .slice()
      .sort(dateSort)
  }

  // 해야 할 작업
  const getActiveTodayTodos = (todos) => {
    console.log('필터 : 해야 할 작업')
    return todos.value
      .filter((todo) => todo.deadline == today && !todo.doneYn)
      .slice()
      .sort(dateSort)
  }

  // 완료한 작업
  const getCompletedTodayTodos = (todos) => {
    console.log('필터 : 완료한 작업')
    return todos.value
      .filter((todo) => todo.deadline == today && todo.doneYn)
      .slice()
      .sort(dateSort)
  }

  // 오늘의 모든 기록
  const getAllTodayTodos = (todos) => {
    console.log('필터 : 오늘의 모든 기록')
    return getActiveTodayTodos(todos).concat(getCompletedTodayTodos(todos)).slice().sort(dateSort)
  }

  // 모든 날을 아우르는 상태와 상관없는 작업
  const getAllTodos = (todos) => {
    console.log('필터 : 모든 작업')
    return todos.value.slice().sort(dateSort)
  }

  return {
    dateSort,
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos
  }
}
