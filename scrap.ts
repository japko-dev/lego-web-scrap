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
        // Example: Extract the titles of articles from a blog page
        const productRow = $('.row.product')
        const imageElement = productRow.children('div:first')
        const descriptionElement = imageElement.next()
        const priceElement = descriptionElement.next()

        console.log(imageElement.html());
        console.log(descriptionElement.html());
        console.log(priceElement.html());
    } catch (error) {
        console.error('Error fetching the page:', error);
    }
}

// Example URL to scrape
const url = process.env.URL || '';
scrapeData(url, 76965).then();