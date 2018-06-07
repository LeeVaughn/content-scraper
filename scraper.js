const fs = require('fs');
const scrapeIt = require("scrape-it");
const Json2csvParser = require('json2csv').Parser;

// checks if directory exists, and creates it if it doesn't
function checkDirSync(dir) {
    try {
        fs.statSync(dir);
    } catch(err) {
        fs.mkdirSync(dir);
    }
}

checkDirSync("data");
