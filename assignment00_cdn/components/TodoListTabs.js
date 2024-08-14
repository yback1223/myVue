Vue.component('todo-list-tabs', {
	template: `
		<div class="todoListTabs">
			<button
				v-for="tab in tabList" :key="tab.id"
				:class="{ tabClicked: currentTabLabel === tab.label }"
				@click="setCurrentTabLabel(tab.label)"
			>
				{{ tab.label }}
			</button>
		</div>
	`,
	data: function() {
		return {
			tabList: [
				{ id: 0, label: '전체' },
				{ id: 1, label: '미완료' },
				{ id: 2, label: '완료' },
			],
			currentTabLabel: '전체',
		};
	},
	methods: {
		setCurrentTabLabel(tabLabel) {
			this.currentTabLabel = tabLabel;
			this.$emit('get-current-tab', tabLabel);
		}
	},
});
