const axios = require('axios');
const cheerio = require('cheerio');

const bbcUrl = 'https://www.bbc.com/sport/boxing';
const skySportsUrl = 'https://www.skysports.com/boxing';

const getArticlesFromOneDayAgoFromSkySports = async () => {

  try {
    const response = await axios.get(skySportsUrl);

    const $ = cheerio.load(response.data);

    const headlines = $('.news-list__headline');
    const headlineDescriptions = $('.news-list__snippet');

    const array = [];

    console.log("Fetching headlines and descriptions...");

    const count = Math.min(headlines.length, headlineDescriptions.length, 3);

    for (let i = 0; i < count; i++) {
      const headlineText = $(headlines[i]).text().trim();
      const headlineDescriptionText = $(headlineDescriptions[i]).text().trim();

      const object = {
        headline: headlineText,
        headlineDescription: headlineDescriptionText
      };

      array.push(object);
    }

    return array;
  }
  catch (error) {
    console.log("Error fetching SkySports : ", error);
    return [];
  }
}

function getArticles() {
  return getArticlesFromOneDayAgoFromSkySports();
}

getArticles();

module.exports = { getArticles };


//class="ssrcss-1f3bvyz-Stack e1y4nx260"

// (for date)  ssrcss-30fcoe-MetadataStripItem eh44mf01
//visually-hidden ssrcss-1f39n02-VisuallyHidden e16en2lz0