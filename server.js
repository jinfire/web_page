const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

app.get('', async (req, res) => {
    try {
        const response = await axios.get("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%8B%AC%EB%9F%AC+%ED%99%98%EC%9C%A8");
        const $ = cheerio.load(response.data);
        const dollarExchangeRate = $('div.price_info strong').text();

        res.send(
            `달러환율: ${dollarExchangeRate}`);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});