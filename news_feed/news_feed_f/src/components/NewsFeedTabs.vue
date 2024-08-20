<template>
	<div>
		<button
			v-for="tab in tabList" :key="tab.id"
			@click="changeTab(tab.label)"
		>
			{{ tab.label }}
		</button>
		<h1>{{ currentTab }}</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentTab: 'Politics',
			tabList: [
				{ id: 0, label: 'Politics' },
				{ id: 1, label: 'Business' },
				{ id: 2, label: 'Technology' },
				{ id: 3, label: 'Science' },
			]
		}
	},
	methods: {
		changeTab(tabLabel) {
			this.currentTab = tabLabel;
			this.$emit('change-tab', tabLabel);
		}
	},
};
</script>