const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get('/', async (req, res) => {
    // Replace this with your database query
    const connection = await dbConn
    const users = await connection.query('SELECT * from students')
    res.render('index', { users: users[0] });
});

app.post("/students", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('" + req.body.Name + "'," +
        "'" + req.body.Age + "','" + req.body.Tel + "','" + req.body.Email + "')")
    const users = await connection.query('SELECT * from students')
    res.render('index', { users: users[0] });
})

app.listen(3000, () => console.log('Server running on port 3000'));