Vue.component('todo-input', {
	template: `
		<div class="todoList">
			<input
				class="todoInput"
				@keyup.enter="addTodo"
				v-model.lazy="todoInput"
				type="text"
				placeholder="할 일을 입력하세요."
			>
			<button class="buttonSubmit" @click="addTodo"></button>
		</div>
	`,
	data() {
		return {
			todoInput: '',
		};
	},
	methods: {
		addTodo() {
			if (!this.todoInput.trim()) {
				alert("할 일을 입력하세요!");
				return;
			}
			this.$emit('add-todo', this.todoInput.trim());
			this.todoInput = '';
		}
	}
});
