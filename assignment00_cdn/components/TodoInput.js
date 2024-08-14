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
	data: function() {
		return {
			todoInput: '',
		}
	}
	,
	methods: {
		addTodo: function() {
			this.$emit('get-todo-input', this.todoInput);
			this.todoInput = '';
		}
	},
})