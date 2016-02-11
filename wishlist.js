var express = require('express')
var app = express()
var expressHandlebars = require('express-handlebars')
var mysql = require('mysql')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
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
  var query = 'INSERT INTO wishlist (item) VALUES ("'+ req.body.wishData + '");'
  console.log(query)
  connection.query(query,function(err,results){
    if(err) throw err
    res.redirect('/')
  })
})
app.get('/delete/:id',function(req,res){
  var query = 'DELETE FROM wishlist WHERE id=' + req.params.id
  connection.query(query,function(err,results){
    res.redirect('/')
  })
})
app.post('/update/:id',function(req,res){
  var query = 'UPDATE wishlist SET item="'+ req.body.update + '" WHERE id=' + req.params.id + ';'
  console.log(query)
  connection.query(query,function(err,results){
    if(err) throw err
    res.redirect('/')
  })
})

app.listen(PORT, function(){
  console.log('Listening on %s', PORT)
})
