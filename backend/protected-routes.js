var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config');

var app = module.exports = express.Router();

var reports = [
	{
		id: 1,
		'date': 'oct 6 2016',
		'timeTaken': '00.00',
		'description': 'default note'
	},
	{
		id: 2,
		'date': 'oct 7 2016',
		'timeTaken': '00.00',
		'description': 'default note'
	},
	{
		id: 3,
		'date': 'oct 11 2016',
		'timeTaken': '00.00',
		'description': 'default note'
		}
]

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

//TODE CHANCУ STATUS CODE

// all reports
app.get('/api/protected/reports', function(req, res) {
  res.status(200).send(reports);
});

// add reports
app.post('/api/protected/reports', function(req, res) {
  reports.push(req.body);
  res.status(201).send(req.body);
});

//detail
app.get('/api/protected/reports/:id', function(req, res) {
	console.log(reports);
  var dev = reports.find(function(item) {
      return item.id == req.params.id;
    });
	console.log(dev);
  res.status(200).send(dev);

});


app.delete('/api/protected/reports/:id', function(req, res) {
  var index = reports.findIndex(function(item) {
    return item.id == req.params.id;
   });
   reports.splice(index, 1);
   res.status(204).send('deleted');
});
