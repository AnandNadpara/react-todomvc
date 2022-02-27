import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {InputItem} from './TodoInput';
// import {todo} from './Model'

interface todoItemTypes{
	id: number,
	todoItem: string,
	status: boolean,
	deleteItem: (todoId: number) => void,
	toggleItem: (todoId: number) => void,
	handleEditItem: (todoId: number, newValue: string) => void,
}

const TodoItem = (props: todoItemTypes) => {
	const [editing, setEditing] = useState(false);
	const itemRef = useRef(null);
	const {id, todoItem, status, deleteItem, toggleItem, handleEditItem} = props;

	function handleDbClick(flag: boolean){
		setEditing(flag);
	}

	function handleEditing(newValue: string){
		handleEditItem(id, newValue);
	}

	// useEffect(()=>{
	// 	if(itemRef.current){
	// 		(itemRef.current as HTMLElement).classList.add('show');
	// 	}
	// },[])

	return (
		<li className="todoItem" key={id} ref={itemRef}>
			<input 
				type="checkbox"
				checked={status}
				onChange={()=>toggleItem(id)}
			/>
			{ !editing &&
				(<>
					<label 
						className={status ? 'lineThrough' : ''}
						onClick={()=>toggleItem(id)}
						onDoubleClick={()=>handleDbClick(true)}
					>
						{todoItem}
					</label>
					<button onClick={()=>deleteItem(id)}>X</button>
				</>)
			}
			{ editing &&
				<InputItem
					text={todoItem}
					setEditing={setEditing}
					handleEditing={handleEditing}
				/>
			}
		</li>
	)
}

export default React.memo(TodoItem);