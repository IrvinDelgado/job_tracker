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

const show_Table_Menu = (e) =>{
    console.log(e.originalTarget.textContent);
    $("#options-card").show();
    $("#options-card").css( 'position', 'absolute' );
    $("#options-card").css( 'top', e.pageY );
    $("#options-card").css( 'left', e.pageX );
} 


const insert_NewRow = (job) =>{
    let newRow = `<tr id='${job.jobNumber}'>\
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
    document.getElementById(job.jobNumber).addEventListener("click", show_Table_Menu);
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
    $("#options-card").hide();
    jobs_promise().then(jobs_list => {
        append_Jobs_Table(jobs_list);
    });
});


$(document).on("mouseup",function(e) 
{
    var container = $("#options-card");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});
