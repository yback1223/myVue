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
		index: localStorage.getItem("index") || 0,
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
			localStorage.setItem('index', this.index);
			this.todos.push(input);
			this.todoInput = '';
			console.log(this.todos);
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		removeTodo(todoItemIndex) {
			const itemIndex = this.todos.findIndex((item) => item.id === todoItemIndex);
			this.todos.splice(itemIndex, 1);
			console.log(this.todos);
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		deleteChecked() {
			this.todos = this.todos.filter(todo => !this.checkedItem.includes(todo.index));
			this.checkedItem = [];
			console.log(this.todos);
			localStorage.setItem('todos', JSON.stringify(this.todos));
		},
		deleteAll() {
			this.todos = [];
			this.checkedItem = [];
			console.log(this.todos);
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