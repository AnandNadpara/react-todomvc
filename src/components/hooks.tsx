import * as React from 'react'

interface todo{
  id: number,
  item: string,
  status: boolean,
}
  
interface contextType{
  todoList: todo[],
  setTodoList: Function,
  viewMode: string,
  setViewMode: Function,
}

const defaultTodoList: todo[] = JSON.parse(window.localStorage.getItem('react-todo') || '[]')

const TodoContext = React.createContext({} as contextType)
TodoContext.displayName = 'TodoList Context'

function TodoProvider({children}: {children: React.ReactNode}){
  const [todoList, setTodoList] = React.useState(() => defaultTodoList)
  const [viewMode, setViewMode] = React.useState(() => 'idle')

  const value = React.useMemo(() => ({todoList, setTodoList, viewMode, setViewMode}), [todoList, viewMode])

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

function useTodoContext(){
  const {todoList, setTodoList, viewMode, setViewMode} = React.useContext(TodoContext)

  const addTodo = React.useCallback((newTodo) => {
    setTodoList((prevTodoList: todo[]) => {
      prevTodoList.push({
        id: new Date().valueOf(),
        item: newTodo,
        status: false,
      })
      return [...prevTodoList]
    })
  }, [setTodoList])

  const deleteTodo = React.useCallback((id) => {
    setTodoList((prevTodoList: todo[]) => {
      return prevTodoList.filter(item => item.id !== id)
    })
  }, [setTodoList])
  
  const toggleTodo = React.useCallback((id) => {
    setTodoList((pre: todo[]) => {
      return pre.map(item => {
        if(item.id !== id) return {...item}
        return {...item, status: !item.status}
      })
    })
  },[setTodoList])

  const toggleAll = React.useCallback(() => {
    setTodoList((prevTodoList: todo[]) => {
      let counter: number = prevTodoList.reduce((x, y) => x + (y.status ? 1 : 0), 0)
  
      let flag = true
      if(counter === prevTodoList.length) flag = false
      
      return prevTodoList.map(item => {
        return {...item, status: flag}
      })
    })
  } ,[setTodoList])

  const clearCompleted = React.useCallback(() => {
    setTodoList((prevTodoList: todo[]) => prevTodoList.filter(item => !item.status))
  },[setTodoList])

  return {
    todoList,
    viewMode,
    setViewMode,
    addTodo,
    deleteTodo,
    toggleTodo,
    toggleAll,
    clearCompleted,
  }
}

export { TodoProvider, useTodoContext }
export type { todo }