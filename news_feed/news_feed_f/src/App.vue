<template>
	<div id="app">
	<img alt="Vue logo" src="./assets/logo.png">
	<news-feed-tabs @change-tab="changeTab"></news-feed-tabs>
	<p>Last updated: {{ updateTime }}</p>
	<button @click="fetchArticles">News Update</button>
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
			updateTime: '',
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
		},
	},
	components: {
		NewsFeedTabs,
		NewsFeedPages,
	},
	methods: {
		async fetchArticles() {
			this.updateTime = this.getCurrentTime();
			const categories = ['Business', 'Politics', 'Science', 'Technology'];

			for (const category of categories) {
				try {
					const response = await axios.get(`http://localhost:3000/get${category}News`);
					const data = response.data;
					this.$set(this.articles, category, data);
					console.log(`${category} fetch 완료`);
				} catch (error) {
					console.error(`Error fetching ${category} news:`, error);
				}
			}
		},
		changeTab(tabLabel) {
			this.currentTab = tabLabel;
		},
		getCurrentTime() {
			const date = new Date();
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const mins = String(date.getMinutes()).padStart(2, '0');
			const secs = String(date.getSeconds()).padStart(2, '0');
			return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
		},
	},
	mounted() {
		this.fetchArticles();
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
