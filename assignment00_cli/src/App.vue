<template>
	<div>
		<h1>Todo List</h1>
		<TodoForm @todo-added="addTodoToList"></TodoForm>
		<div v-for="(todo, index) in todos" :key="todo.id">
			<TodoItem :id="todo.id" :label="todo.label" @delete-todo="removeTodo(index)"></TodoItem>
		</div>
		<button @click="clearList">전체 삭제</button>
		<button @click="destroyInstance">인스턴스 폭파</button>
	</div>
</template>

<script>
	import TodoForm from './components/TodoForm.vue';
	import TodoItem from './components/TodoItem.vue';

	var index = 0;

	function logLifecycleHook(hook) {
		const date = new Date();
		console.log(
			`%c${hook}: %c${date.getSeconds()}.${date.getMilliseconds()}초`,
			'background: white; color: blue',
			'background: white; color: blue',
		);
	}

	export default {
		components: {
			TodoForm,
			TodoItem
		},
		data() {
			return {
				todos: JSON.parse(localStorage.getItem('todos')) || [],
			};
		},
		methods: {
			addTodoToList(todoLabel) {
				this.todos.push({
					id: index++,
					label: todoLabel,
				});
				localStorage.setItem('todos', JSON.stringify(this.todos));
			},
			removeTodo(index) {
				this.todos.splice(index, 1);
				localStorage.setItem('todos', JSON.stringify(this.todos));
			},
			clearList() {
				this.todos = [];
				localStorage.removeItem('todos');
			},
			destroyInstance() {
				console.warn('%c인스턴스가 폭파됩니다.', 'background: red; color: white');
				this.$destroy();
			},

		},
		beforeCreate() {
			logLifecycleHook('beforeCreate');
		},
		created() {
			logLifecycleHook('created');
		},
		beforeMount() {
			logLifecycleHook('beforeMount');
		},
		mounted() {
			logLifecycleHook('mounted');
		},
		beforeUpdate() {
			logLifecycleHook('beforeUpdate');
		},
		updated() {
			logLifecycleHook('updated');
		},
		beforeDestroy() {
			logLifecycleHook('beforeDestroy');
		},
		destroyed() {
			logLifecycleHook('destroyed');
		},
	};
</script>
