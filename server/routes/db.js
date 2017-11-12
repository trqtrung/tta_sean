var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "trung1992",
    database: "tta"
});

con.connect(function(err){
    if(err) throw err;
    console.log("DB Connected!");
});

module.exports = con;