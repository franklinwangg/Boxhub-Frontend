const axios = require("axios");
const {getArticles} = require("./webscraper");

const POST_API_URL = 'http://localhost:3001/createPost'; 

const runScheduler = () => {
    setInterval(async () => {
        const articles = await getArticles();
        console.log("ARTICLES LENGTH : ", articles.length);

        const selectedArticle = articles[Math.floor(Math.random() * articles.length)];

        const post = {title : selectedArticle.headline, description : selectedArticle.headlineDescription};

        await axios.post(POST_API_URL, post);
    }, 
    24 * 60 * 60 * 1000);
};

module.exports = {runScheduler};

//24 * 60 * 60 * 1000 - day