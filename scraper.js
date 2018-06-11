const fs = require('fs');
const scrapeIt = require("scrape-it");
const Json2csvParser = require('json2csv').Parser;
let shirtsRemaining = 0;

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
        if (error) {
            throw (error);
        }
    });
}

// scrapes site and creates links for individual shirts
function scrapeShirtLinks () {
    let shirtLinks = [];

    // gets url from each list item
    // adds urls to array
    // calls scrapeShirt function using each object in the array as an argument
    scrapeIt("http://shirts4mike.com/shirts.php", {
        shirts: {
            listItem: ".products li a",
            data: {
                url: {
                    attr: "href"
                }
            }
        }
    }, (error, data) => {
        if (error) {
            errorLog(error);
        } else {
            shirtsRemaining = data.data.shirts.length;

            for (let i =0; i < shirtsRemaining; i++) {
                shirtLinks[i] = `http://shirts4mike.com/${data.data.shirts[i].url}`;
                scrapeShirt(shirtLinks[i]);
            }
        }
    });
}

// run on start
console.log("scraper.js is now running.")
checkDirSync("data");
scrapeShirtLinks();