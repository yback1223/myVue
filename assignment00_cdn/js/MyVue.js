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
		checkedItem: [],
		index: 0,
	},
	methods: {
		addTodo() {
			if (this.todoInput === '') {
				window.alert("할 일을 입력하세요!");
				return;
			} 
			var input = {
				'index': this.index++,
				'label': this.todoInput,
			};
			this.todos.push(input);
			this.todoInput = '';
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		removeTodo(i) {
			this.todos.splice(i, 1);
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		deleteChecked() {
			this.todos = this.todos.filter(todo => !this.checkedItem.includes(todo.index));
			this.checkedItem.length = 0;
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		// destroyInstance() {
		// 	console.warn('%c인스턴스가 폭파됩니다.', 'background: red; color: white');
		// 	this.$destroy();
		// },
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