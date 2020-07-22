const pg=require('pg');
const conString='postgres://postgres:goutham@localhost:8080/postgres';
const client=new pg.Client(conString);

client.connect(function (error,result)
{
    if(error)
    {
        console.error("cannot connect to data base",error);
    }
    else
    {
        console.log("data base connected");
    }

})
function insertUser(login)
{
    var insertQuery=`INSERT INTO db.login (username, email, "Password") VALUES ('${login.username}', '${login.email}', '${login.Password}')`;
    console.log("insert query---",insertQuery);
    client.query(insertQuery,function(error,result)
    {
        if(error)
        {
            console.error("querry error",error);
        }
        else
        {
            console.log("success!",result.rows);
        }
    })
    
}

function select(login,fn)
{
    var selectQuery=`SELECT username FROM db.login WHERE username='${login.username}'`;
    console.log("select query---",selectQuery);
    client.query(selectQuery,function(error,result)
    {
        if(error)
        {
           return console.error("querry error",error);
        }
        else
        {
            if(result.rows.length>0)
            {
                fn(true);
            }
            else
            {
                fn(false);
            }
        }
    }); 
}
module.exports={insert:insertUser,validate:select};