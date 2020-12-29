const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

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

const add_Job = async(job) => {
    //  Connect to DB
    const db = await open({
        filename: 'C:\\Users\\ID_11\\job_tracker',
        driver: sqlite3.Database
    });
    let col = '(jobNumber, company, position, location, website, applied, stage, result)'
    let valParm = '(?,?,?,?,?,?,?,?)'
    let valArr = []
    let sql = `INSERT INTO jobs ${col} VALUES${valParm} `;
    for(key in job){
        valArr.push(job[key])
    }
    db.run(sql, valArr, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
    db.close();
}
const update_Job = async(job) =>{
    const db = await open({
        filename: 'C:\\Users\\ID_11\\job_tracker',
        driver: sqlite3.Database
    });
    let sql_param = [job.jobNumber,job.company,job.position,job.location,job.website,job.applied,job.stage,job.result]
    let col_set = 'jobNumber = ?, company = ?, position = ?, location = ?, website = ?, applied = ?, stage = ?, result = ?'
    let sql =   `UPDATE jobs\
                SET ${col_set}\
                WHERE jobNumber = ${job.jobNumber}`;
    db.run(sql, sql_param, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
    db.close();
}

const del_Job = async(job_id) =>{
    const db = await open({
        filename: 'C:\\Users\\ID_11\\job_tracker',
        driver: sqlite3.Database
    });
    let sql = `DELETE FROM jobs WHERE jobNumber = ${job_id}`
    db.run(sql, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
    db.close();
}

module.exports = {
    add_Job: add_Job,
    read_Jobs: read_Jobs,
    update_Job: update_Job,
    del_Job: del_Job,
} //etc
