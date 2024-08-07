<template>
	<div>
		<label>{{ label }}</label> <button @click="deleteTodo">삭제</button>
	</div>
</template>

<script>
	export default {
		props: ['id', 'label'],
		methods: {
			deleteTodo() {
				this.$emit("delete-todo");
			}
		}
	}
</script>