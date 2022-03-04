import * as React from 'react'
import TodoList from './TodoList'
import Footer from './Footer'
import {useTodoContext} from './hooks'

function Main(){
  const {todoList, viewMode} = useTodoContext()
 
  let filteredTodoList = todoList 
  if(viewMode === 'Active')
  filteredTodoList = todoList.filter(item => !item.status)
  else if(viewMode === 'Completed')
  filteredTodoList = todoList.filter(item => item.status)

  const activeTodos = React.useCallback(() => todoList?.reduce((x, y) => x + (y.status ? 0 : 1), 0),[todoList])

  return (
    <main>
      <TodoList 
        filteredTodoList={filteredTodoList}
      />
      {todoList.length ?
        <Footer 
          activeTodos={activeTodos()}
        /> : null
      }
    </main>
  )
}

export default Main