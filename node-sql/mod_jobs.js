const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const openDB = async() =>{
    const db = await open({
        filename: 'C:\\Users\\ID_11\\job_tracker',
        driver: sqlite3.Database
    });
    return db;
}

const read_Jobs = async()=> {
    // open the database
    const db = await openDB();
    const result = await db.all('SELECT * FROM jobs');
    db.close();
    return result
}

const add_Job = async(job) => {
    //  Connect to DB
    const db = await openDB();
    let col = '(jobNumber, company, position, location, website, applied, stage, result, date)'
    let valParm = '(?,?,?,?,?,?,?,?,?)'
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
    const db = await openDB();
    let sql_param = [job.company,job.position,job.location,job.website,job.applied,job.stage,job.result,job.date,job.jobNumber]
    let col_set = 'company = ?, position = ?, location = ?, website = ?, applied = ?, stage = ?, result = ?, date = ?'
    let sql =   `UPDATE jobs\
                SET ${col_set}\
                WHERE jobNumber = ?`;
    db.run(sql, sql_param, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
    db.close();
}

const del_Job = async(job_id) =>{
    const db = await openDB();
    let sql = `DELETE FROM jobs WHERE jobNumber = ?`
    db.run(sql, [job_id], function(err) {
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
