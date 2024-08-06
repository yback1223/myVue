function logLifecycleHook(hook) {
	const date = new Date();
	console.log(
		`%c${hook}: %c${date.getSeconds()}.${date.getMilliseconds()}초`,
		'background: white; color: blue',
		'background: white; color: blue',
	);
}

function isEmpty(todo) {
	return todo == '' ? true : false;
}

new Vue({
	el: '#app',
	data: {
		todos: JSON.parse(localStorage.getItem("todos")) || [],
	},
	methods: {
		addTodo() {
			const todoInput = document.getElementById('todoInput');
			const todoItem = todoInput.value.trim();

			if (isEmpty(todoItem)) {
				window.alert("할 일을 입력하세요!");
				return;
			} 
			this.todos.unshift(todoItem);
			document.getElementById('todoInput').value ='';
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