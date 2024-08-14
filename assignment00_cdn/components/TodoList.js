Vue.component('todo-list', {
	template: `
	<div>
		<label class="allCheckLabel">
		<input type="checkbox" class="todoCheckBox" v-model="isAllChecked" @click="checkAll">
			전체 선택
		</label>
		<ul class="todoList">
		<li v-for="todo in currentList" :key="todo.index">
			<todo-item 
				:todo="todo" 
				@delete-todo="deleteTodo"
				@update-todo="updateTodo"
				@move-todo="moveTodo"
			></todo-item>
		</li>
		</ul>
	</div>
	`,
	props: {
		todos: {
			type: Array,
			required: true,
		},
		currentTab: {
			type: String,
			required: true,
		},
		isAdded: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			isAllChecked: false
		};
	},
	computed: {
		currentList() {
			switch (this.currentTab) {
			case '전체':
				return this.todos;
			case '미완료':
				return this.todos.filter(todo => todo.status === 0);
			case '완료':
				return this.todos.filter(todo => todo.status === 1);
			}
		}
	},
	methods: {
		checkAll() {
			switch (this.isAllChecked) {
				case true:
					this.currentList.forEach((todo) => todo.isChecked = false);
					break;
				case false:
					this.currentList.forEach((todo) => todo.isChecked = true);
					break;
			}
		},
		deleteTodo(index) {
			this.$emit('delete-todo', index);
		},
		updateTodo(updatedTodo) {
			this.$emit('update-todo', updatedTodo);
		},
		moveTodo(todoIndex) {
			this.$emit('move-todo', todoIndex);
		}
	},
	watch: {
		currentTab(newTab) {
			this.isAllChecked = true;
			this.checkAll();
			this.isAllChecked = false;
		},
		isAdded(newTodo) {
			this.isAllChecked = false;
			this.$emit('done-adding');
		}
	}
});
