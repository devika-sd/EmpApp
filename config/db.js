var mysql = require('mysql');

var sqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Almee@1310',
    database: 'cognizant',
    multipleStatements: true
});

sqlconnection.connect((err) => {
    if (!err)
        console.log("db connected successfully");
    else
        console.log("connection failed", err);
});

// function selectQuery(query){
//     // select query 
//     // return promise success or failure
//     // export this function
//     sqlconnection.query(query,(err,rows,field)=>{
// }

module.exports = sqlconnection;