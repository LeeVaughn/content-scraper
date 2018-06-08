const fs = require('fs');
const scrapeIt = require("scrape-it");
const Json2csvParser = require('json2csv').Parser;

// checks if directory exists, and creates it if it doesn't
function checkDirSync(dir) {
    try {
        fs.statSync(dir);
    } catch(error) {
        fs.mkdirSync(dir);
    }
}

// logs error messages to scraper-error.log file
function errorLog(error) {
    const date = new Date();
    const errorDate = date.toString();

    if (error.message.includes("ENOTFOUND")) {
        console.error(`There has been an ${error.code} error. Unable to connect to http://shirts4mike.com/`);
    } else {
        console.error(error);
    }

    fs.appendFile("scraper-error.log", `${errorDate}: ${error} \n`, (error) => {
        if (error) throw (error);
    });
}

checkDirSync("data");