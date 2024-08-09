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
		tabList: [
			{
				id: 0,
				label: '전체',
			},
			{
				id: 1,
				label: '미완료',
			},
			{
				id: 2,
				label: '완료',
			},
		],
		currentTabLabel: '전체',
		todos: JSON.parse(localStorage.getItem("todos")) || [],
		todoInput: '',
		index: localStorage.getItem("index") || 0,
	},

	methods: {
		addTodo() {
			if (this.todoInput.trim() === '') {
				window.alert("할 일을 입력하세요!");
				return;
			} 
			var input = {
				'index': this.index++,
				'label': this.todoInput.trim(),
				'status': false,
				'modify': false,
			};
			localStorage.setItem('index', this.index);
			this.todos.push(input);
			this.todoInput = '';
		},

		deleteTodo(todoItemIndex) {
			const itemIndex = this.todos.findIndex((item) => item.index === todoItemIndex);
			this.todos.splice(itemIndex, 1);
		},

		deleteChecked() {
			this.todos = this.todos.filter(todo => !todo.status);
		},

		deleteAll() {
			this.todos = [];
		},

		modifyComplete() {
			if (this.todoInput.trim() === '') {
				window.alert("입력란을 채워주세요!");
				return;
			}
			todo.modify = false;
		},
	},

	computed: {
		currentList() {
			if (this.currentTabLabel === '전체') return this.todos;
			else if (this.currentTabLabel === '미완료') return this.todos.filter(todo => !todo.status);
			return this.todos.filter(todo => todo.status);
		}
	},
	
	watch: {
		todos: {
			handler(newTodos) {
				localStorage.setItem('todos', JSON.stringify(newTodos));
				logLifecycleHook('updated');
			},
			deep: true
		}
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