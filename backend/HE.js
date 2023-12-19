const port = 3004

//const debug = require("debug")("node-angular")
const http = require("http");
const express = require("./app");
const app = express.app;
const myMongoClient = express.myMongoClient;
app.set('port', port)




async function Server()
{
    await myMongoClient.connect();
    const server = http.createServer(app);
    GetMongoData()
    server.listen(port);
}

async function GetMongoData()
{
    try
    {
        if(!express.getLock())
        {
            
            //var collections = ["HawkEyeV2Users","FirstAttempt","NMBM_drivers"]
            // express.queryData.Users = await express.getFromDB(collections[0],{},{})
            // express.queryData.UserPages = await express.getFromDB(collections[1],{},{})
            // express.queryData.Drivers = await express.getFromDB(collections[2],{},{})


            console.log("Reading Database!")
            var mappings = {Users:"HawkEyeUsers",UserPages:"HawkEyePages",Drivers:"NMBM_drivers",CloudWorks:"NMBM_CLOUDWORKS_Drivers"}
            for(var x in mappings)
            {
                express.queryData[x] = await express.getFromDB(mappings[x],{},{})
            }
            console.log("Reading Database Completed!")
            
        }
    }
    catch(err)
    {
        console.log(err)
    }
    
    setTimeout(GetMongoData,60000)
}

Server()
