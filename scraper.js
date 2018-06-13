const fs = require('fs');
const scrapeIt = require("scrape-it");
const json2csv = require('json2csv').parse;
let shirtsRemaining = 0;
const url = "http://shirts4mike.com/";
let shirtInfo = [];
const fields = [
    {label: "Title", value: "title"},
    {label: "Price", value: "price"},
    {label: "Image URL", value: "imageURL"},
    {label: "URL", value: "url"},
    {label: "Time", value: "time"}
];
const options = {fields};

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

// scrapes landing page and creates links for individual shirt pages
function scrapeShirtLinks () {
    let shirtLinks = [];

    // gets url from each list item
    // adds urls to array
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
                shirtLinks[i] = `${url}${data.data.shirts[i].url}`;
                scrapeShirt(shirtLinks[i]);
            }
        }
    });
}

// scrapes individual shirt pages
// pushes data for each shirt to an array
function scrapeShirt(url) {
    scrapeIt(url, {
        title: {
            listItem: ".shirt-details h1"
        },
        price: {
            listItem: ".shirt-details h1 span"
        },
        imageURL: {
            listItem: ".shirt-picture img",
            data: {
                url: {
                    attr: "src"
                }
            }
        }
    }, (error, data) => {
        if (error) {
            errorLog(error);
        } else {
            const title = data.data.title[0].slice(4);
            const price = data.data.price[0];
            const imageURL = `${url}${data.data.imageURL[0].url}`;
            const time = new Date().toLocaleTimeString();

            shirtInfo.push({title, price, imageURL, url, time});
            
            shirtsRemaining -= 1;

            if (shirtsRemaining === 0) {
                saveCSV();
            }
        }
    });
}

// parses shirtInfo array and saves data in a csv file
function saveCSV() {
    try {
        const csv = json2csv(shirtInfo, options);
        const date = new Date().toISOString().slice(0, 10);

        fs.writeFile(`data/${date}.csv`, csv, (error) => {
            if (error) {
                throw (error);
            }
        })
    } catch (error) {
        errorLog(error);
    }
}

// run on start
console.log("scraper.js is now running.")
checkDirSync("data");
scrapeShirtLinks();
