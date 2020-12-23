
const sqlite3 = require('sqlite3').verbose();

var job_list = {};

// opens database in memory      
let db = new sqlite3.Database('C:\\Users\\ID_11\\job_tracker', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

//Read and return list of jobs
db.all('SELECT * FROM jobs',[],function(err,rows){
    if(err){
        return console.log(err.message);
    }
    let count = 0;
    rows.forEach((row) => {
        job_list[count] = {
            'jobNumber':row.jobNumber,
            'company':row.company,
            'position':row.position,
            'location':row.location,
            'website':row.website,
            'applied':row.applied,
            'stage':row.stage,
            'result':row.result,
        };
        //console.log(job_list);
    });
});

//  DATA TO BE EXPORTED
module.exports = job_list;


// close database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});