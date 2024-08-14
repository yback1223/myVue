Vue.component('todo-item', {
	template: `
		<div>
			<input class="todoCheckBox" type="checkbox" v-model="todo.isChecked">
			<span :class="todo.status ? 'todoDone' : 'todoSpan'" v-if="!todo.modify">
				{{ todo.label }}
			</span>
			<input
				class="inputModify"
				v-if="todo.modify"
				v-model.lazy="todo.label"
				@keyup.enter="modifyComplete"
			>
			<button 
				class="buttonModifyComplete"
				v-if="todo.modify"
				@click="modifyComplete"
			></button>
			<button class="buttonDeleteOne" @click="deleteTodo"></button>
			<button
				class="buttonModify"
				@click="toggleModify"
			></button>
		</div>
	`,
	props: {
		todo: {
			type: Object,
			required: true,
		}
	},
	methods: {
		modifyComplete() {
			if (!this.todo.label.trim()) {
				window.alert("입력란을 채워주세요!");
			} else {
				this.$emit('update-todo', this.todo);
				this.todo.modify = false;
			}
		},
		deleteTodo() {
			this.$emit('delete-todo', this.todo.index);
		},
		toggleModify() {
			this.todo.modify = !this.todo.modify && this.todo.label.trim() !== '';
		},
	}
});
