const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mysql = require('mysql')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'tajammulkh@gmail.com',
      pass: 'tk11khan'
  }
});

// app.use(express.static(''))
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','pug')
// app.get('/', (req, res) => res.send('Hello Worlsadadd!'))

// app.get('/', function (req, res) {
//     res.render('home', { title: 'Hey', message: 'Hello there!' })
//   })

app.get('/', function (req, res) {
    res.sendFile('home.html', {root:__dirname })
  })


  
  app.post('/submit',function(req,res){
    console.log(req.body);
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'opinedb'
    })
    connection.connect(function(err){
      if(err) throw err;
      console.log("opine connecterd")

    });

    var sql = "INSERT into voterlist values(null,'"+req.body.name+"','"+req.body.email+"')";
    connection.query(sql, function (err) {
      if (err) throw err
      res.render('home',{
        title: 'voter is being added to the database',
        message : 'voter is bieng verifeid'
      })
     
    })
    
    connection.end();


    let mailOptions = {
      from: 'tajammulkh@gmail.com',
      to: req.body.email,
      subject: 'Yeah!',
      text: 'please work'
  };
  
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});

    

  })
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))