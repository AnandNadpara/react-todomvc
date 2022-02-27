import './App.css';
import React, {useState, useEffect} from 'react';
import Todo, {todo as todoInterface} from './components/Model';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const todoListFromLocalStorage: todoInterface[] = JSON.parse(localStorage.getItem('react-todo') || '[]');
const todo = new Todo(todoListFromLocalStorage);

function App() {
  const [todoList, setTodoList] = useState(()=>[...todo.todoList]);

  useEffect(()=>{
    localStorage.setItem('react-todo', JSON.stringify(todo.todoList));
  })

  const handletoggleAll = React.useCallback(() => {
    todo.toggleAll();
    setTodoList([...todo.todoList]);
  }, [])

  const handleSubmit = React.useCallback( (value: string) => {
    todo.addTodo(value);
    setTodoList([...todo.todoList]);
  }, [])

  const handleDelete = React.useCallback((todoId: number) =>{
    todo.deleteTodo(todoId)
    setTodoList([...todo.todoList]);
  }, []);

  const handleEditItem = React.useCallback((todoId: number, newValue: string) => {
    todo.editTodo(todoId, newValue);
    setTodoList([...todo.todoList]);
  }, [])

  const handleToggleItem = React.useCallback((todoId: number) => {
    todo.toggle(todoId);
    setTodoList([...todo.todoList]);
  }, [])

  const handleFilter = React.useCallback( (mode: string) => {
    setTodoList(mode === 'Active' ? [...todo.getActiveTodos()] :  mode === 'Completed' ? [...todo.getCompletedTodos()] : [...todo.todoList]);
  }, [])

  const handleClear = React.useCallback( () => {
    todo.clearCompleted();
    setTodoList([...todo.todoList]);
  }, [])

  return (
    <>
      <header className="header">
			  <h1>todos</h1>
      </header>
      <main>
      <TodoInput 
        handletoggleAll={handletoggleAll}
        handleSubmit={handleSubmit}
      />
      <TodoList
        toggleItem={handleToggleItem}
        todoList={todoList}
        deleteItem={handleDelete}
        handleEditItem={handleEditItem}
      />
      {todo.todoList.length ? 
        <Footer
          activeTodos={todo.activeTodos()}
          handleFilter={handleFilter}
          handleClear={handleClear}
        />
      : ''}
      </main>
    </>
  );
}

export default App;