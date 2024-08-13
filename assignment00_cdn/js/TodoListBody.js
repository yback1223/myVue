function logLifecycleHook(hook) {
	const date = new Date();
	console.log(
		`%c${hook}: %c${date.getSeconds()}.${date.getMilliseconds()}초`,
		'background: white; color: blue',
		'background: white; color: blue',
	);
}

Vue.component('todo-list-body', {
	template: `
		<div>
			<todo-input @get-todo-input="getTodoInput"></todo-input>
			<todo-list-tabs @get-current-tab="getCurrentTab"></todo-list-tabs>
			<todo-list :todos="currentList"></todo-list>
		</div>
	`,
	data() {
		return {
			todos: JSON.parse(localStorage.getItem("todos")) || [],
			index: localStorage.getItem("index") || 0,
			currentTab: '전체',
		}
	},

	methods: {
		getTodoInput: function(todoInput) {
			this.todos.push({
				label: todoInput,
				isChecked: false,
				status: 0,
				index: this.index++,
			});
			localStorage.setItem("index", this.index);
		},
		getCurrentTab: function(tabLabel) {
			this.currentTab = tabLabel;
		},
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
			};
		},
	},

	watch: {
		todos: {
			handler(newTodos) {
				localStorage.setItem('todos', JSON.stringify(newTodos));
			},
			deep: true
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
})
