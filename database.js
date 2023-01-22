import mysql from 'mysql2';

// open connection to mysql
export const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'statistic',
    password: ''
});
dataBase.connect(function(err){
    if (err) {
        return console.error('Error: ' + err.message);
    }
    else{
        console.log('Connected to mysql server is successful');
    }
});


