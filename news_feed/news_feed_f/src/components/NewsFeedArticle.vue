<template>
	<div>
		<a :href="article.url">
			<p>
				{{ article.title }}
			</p>
		</a>
		<label>
				{{ getBeautifulDate(article.publishedAt) }}
		</label>
		<hr>
	</div>
</template>

<script>
export default {
	props: {
		article: {
			type: Object,
			required: true,
		}
	},
	methods: {
		getBeautifulDate(publishedAt) {
			const date = new Date(publishedAt)
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const mins = String(date.getMinutes()).padStart(2, '0');
			const secs = String(date.getMonth()).padStart(2, '0');
			return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
		}
	}
}
</script>