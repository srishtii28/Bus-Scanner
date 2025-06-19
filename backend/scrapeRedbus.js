const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeRedbus(from, to, date) {
  try {
    const searchURL = `https://www.redbus.in/bus-tickets/${from}-to-${to}?onward=${date}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0'
    };

    const response = await axios.get(searchURL, { headers });
    const $ = cheerio.load(response.data);

    let results = [];

    $('.bus-item-details').each((i, el) => {
      const name = $(el).find('.travels').text().trim();
      const departure = $(el).find('.dp-time').text().trim();
      const arrival = $(el).find('.bp-time').text().trim();
      const duration = $(el).find('.duration').text().trim();
      const price = $(el).find('.fare .fare-dtl span').first().text().trim().replace('₹', '');

      results.push({
        source: 'RedBus',
        name,
        departure,
        arrival,
        duration,
        price,
        link: searchURL
      });
    });

    return results;
  } catch (err) {
    console.error('Error scraping RedBus:', err.message);
    return [];
  }
}

module.exports = scrapeRedbus;
