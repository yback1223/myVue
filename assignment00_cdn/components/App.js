new Vue({
	el: '#app',
	data: {
		todos: JSON.parse(localStorage.getItem("todos")) || [],
		currentTab: '전체',
		index: localStorage.getItem("index") || 0,
		isAdded: false,
	},
	methods: {
		addTodo(newTodo) {
			this.todos.push({
				index: this.index++,
				label: newTodo,
				status: 0,
				isChecked: false,
				modify: false,
			});
			this.isAdded = true;
		},
		deleteTodo(todoIndex) {
			this.todos = this.todos.filter(todo => todo.index !== todoIndex);
		},
		updateTodo(updatedTodo) {
			let todo = this.todos.find(todo => todo.index === updatedTodo.index);
			Object.assign(todo, updatedTodo);
		},
		moveTodo(todoIndex) {
			const targetTodo = this.todos.find(todo => todo.index === todoIndex);
			targetTodo.status = targetTodo.status === 0 ? 1 : 0;
		},
		changeTab(tabLabel) {
			this.currentTab = tabLabel;
		},
		doneAdding() {
			this.isAdded = false;
		},
		deleteChecked() {
			this.todos = this.todos.filter(todo => !todo.isChecked);
			this.isAdded = true;
		},
		deleteAll() {
			this.todos = [];
			this.index = 0;
		},
	},
	watch: {
		todos: {
			handler(newTodos) {
				localStorage.setItem('todos', JSON.stringify(newTodos));
			},
			deep: true
		},
		index(newIndex) {
			localStorage.setItem('index', newIndex);
		}
	},
	template: `
		<div>
			<todo-input @add-todo="addTodo"></todo-input>
			<todo-list-tabs :currentTab="currentTab" @change-tab="changeTab"></todo-list-tabs>
			<todo-list 
				:todos="todos" 
				:currentTab="currentTab" 
				:isAdded="isAdded"
				@delete-todo="deleteTodo" 
				@update-todo="updateTodo"
				@move-todo="moveTodo"
				@done-adding="doneAdding"
			></todo-list>
			<button @click="deleteChecked">
				체크 삭제
			</button>
			<button 
				class="buttonDeleteAll" 
				@click="deleteAll"
				v-if="currentTab == '전체'"
			>
				초기화
			</button>
			<h1 class="noTodo" v-if="todos.length === 0">
				할! 일이 없습니다!
			</h1>
		</div>
	`
});
