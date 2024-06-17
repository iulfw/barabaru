let mysql = require('mysql');
 
let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'barabaru',
   port:        3360
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   } else{
     console.log('Connection Successful!');
   }
 })

module.exports = connection