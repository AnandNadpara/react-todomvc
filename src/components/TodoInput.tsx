import React, {useState} from 'react'
import {useTodoContext} from './hooks'

const TodoInput = React.memo(() => {
	const {addTodo, toggleAll} = useTodoContext()
	const [input, setInput] = useState('')
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.keyCode !== 13 || !input.trim()) return

    handleClick()	
    setInput('')
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>){
		const target = e.target as HTMLInputElement;
		setInput(target.value);
	}

	function handleClick(){
		if(!input.trim()) return

		addTodo(input.trim())
		setInput('');
	}

	return (
		<div className="inputSetting">
			<button className="toggleAll" onClick={() => toggleAll()}>v</button>
			<input 
				type="text"
				className="newTodoInput"
				placeholder='What needs to be done?'
				value={input}
				onChange={(e)=>handleChange(e)}
				onKeyDown={(e)=>handleKeyDown(e)}
			/>		
			<button className="addButton" onClick={handleClick}>+</button>
		</div>
	)
})

interface InputItemProps{
	text: string,
	setEditing: (editing: boolean)=>void,
	handleEditing: (newValue: string)=>void,
}

function InputItem(props: InputItemProps){
	const {text='', setEditing, handleEditing} = props;
	const [input, setInput] = useState(text)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>){
		const target = e.target as HTMLInputElement;
		setInput(target.value);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
		if(e.keyCode === 13 && input.trim()){
			handleEditing(input.trim());
			setEditing(false);
		}
	}

	function handleBlur(){
		handleEditing(input.trim());
		setEditing(false);
	}

	return (
		<>
			<input
				type="text"
				value={input}
				onChange={(e)=>handleChange(e)}
				onKeyDown={(e)=>handleKeyDown(e)}
				onBlur={handleBlur}
				autoFocus
			/>
		</>
	)
}

export default TodoInput;
export {InputItem}