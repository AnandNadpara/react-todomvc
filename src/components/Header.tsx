import * as React from 'react'
import TodoInput from './TodoInput'

function Header(){
  return (
    <>
      <header className='header'>
        <h1> Todos </h1>  
        <TodoInput />
      </header>
    </>
  )
}

export default Header