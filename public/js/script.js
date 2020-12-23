const jobs_promise = async() =>{
    const response = await fetch('/api/read_jobs');
    //Fetch Error Check
    if(!response.ok){
        const message = 'An Error has occured: ${response.status}';
        throw new Error(message);
    }
    const jobs = await response.json();
    return jobs;
}
const insert_NewRow = (job) =>{
    let newRow = `<tr>\
        <td>${job.company}</td>\
        <td>${job.position}</td>\
        <td>${job.jobNumber}</td>\
        <td>${job.location}</td>\
        <td>${job.website}</td>\
        <td>${job.applied}</td>\
        <td>${job.stage}</td>\
        <td>${job.result}</td>\
        </tr>`
    $(".table").find('tbody').append(newRow);
}
const append_Jobs_Table = (jobs_list) =>{
    for(let key in jobs_list){
        job = jobs_list[key];
        insert_NewRow(job);
    }
} 

const submit_Job = () =>{
    // Get all Form Values
    var company = $('#company').val();
    var position = $('#position').val();
    var website = $('#website').val();
    var location = $('#location').val();
    var jobNum = $('#jobNum').val();
    var stage = $('#stage').val();
    var result = $('#result').val() == '1'? 1 : 0;
    var applied = $('#applied').val()== 'on'? 1 : 0;

    // set into object
    let job_application = {
        'jobNumber':jobNum,
        'company':company,
        'position':position,
        'location':location,
        'website':website,
        'applied':applied,
        'stage':stage,
        'result':result,
    }
    insert_NewRow(job_application);
    const param = {
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(job_application),
        method:"POST"
    }
    //  POST JOB APPLICATION 
    fetch('/api/post_Job',param)
        .then(data=>{return data.json()})
        .then(res=>{console.log(res)})
        .catch(err=>console.log(err));

    document.getElementById("job_form").reset();
    $('#jobModal').modal('hide');
}

$(window).on('load', function () {
    //append jobs to table
    jobs_promise().then(jobs_list => {
        append_Jobs_Table(jobs_list);
    });
});



