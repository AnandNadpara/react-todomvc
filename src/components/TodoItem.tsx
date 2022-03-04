import React from 'react';
import {useTodoContext} from './hooks'

interface todoItemTypes{
	id: number,
	todoItem: string,
	status: boolean,
}

const TodoItem = (props: todoItemTypes) => {
	const {id, todoItem, status} = props;
	const {deleteTodo, toggleTodo} = useTodoContext()

	return (
		<li className="todoItem" key={id}>
			<input 
				type="checkbox"
				checked={status}
				onChange={()=>toggleTodo(id)}
			/>
			<label 
				className={status ? 'lineThrough' : ''}
				onClick={()=>toggleTodo(id)}
			>
				{todoItem}
			</label>
			<button onClick={()=>deleteTodo(id)}>X</button>
		</li>
	)
}

export default React.memo(TodoItem);