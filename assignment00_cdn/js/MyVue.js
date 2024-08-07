function logLifecycleHook(hook) {
	const date = new Date();
	console.log(
		`%c${hook}: %c${date.getSeconds()}.${date.getMilliseconds()}초`,
		'background: white; color: blue',
		'background: white; color: blue',
	);
}

new Vue({
	el: '#app',
	data: {
		todos: JSON.parse(localStorage.getItem("todos")) || [],
		todoInput: '',
	},
	methods: {
		addTodo() {
			if (this.todoInput === '') {
				window.alert("할 일을 입력하세요!");
				return;
			} 
			this.todos.push(this.todoInput);
			this.todoInput = '';
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		removeTodo(i) {
			this.todos.splice(i, 1);
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		clearList() {
			this.todos.splice(0);
			localStorage.clear();
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
});