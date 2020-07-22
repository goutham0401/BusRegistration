const pg=require('pg');
const conString='postgres://postgres:goutham@localhost:8080/postgres';
const client=new pg.Client(conString);

client.connect(function (error,result)
{
    if(error)
    {
        console.error("cannot connect to postgres",error);
    }
    else
    {
        console.log("postgres connected");
    }
});

function insertBus(bus)
{
    let insertQuery=`INSERT INTO bus.bustable (busname, "from", "to", pickup, dispatch, price) VALUES ('${bus.busname}', '${bus.from}', '${bus.to}', '${bus.pickup}', '${bus.dispatch}', ${bus.price});`
    console.log("insert----",insertQuery);
    client.query(insertQuery,function (error,result)
    {
        if(error)
        {
            return console.error('query error',error);
        }
        else
        {
            console.log('inserted',result.rows);
        }
    })
}

function deleteBus(bus)
{
    let deleteQuery=`DELETE FROM bus.bustable WHERE busname='${bus.busname}' AND "from"='${bus.from}' AND "to"='${bus.to}'`;
    console.log("delete----",deleteQuery);
    client.query(deleteQuery,function (error,result) 
    {
        if(error)
        {
            return console.error('no such value',error);
        }
        else
        {
            console.log('deleted',result.rows);
        }
    });
}

function updateBus(bus)
{
    let updateQuery=`UPDATE bus.bustable SET pickup='${bus.pickup}', "dispatch"='${bus.dispatch}', price=${bus.price} WHERE "from"='${bus.from}' AND "to"='${bus.to}' AND busname='${bus.busname}'`;
    console.log("update----",updateQuery);
    client.query(updateQuery,function (error,result) 
    {
        if(error)
        {
            return console.error('query error',error);
        }
        else
        {
            console.log('updated',result.rows);
        }
    });
}


function selectBus(bus,callback)
{
    let selectQuery=`select * from bus.bustable WHERE "from"='${bus.from}' AND "to"='${bus.to}'`;
    console.log('selectQuery-->', selectQuery);
    client.query(selectQuery, function(error, result)
    {
        if(error)
        {
            callback({'error':"error"}); 
        }
        else
        {
            callback(result.rows);
        }
    });
}

module.exports={insert:insertBus,delete:deleteBus,update:updateBus,select:selectBus};