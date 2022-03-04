import React from 'react';
import {todo} from './hooks';
import TodoItem from './TodoItem';

interface todoListTypes{
	filteredTodoList: todo[],
}

const TodoList = (props: todoListTypes) => {
	const {filteredTodoList} = props;

	return (		
		<div className="todoList">
			{filteredTodoList.map(item =>
				<TodoItem 
					key={item.id}
					id={item.id}
					todoItem={item.item}
					status={item.status}
				/>
			)}
		</div>
	)
}

export default React.memo(TodoList);