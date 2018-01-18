var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static(path.join(__dirname,'./static')));
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/quotes');
mongoose.Promise = global.Promise;

app.get('/', function(req,res){
	res.render('index');
})
app.post('/create', function(req,res){
	var quote = new Quote ({
		name: req.body.name,
		quote: req.body.quote
	});
	quote.save(function(err){
		if(err){
			console.log(err);
			console.log("there was an error creating the quote");
			res.redirect('/');
		} else {
			res.redirect('/quotes');
		}
	})
})
app.get('/quotes', function(req,res){
	Quote.find({}, function(err, quotes){
		if(err){
			console.log("something went wrong retrieving all quotes");
		} else {
			res.render('quotes', {data: quotes});
		}
	})
})
app.post('/users', function(req,res){
	var student = new Student({name: req.body.name, home_state: req.body.home_state, lucky_number: req.body.lucky_number, birthday: req.body.birth_date});
	student.save(function(err){
		if(err){
			console.log("something went wrong saving the new student");
		} else {
			console.log("new student added!");
			res.redirect('/');
		} 
	})
})
app.get('/style.css', function(req, res){
	res.render('style.css');
})

app.listen(8000, function(){
	console.log('-- running localhost in port 8000 --');
})
var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String,
	time: {type: Date, default: Date.now}
})
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

