//server.js
/*
const express = require('express'),
      server = express(),
      sqlite3 = require('sqlite3').verbose();
*/


// --CONNECT-- DATABASE     
/*
let db = new sqlite3.Database('C:\\Users\\ID_11\\job_tracker', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
*/


// --CREATE-- TABLE
/*
db.run('CREATE TABLE jobs(jobNumber TEXT Primary Key, company TEXT,	position TEXT,	location TEXT,	website TEXT, applied INTEGER, stage TEXT,	result INTEGER	);');
*/


// --INSERT-- VALUES TO TABLE
/*
let values = ['1S5A','AA','SE','SF','https',0,'None',0];
let variables = '(jobNumber, company, position, location, website, applied, stage, result)'
let placeholders =  values.map((item)=>'?').join(',');
let sql = 'INSERT INTO jobs'+variables+' VALUES('+placeholders+')';
db.run(sql, values, function(err) {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});
*/


// --SELECT-- VALUE FROM TABLE
// get() gets only one item
// all() gets all items then runs query
// each() runs a call back for each item
/* EXAMPLES)

db.each("SELECT * FROM Dog WHERE breed = 'Labrador'", 
  (error, row) => {
  //gets called for every row our query returns
  console.log(`${row.name} is a good dog`);
})

db.all("SELECT * FROM Dog ORDER BY breed",
  (error, rows) => {
  // receives all the results as an array
    rows.forEach( row => console.log(`${ row.name} is a ${row.breed}`);)
});

db.get("SELECT * FROM Dog WHERE dogname = 'Poochy'", (err, row)=>{
  return row;
});

db.all('SELECT * FROM jobs',[],function(err,rows){
    if(err){
        return console.log(err.message);
    }
    rows.forEach((row) => {
        console.log(row.jobNumber);
    });
});
*/


// --DELETE-- from table
/*
db.run('DELETE FROM jobs WHERE jobNumber==?',1,function(err){
    if(err){
        return console.log(err.message);
    }
    console.log(this.lastID);
});
*/


// --CLOSE-- database connection
/*
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
*/


// --IMPORTANT--
// Serialize()
// Parrallel()