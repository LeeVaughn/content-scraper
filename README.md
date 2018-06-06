# Content Scraper (Work in Progress)

A Node.js command line application that tracks the latest prices at an eCommerce site and saves them to a spreadsheet in CSV format.

## Motivation

This project was created as a part of the Treehouse Full Stack JavaScript Techdegree program.

## Features

* Scrapes data on eight different shirts from [Shirts 4 Mike](http://shirts4mike.com/shirts.php)
* Data includes product title, price, image, and url
* Data is to a file named "data" in CSV format with headers for Title, Price, ImageURL, URL, and Time
* If the script is run twice it overwrites the data
* A Human-friendly error message is displayed when unable to connect to [Shirts 4 Mike](http://shirts4mike.com/shirts.php)
* Errors are also logged to "scraper-error.log" with new errors appended to the end along with a timestamp

## Dependencies

* [scrape-it](https://www.npmjs.com/package/scrape-it) A Node.js scraper for humans
* [json2csv](https://www.npmjs.com/package/scrape-it) Converts json into csv

## Links

* Project Homepage - coming soon!
* [Repository](https://github.com/LeeVaughn/content-scraper)

## Author

[Daniel Lee Vaughn](https://github.com/LeeVaughn)