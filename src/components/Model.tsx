export interface todo{
  id: number,
  item: string,
  status: boolean,
}

export default class Todo {
  todoList : todo[] = [];
  
	constructor(todoList: todo[]){
		this.todoList = todoList;
  }

	addTodo(newItem: string): void{
		this.todoList.push({
			id: new Date().valueOf(),
			item: newItem,
			status: false,
		})
	}

	deleteTodo(todoId: number ): void{
		this.todoList = this.todoList.filter(item => item.id !== todoId)
	}

	toggle(todoId: number): void{
		this.todoList = this.todoList.map(item =>{
			if(item.id === todoId) item.status = !item.status;
			return item;
		})
	}

	toggleAll(): void{
		let counter: number = this.todoList.reduce((x, y) => x + (y.status ? 1 : 0), 0);
		let flag = true;
		if(counter === this.todoList.length) flag = false;

		this.todoList.forEach(item => {
			item.status = flag;
		})
	}

	editTodo(todoId: number, newValue: string): void{
		this.todoList.forEach(item=>{
			if(item.id===todoId)
			item.item=newValue;
		})
	}

	clearCompleted(): void{
		this.todoList = this.todoList.filter(item => !item.status);
	}

	getActiveTodos() : todo[]{
		return this.todoList.filter(item => !item.status);
	}

	getCompletedTodos(): todo[]{
		return this.todoList.filter(item => item.status);
	}

	activeTodos(): number{
		return this.todoList.reduce((x, y) => x + (y.status ? 0 : 1), 0);
	}
}