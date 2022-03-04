import React from 'react';
import {useTodoContext} from './hooks'

interface footerProps{
	activeTodos: number,
}

const Footer = (props: footerProps) => {
	const {activeTodos} = props
	const {viewMode, setViewMode, clearCompleted} = useTodoContext()
	return (
		<footer className="footer">
			<span>{activeTodos} items left</span>
			<div>
				<button className={viewMode==='All' ? 'active': ''} onClick={()=>{setViewMode('All')}}>All</button>
				<button className={viewMode==='Active' ? 'active': ''} onClick={()=>{setViewMode('Active')}}>Active</button>
				<button className={viewMode==='Completed' ? 'active': ''} onClick={()=>{setViewMode('Completed')}}>Completed</button>
			</div>
			<button className="clearCompleted" onClick={() => clearCompleted()}>Clear Completed</button>
		</footer>
	)
}


export default React.memo(Footer);