import express from "express";
import config from "config";
import mysql from "mysql2";

const app = express();
const PORT = config.get('port') || 5000;

app.use('');

let connection;
function startConnection(){
    // open connection to mysql
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'statistic',
        password: ''
    });
    connection.connect(function(err){
        if (err) {
            return console.error('Error: ' + err.message);
        }
        else{
            console.log('Connected to mysql server is successful');
        }
    });
}
startConnection();
//start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


/*function getAllFromTable(){
    let query = "SELECT * FROM `user`";
    connection.query(query, (err, res)=>{
        console.log(res);
    });
}*/

//close connection to mysql
/*connection.end(function(err) {
    if (err) {
        return console.log("Error: " + err.message);
    }
    console.log("Connected closed");
});*/