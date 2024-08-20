<template>
	<div id="app">
	<img alt="Vue logo" src="./assets/logo.png">
	<news-feed-tabs @change-tab="changeTab"></news-feed-tabs>
	<news-feed-pages :articles="currentTabData" :receivedTab="currentTab"></news-feed-pages>
	</div>
</template>

<script>
import axios from 'axios';

import NewsFeedTabs from './components/NewsFeedTabs.vue';
import NewsFeedPages from './components/NewsFeedPages.vue';

export default {
	name: 'App',
	data() {
		return {
			currentTab: 'Politics',
			articles: {
				Business: [],
				Politics: [],
				Science: [],
				Technology: []
			}
		}
	},
	computed: {
		currentTabData() {
			return this.articles[this.currentTab] || [];
		}
	},
	components: {
		NewsFeedTabs,
		NewsFeedPages,
	},
	methods: {
		async fetchArticles() {
			const categories = ['Business', 'Politics', 'Science', 'Technology'];

			for (const category of categories) {
				try {
					const response = await axios.get(`http://localhost:3000/get${category}News`);
					const data = response.data;
					this.$set(this.articles, category, data);
				} catch (error) {
					console.error(`Error fetching ${category} news:`, error);
				}
			}
		},
		changeTab(tabLabel) {
			this.currentTab = tabLabel;
		}
	},
	mounted() {
		this.fetchArticles();
		console.log('fetch 완료')
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
