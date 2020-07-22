const http = require('http');
const fs = require('fs');
const url = require('url');
const db = require('./busdb');
const ejs = require('ejs');
const server = http.createServer(function (req, res) {
    if (req.url == "/home") {
        fs.readFile('./form.html', function (error, data) {
            if (error) {
                res.writeHead(404);
                return console.error("file not found");
            }

            else {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
        });
    }


    else if (req.url.indexOf('insertuser') > 0) {
        console.log('request url--', req.url);
        var ur = url.parse(req.url, true);
        console.log(ur.query);
        db.insert(ur.query);
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write("<br>");
        fs.readFile("./form.html", function (error, data) {
            res.write(data);
        });
    }

    else if (req.url == '/delete') {
        fs.readFile('./delete.html', function (error, data) {
            if (error) {
                res.writeHead(404);
                return console.error("file not found");
            }

            else {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
        });
    }

    else if (req.url.indexOf('deleteuser') > 0) {
        var remove = url.parse(req.url, true);
        console.log(remove.query);
        db.delete(remove.query);
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.readFile("./delete.html", function (error, data) {
            res.write(data);
        });
    }


    else if (req.url == '/update') {
        fs.readFile('./update.html', function (error, data) {
            if (error) {
                res.writeHead(404);
                return console.error("file not found");
            }

            else {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
        });
    }

    else if (req.url.indexOf('updateuser') > 0) {
        var change = url.parse(req.url, true);
        console.log(change.query)
        db.update(change.query);
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write("<br>");
        fs.readFile("./update.html", function (error, data) {
            res.write(data);
        });
    }

    else if (req.url == '/select') {
        fs.readFile('./select.html', function (error, data) {
            if (error) {
                res.writeHead(404);
                return console.error("no busses");
            }

            else {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
        });
    }

    else if (req.url.indexOf('travel') > 0) 
    {
        console.log('request url--', req.url);
        var ur = url.parse(req.url, true);
        console.log(ur.query);
        db.select(ur.query, function (list) {
            console.log(list);
            // var details = JSON.stringify(list);
            // res.writeHead(200, { 'content-type': 'application/json' });
            // res.write(details);
            var htmlContent = fs.readFileSync(__dirname + '/table.ejs', 'utf8');
            var htmlRender = ejs.render(htmlContent, { data: list });
            res.write(htmlRender);
        });
    }

});



server.listen(7070, () => {
    console.log("http://localhost:7070/home");
    console.log("http://localhost:7070/delete");
    console.log("http://localhost:7070/update");
    console.log("http://localhost:7070/select");
});