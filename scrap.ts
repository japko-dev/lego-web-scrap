import * as cheerio from 'cheerio';
import 'dotenv/config'

// Function to scrape data from a URL
async function scrapeData(url: string, code: number): Promise<void> {
    try {
        // Fetch the HTML of the page
        const response = await fetch(`${url}/?s=${code}`);
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

        // get details
        await scrapeDetails(`${process.env.URL}${link}`)
    } catch (error) {
        console.error('Error fetching the page:', error);
    }
}

const specificKeys = [
  'namePL',
  'nameEN',
  'catalogueNumber',
  'series',
  'elementNumber',
  'figureNumber',
  'releaseYear',
  'premiereDate',
  'exitDate',
  'shopStatus',
  'currentLowestPrice',
  'cataloguePrice',
  'allTimeLowestPrice',
  'age',
  'box',
  'numberInGroupBox',
  'boxWeight',
  'boxSize',
  'dimensions'
]

async function scrapeDetails(url: string): Promise<void> {
    const response = await fetch(url);
    const data = await response.text();
    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Extract the specifics
    const specificsTable = $(`.table.table-hover.table-sm tbody`)

    // initial row
    let dataRow = specificsTable.children().first()
    const legoSpecifics: Record<string, string> = {};

    for (const key of specificKeys) {
        legoSpecifics[key] = dataRow.find('td').eq(1).text()
        dataRow = dataRow.next();
    }

    console.log(legoSpecifics)
}

// Example URL to scrape
const url = process.env.URL || '';
scrapeData(url, 76965).then();