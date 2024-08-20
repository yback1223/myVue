<template>
	<div>
		<div
			v-if="paginatedArticles.length">
			<news-feed-article v-for="article in paginatedArticles" :key="article._id"
			:article="article">
			</news-feed-article>
		</div>
		<div v-if="pageCount > 1">
			<p>
				<strong>{{ currentPage }}</strong>
			</p>
			<button
				v-for="page in pageCount"
				:key="page"
				@click="changePage(page)"	
			>
				{{ page }}
			</button>
		</div>
	</div>
</template>

<script>
import NewsFeedArticle from './NewsFeedArticle.vue';

export default {
	components: {
		NewsFeedArticle
	},
	props: {
		articles: {
			type: Array,
			required: true,
		},
		receivedTab: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			currentPage: 1,
		}
	},
	computed: {
		paginatedArticles() {
			const start = (this.currentPage - 1) * 5;
			const end = start + 5;
			return this.articles.slice(start, end);
		},
		pageCount() {
			return Math.ceil(this.articles.length / 5);
		},
	},
	methods: {
		changePage(page) {
			this.currentPage = page;
		},
	},
	watch: {
		receivedTab: {
			handler() {
				this.currentPage = 1;
			}
		}
	}
}
</script>