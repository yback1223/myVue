<template>
	<div>
		<input @keyup.enter="addTodo" type="text" v-model.trim="todoInput" placeholder="할 일을 입력하세요.">
		<button @click="addTodo">등록</button>
	</div>
</template>

<script>

export default {
	data() {
		return {
			todoInput: '',
		};
	},
	methods: {
		addTodo() {
			if (this.todoInput !== '') {
				this.$emit("todo-added", this.todoInput);
				this.todoInput = '';
			} else {
				window.alert('할일을 입력하세요!');
			}
		}
	}
};
</script>
