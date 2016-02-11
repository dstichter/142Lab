var express = require('express')
var app = express()
var expressHandlebars = require('express-handlebars')
var mysql = require('mysql')
var bodyParser = require('body-parser')

var PORT = 8000;
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'password',
  database:'lab'
});
app.get('/',function(req,res){
  connection.query("SELECT * FROM wishlist", function(err, results){
    if(err) throw err;
    var data = {
      wish: results
    }
    res.render('wishview', data);
  })
})
app.post('/',function(req,res){
  console.log(req.body)
  // var query = 'INSERT INTO wishlist(item) VALUES '+ req.body.wishData
  // connection.query(query,function(err,results){
  //   res.redirect('/')
  // })
})
app.delete('/',function(req,res){
  var query = 'INSERT INTO wishlist(item) VALUES '+ req.body.note
  connection.query(query,function(err,results){
    res.redirect('/')
  })
})

app.listen(PORT, function(){
  console.log('Listening on %s', PORT)
})
