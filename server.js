//server.js
const express = require('express'),
    bodyParser = require("body-parser"),
    jobs_mod = require("./node-sql/mod_jobs"),
    server = express();


    //  Get the port the env is running on, OR port 3000      
server.set('port', process.env.PORT || 3000);

//  Serve files under the public directory and node modules
server.use(express.static('public'));
server.use('/cash', express.static(__dirname + '/node_modules/cash-dom/dist/'));
server.use('/bootstrapJS', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));

//  CREATING ROUTES 
var router = express.Router();

//  GET METHOD

//  GET JOBS
router.get('/read_jobs', async(req, res) =>{
    var jobs_list = await jobs_mod.read_Jobs();
    res.json(jobs_list);
});

//  POST METHOD

//  SUBMIT A JOB
//  Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

router.post('/post_Job',(req,res) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    //console.log(jobs_mod);
    //console.log(req.body);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
server.use('/api', router);

//  error 404 handler
server.use((req, res) => {
    res.type('text/plain');
    res.status(505);
    res.send('Error page');
});

//  Binding to a port
server.listen(3000, () => {
    console.log('Express server started at port 3000');
});