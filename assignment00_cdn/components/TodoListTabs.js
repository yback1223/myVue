Vue.component('todo-list-tabs', {
	template: `
	  <div class="todoListTabs">
		<button
			v-for="tab in tabList" :key="tab.id"
			:class="{ tabClicked: currentTab === tab.label }"
			@click="changeTab(tab.label)"
		>
			{{ tab.label }}
		</button>
	  </div>
	`,
	props: {
	  currentTab: {
			type: String,
			required: true
		}
	},
	data() {
	  return {
			tabList: [
				{ id: 0, label: '전체' },
				{ id: 1, label: '미완료' },
				{ id: 2, label: '완료' },
			]
		};
	},
	methods: {
		changeTab(tabLabel) {
			this.$emit('change-tab', tabLabel);
		}
	}
});
  