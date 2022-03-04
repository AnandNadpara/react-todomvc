import {useTodoContext, todo} from './components/hooks'

function addTodo(todoList: todo[], todoItem: string){
  todoList.push({
    id: new Date().valueOf(),
    item: todoItem,
    status: false,
  })
  return [...todoList]
}

function deleteTodo(todoList: todo[], todoId: number){
  return todoList.filter(item => item.id !== todoId)
}

function toggleTodo(todoList: todo[], todoId: number){
  return todoList.map(item => {
    if(item.id === todoId) item.status = !item.status

    return item
  })
}

function toggleAll(todoList: todo[]){
	let counter: number = todoList.reduce((x, y) => x + (y.status ? 1 : 0), 0)

  let flag = true
  if(counter === todoList.length) flag = false

  todoList.forEach(item => {
    item.status = flag
  })
  return [...todoList]
}

function editTodo(todoList: todo[], newValue: string, todoId: number){
  return todoList.map(item => {
    if(item.id === todoId) item.item = newValue

    return item
  })
}

function clearCompleted(todoList: todo[]){
  return todoList.filter(item => !item.status)
}

function activeTodos(todoList: todo[]){
  return todoList.reduce((x, y) => x + (y.status ? 0 : 1), 0)
}

export {addTodo, deleteTodo, toggleTodo, toggleAll, editTodo, clearCompleted, activeTodos}