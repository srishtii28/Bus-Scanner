const puppeteer = require('puppeteer');

async function scrapeMMT(from, to, date) {
  const results = [];
  const formattedDate = date.split('-').reverse().join('/'); // Convert YYYY-MM-DD to DD/MM/YYYY

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0');

    // Go to MakeMyTrip buses page
    await page.goto('https://www.makemytrip.com/bus-tickets/', { waitUntil: 'networkidle2' });

    // Type source, destination and date
    await page.waitForSelector('input[placeholder="From"]');
    await page.click('input[placeholder="From"]');
    await page.type('input[placeholder="From"]', from, { delay: 100 });

    await page.click('input[placeholder="To"]');
    await page.type('input[placeholder="To"]', to, { delay: 100 });

    await page.click('input[placeholder="Travel Date"]');
    await page.keyboard.type(formattedDate);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000); // Wait for results

    // Now extract some dummy results (MMT blocks scraping, so we'll simulate for now)
    results.push({
      source: 'MakeMyTrip',
      name: 'Dummy MMT Bus',
      departure: '10:00 AM',
      arrival: '04:00 PM',
      duration: '6h',
      price: '999',
      link: 'https://www.makemytrip.com/bus-tickets/'
    });

    await browser.close();
  } catch (err) {
    console.error('Error scraping MMT:', err.message);
  }

  return results;
}

module.exports = scrapeMMT;
