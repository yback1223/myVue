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
			{ id: 0, label: '전체' },
			{ id: 1, label: '미완료' },
			{ id: 2, label: '완료' },
		],
		currentTabLabel: '전체',
		todos: JSON.parse(localStorage.getItem("todos")) || [],
		index: localStorage.getItem("index") || 0,
		todoInput: '',
		isAllChecked: false,
	},

	methods: {
		addTodo() {
			if (!this.todoInput.trim()) {
				alert("할 일을 입력하세요!");
				return;
			}
			this.todos.push({
				index: this.index++,
				label: this.todoInput.trim(),
				status: 0,
				isChecked: false,
				modify: false,
			});
			this.isAllChecked = false;
			this.todoInput = '';
		},

		deleteTodo(todoIndex) {
			this.todos = this.todos.filter(todo => todo.index !== todoIndex);
		},

		deleteChecked() {
			this.todos = this.todos.filter(todo => !todo.isChecked);
			this.isAllChecked = false;
		},

		deleteAll() {
			this.todos = [];
			this.index = 0;
		},

		modifyComplete(todo) {
			if (!todo.trim()) {
				window.alert("입력란을 채워주세요!");
				return true;
			}
			return false;
		},

		clickModifyButton(todoLabel, modifyStatus) {
			return modifyStatus && todoLabel.trim() != '' ? false : true;
		},

		initCurrentTab(tabLabel) {
			this.isAllChecked = true;
			this.checkAll();
			this.isAllChecked = false;
			this.currentTabLabel = tabLabel;
		},

		moveTodo(todoIndex) {
			const targetTodo = this.todos.find(todo => todo.index === todoIndex);
			switch (targetTodo.status) {
				case 0:
					targetTodo.status = 1;
					break;
				case 1:
					targetTodo.status = 0;
					break;
			}
		},

		checkAll() {
			switch (this.isAllChecked) {
				case true:
					this.currentList.forEach((todo) => todo.isChecked = false);
					break;
				case false:
					this.currentList.forEach((todo) => todo.isChecked = true);
					break;
			}
		},

		getMoveButtonLabel(todo) {
			return todo.status === 0 ? '완료로 이동' : '미완료로 이동';
		  }
		
	},

	computed: {
		currentList() {
			switch (this.currentTabLabel) {
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
		index: {
			handler(newIndex) {
				localStorage.setItem('index', JSON.stringify(newIndex));
			}
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