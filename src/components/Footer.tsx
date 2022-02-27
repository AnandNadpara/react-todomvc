import React from 'react';

interface FooterTypes{
	handleFilter: (mode: string) => void,
	handleClear: () => void,
	activeTodos: number
}

let Footer = (props: FooterTypes) => {
	const {activeTodos, handleFilter,handleClear} = props;
	const [active, setActive] = React.useState('All');
	return (
		<footer className="footer">
			<span>{activeTodos} items left</span>
			<div>
				<button className={active==='All' ? 'active': ''} onClick={()=>{setActive('All');handleFilter("All")}}>All</button>
				<button className={active==='Active' ? 'active': ''} onClick={()=>{setActive("Active");handleFilter("Active")}}>Active</button>
				<button className={active==='Completed' ? 'active': ''} onClick={()=>{setActive("Completed"); handleFilter("Completed")}}>Completed</button>
			</div>
			<button className="clearCompleted" onClick={handleClear}>Clear Completed</button>
		</footer>
	)
}


export default React.memo(Footer);