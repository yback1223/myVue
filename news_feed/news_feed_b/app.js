const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
app.use(cors({
	origin: 'http://localhost:8080'
}));

mongoose.connect('mongodb://127.0.0.1:27017/news_feed_db')
	.then(() => console.log('MongoDB Connected!'));

const port = 3000;
require("dotenv").config();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const newsSchema = new mongoose.Schema({
	author: String,
	title: String,
	url: String,
	publishedAt: Date
});

const NewsBusiness = mongoose.model('NewsBusiness', newsSchema);
const NewsPolitics = mongoose.model('NewsPolitics', newsSchema);
const NewsScience = mongoose.model('NewsScience', newsSchema);
const NewsTechnology = mongoose.model('NewsTechnology', newsSchema);

const categories = new Map([
	['business', NewsBusiness],
	['politics', NewsPolitics],
	['science', NewsScience],
	['technology', NewsTechnology]
]);

const saveNews = async (inputCategory, NewsModel) => {
	try {
			const response = await newsapi.v2.topHeadlines({
				domains: 'cnn.com',
				category: inputCategory,
				language: 'en',
			});

			const savePromises = response.articles.map(async (article) => {
				const existingArticle = await NewsModel.findOne({ title: article.title });

				if (!existingArticle) {
					const newArticle = new NewsModel({
						author: article.author,
						title: article.title,
						url: article.url,
						publishedAt: new Date(article.publishedAt)
					});

					return newArticle.save()
									 .then(() => console.log('기사 저장 완료: ', article.title))
									 .catch(err => console.error('DB에 저장 중 에러 발생:', err));
				} else {
					console.log('기사가 이미 존재 합니다: ', article.title);
				}
			});

			await Promise.all(savePromises);
	} catch (error) {
		console.error("뉴스 크롤링 중 에러 발생: ", error);
	}
};


app.get('/getBusinessNews', async (req, res) => {
	try {
		const news = await NewsBusiness.find({}).sort({ publishedAt: -1 });
		res.json(news);
	} catch (err) {
		console.error('Business 뉴스 요청 처리 중 에러 발생:', err);
		res.status(500).send('Server error');
	}
});

app.get('/getPoliticsNews', async (req, res) => {
	try {
		const news = await NewsPolitics.find({}).sort({ publishedAt: -1 });
		res.json(news);
	} catch (err) {
		console.error('Politics 뉴스 요청 처리 중 에러 발생:', err);
		res.status(500).send('Server error');
	}
});

app.get('/getTechnologyNews', async (req, res) => {
	try {
		const news = await NewsTechnology.find({}).sort({ publishedAt: -1 });
		res.json(news);
	} catch (err) {
		console.error('Technology 뉴스 요청 처리 중 에러 발생:', err);
		res.status(500).send('Server error');
	}
});

app.get('/getScienceNews', async (req, res) => {
	try {
		const news = await NewsScience.find({}).sort({ publishedAt: -1 });
		res.json(news);
	} catch (err) {
		console.error('Science 뉴스 요청 처리 중 에러 발생:', err);
		res.status(500).send('Server error');
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});


for (const [category, NewsModel] of categories) {
	saveNews(category, NewsModel);
}

cron.schedule('*/16 * * * *', async () => {
	console.log('Cron job 실행 중: 뉴스 크롤링');

	const promises = [];
	for (const [category, NewsModel] of categories) {
		promises.push(saveNews(category, NewsModel));
	}
	await Promise.all(promises);

	console.log('모든 카테고리의 뉴스 크롤링이 완료되었습니다.');
});



// async function task1() {
//     console.log("task1 log");
// }

// function task2() {
//     console.log("task2 log");
// }

// async function caller1() {
//     await task1();
//     console.log("after calling task1 in caller1");
// }

// async function caller2() {
//     await task1();
//     console.log("after calling task1 in caller2");
//     task2();
//     console.log("after calling task2 in caller2");
// }

// caller1();
// console.log("after caller1 before task1");
// task1();
// console.log("after task1 before caller2");
// caller2();
// console.log("after caller2 before task2");
// task2();
// console.log("after task2");