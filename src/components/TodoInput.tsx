import React, {useState, useRef} from 'react';

interface TodoInputTypes{
	handleSubmit?: (value: string)=>void,
	setEditing?: (editing: boolean)=>void
}

const TodoInput = React.memo((props: TodoInputTypes)=>{
	const {handleSubmit} = props;
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);


	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.keyCode === 13 && input.trim()){	
			handleSubmit?.(input.trim())
			setInput('');	
    }
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>){
		const target = e.target as HTMLInputElement;
		setInput(target.value);
	}

	function handleClick(){
		if(inputRef.current?.value.trim())
		handleSubmit?.(inputRef.current.value.trim());
		setInput('');
	}

	return (
		<div className="inputSetting">
			<button className="toggleAll" onClick={handleClick}>V</button>
			<input 
				type="text"
				className="newTodoInput"
				placeholder='What needs to be done?'
				ref={inputRef}
				value={input}
				onChange={(e)=>handleChange(e)}
				onKeyDown={(e)=>handleKeyDown(e)}
			/>		
			<button className="addButton" onClick={handleClick}>+</button>
		</div>
	)
})

interface InputItem{
	text: string,
	setEditing: (editing: boolean)=>void,
	handleEditing: (newValue: string)=>void,
}

function InputItem(props: InputItem){
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