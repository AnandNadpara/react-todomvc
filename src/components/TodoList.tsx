import {todo} from './Model';
import React from 'react';
import TodoItem from './TodoItem';

interface todoListTypes{
	todoList: todo[],
	deleteItem: (todoId: number) => void,
	toggleItem: (todoId: number) => void,
	handleEditItem: (todoId: number, newValue: string) => void,
}

const TodoList = (props: todoListTypes) => {
	const {todoList, deleteItem, toggleItem, handleEditItem} = props;
	return (		
		<div className="todoList">
			{todoList.map(item =>
				<TodoItem 
					key={item.id}
					id={item.id}
					toggleItem={toggleItem}
					todoItem={item.item}
					status={item.status}
					deleteItem={deleteItem}
					handleEditItem={handleEditItem}
				/>
			)}
		</div>
	)
}

export default React.memo(TodoList);