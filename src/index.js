const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {PORT, FLIGHT_SERVICE_PATH} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
const db = require('./models/index')

const x=11;

const setupAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // app.get('/bookingservice/api/v1/home', (req,res)=> {
    //     return res.json({message:'Hitting a booking service'})
    // })

    app.use('/api', apiRoutes);

    app.listen(PORT, ()=>{
        console.log("Server started on PORT", PORT);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true}); 
        }
        console.log(FLIGHT_SERVICE_PATH); 
    })
}


setupAndStartServer();