const express = require('express');
const route = express.Router();

const puppeteer = require('puppeteer');

route.post('/getReviews', async (req, res)=>{
    const webUrl = req.body.url;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(webUrl);

    const links = await page.$$eval('div#customerReviews div.review',(trows)=>{
        let reviewList = []
        trows.forEach(row => {
            let record = {'Review_Comment':'','Rating' : '','Review_Date':'','Reviewer_Name':''}
            const tdListLeft = Array.from(row.querySelectorAll('dd'), column => column.innerText); 
            let rating = tdListLeft[0].split('\n');
            record.Rating = rating[1];
            record.Review_Date = tdListLeft[6];
            record.Reviewer_Name = tdListLeft[5];
            const tdListRightComment = Array.from(row.querySelectorAll('p'), column => column.innerText);
            record.Review_Comment = tdListRightComment[0];
            reviewList.push(record);
        });
        return reviewList;
    })
    res.json(links);

    await browser.close();
});

module.exports = route;