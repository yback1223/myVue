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
		todoInput: '',
		modifyInput: '',
		checkLabel: '전체 완료 상태로 만들기',
		index: localStorage.getItem("index") || 0,
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
				status: false,
				modify: false,
			});
			localStorage.setItem('index', this.index);
			this.todoInput = '';
		},
		deleteTodo(todoIndex) {
			this.todos = this.todos.filter(todo => todo.index !== todoIndex);
		},

		deleteChecked() {
			this.todos = this.todos.filter(todo => !todo.status);
		},
		deleteAll() {
			this.todos = [];
		},
		modifyComplete(todo) {
			if (!todo.trim()) {
				window.alert("입력란을 채워주세요!");
				return true;
			}
			return false;
		},
		clickModifyButton(todoLabel, modifyStatus) {
			if (modifyStatus && todoLabel.trim() != '') return false;
			return true; 
		},
		checkAll() {
			const allChecked = this.todos.every(todo => todo.status);

			this.checkLabel = !allChecked ? '전체 미완료 상태로 만들기' : '전체 완료 상태로 만들기';
		
			this.todos.forEach((todo) => {
				todo.status = !allChecked;
			});
		},
	},

	computed: {
		currentList() {
			if (this.currentTabLabel === '전체') return this.todos;
			else if (this.currentTabLabel === '미완료') return this.notDoneList;
			return this.doneList;
		},
		notDoneList() {
			return this.todos.filter(todo => !todo.status);
		},
		doneList() {
			return this.todos.filter(todo => todo.status);
		},
	},
	
	watch: {
		todos: {
			handler(newTodos) {
				localStorage.setItem('todos', JSON.stringify(newTodos));
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