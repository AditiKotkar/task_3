const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
	host : 'localhost',
    user : 'root',
	password: '12345',
    database : 'university'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

app.use(bodyParser.urlencoded({ extended: true}));


app.get("/",function(req,resp) {
    resp.sendFile(__dirname + "/college.html");
});

app.post('/verify',(req, resp) => {
    const college_id = req.body.college_id;

    const query =`SELECT * FROM college.id = '${college_id}'`;

    connection.query(query, [college_id], (error, results) => {
        if (error) {
            console.error('Mysql query error',error);
            resp.status(500).send('internal server error');
            return;
        } else{
        if(results.lenght> 0) {
            resp.send('Welcome to College');
        } else{
            resp.send('invalid CollegeID');
        }
    }
    });
});
//app.listen(4000);
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});


