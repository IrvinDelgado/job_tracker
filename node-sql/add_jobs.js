//server.js
const sqlite3 = require('sqlite3').verbose();

module.exports = function() { 
    this.sum = function(a,b) { return a+b };
    this.multiply = function(a,b) { return a*b };
    //etc
}
// opens database in memory      
let db = new sqlite3.Database('C:\\Users\\ID_11\\job_tracker', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// Add job to DB


// close database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});