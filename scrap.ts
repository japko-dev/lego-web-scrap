import * as cheerio from 'cheerio';
import 'dotenv/config'

// Function to scrape data from a URL
async function scrapeData(url: string, code: number): Promise<void> {
    try {
        // Fetch the HTML of the page
        const response = await fetch(`${url}${code}`);
        const data = await response.text();
        // Load the HTML into Cheerio
        const $ = cheerio.load(data);

        // Extract the desired data
        const productRow = $('.row.product')

        // First element
        const imageElement = productRow.children('div:first')
        const imageSrc = imageElement
          .find('img')
          .attr('src')

        // Second element
        const nameElement = imageElement.next()
        const name = nameElement
          .first()
          .find('a')
          .prop('innerText')

        // Third element
        const priceElement = nameElement.next()
        const link = priceElement
          .find('a')
          .prop('href')
        const price = priceElement.find('strong').text();

        console.log(imageSrc);
        console.log(name);
        console.log(link);
        console.log(price);

    } catch (error) {
        console.error('Error fetching the page:', error);
    }
}

// Example URL to scrape
const url = process.env.URL || '';
scrapeData(url, 76965).then();