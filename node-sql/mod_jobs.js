const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

class JOB{
    constructor(jobNumber, company, position, location, website, applied, stage, result){
            this.jobNumber = jobNumber;
            this.company=company;
            this.position=position;
            this.location=location;
            this.website=website;
            this.applied=applied;
            this.stage=stage;
            this.result=result;
    }
}

const read_Jobs = async()=> {
    // open the database
    const db = await open({
      filename: 'C:\\Users\\ID_11\\job_tracker',
      driver: sqlite3.Database
    });
    const result = await db.all('SELECT * FROM jobs');
    db.close();
    return result
}

const add_Job = (job) => {
    //  Connect to DB
    let db = new sqlite3.Database('C:\\Users\\ID_11\\job_tracker', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    //  Close Connection to DB
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
module.exports = {
    add_Job: add_Job,
    read_Jobs: read_Jobs,
} //etc
