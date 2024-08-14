Vue.component('todo-list', {
	template: `
		<div>
			<ul class="todoList">
				<label class="allCheckLabel">
					<input
						type="checkbox"
						class="todoCheckBox"
						v-model="isAllChecked"
						@change="handleCheck"
					>
				</label>
				<li v-for="todo in todos" :key="todo.index">
					<todo-item :todo="todo" @delete-todo="deleteTodo" @update-todo="updateTodo"></todo-item>
				</li>
			</ul>
		</div>
	`,

	data: function() {
		return {
			isAllChecked: false,
		}
	},

	methods: {
		handleCheck() {
			this.todos.forEach(todo => {
				todo.isChecked = this.isAllChecked;
			});
		},
		deleteTodo(index) {
			this.todos = this.todos.filter(todo => todo.index !== index);
		},
		updateTodo(updatedTodo) {
			let todo = this.todos.find(todo => todo.index === updatedTodo.index);
			if (todo) {
				Object.assign(todo, updatedTodo);
			}
		}
	},

	props: {
		todos: {
			type: Array,
			required: true
		}
	},

	
})