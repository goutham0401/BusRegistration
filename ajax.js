const http = require('http');
const fs = require('fs');
const url = require('url');
const db= require('./ajaxdb');


const server = http.createServer(function (req, res) 
{
    if (req.url == "/home") 
    {
        fs.readFile('./login.html', function (error, data) 
        {
            if (error) 
            {
                res.writeHead(404);
                return console.error("file not found");
            }

            else 
            {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
        });
    }

    else if(req.url.indexOf('info')>0)
    {
        var ur=url.parse(req.url,true);
        console.log("rersult",ur.query);
        db.insert(ur.query)
        console.log("inserted?")
        res.writeHead(200,{'content-type':'text/html'});
        res.end();
    }

    else if(req.url.indexOf('validateuser')>0)
    {
        var ur=url.parse(req.url,true);
        console.log("request received for user validation",ur.query);
        db.validate(ur.query,function(status)
        {
            console.log(status);
            console.log("sending response for validation request....")
            res.writeHead(200,{'content-type':'text/html'});
            var val=JSON.stringify({"status":status});
            res.write(val);
            res.end();
        });
    }

});
    server.listen(7070, () => 
    {
        console.log("http://localhost:7070/home");
    });