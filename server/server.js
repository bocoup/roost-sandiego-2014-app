var express = require('express');
var app = express();

var database = require('./database');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.configure(function() {
  app.use(allowCrossDomain);
});

app.get('/', function(req, res) {
  res.send('hello world');
});

// list all photos
app.get('/photos', function(req, res) {
  database.getImages(function(err, images) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(images);
    }
  });
});

// add a new photo
app.post('/photos', function(req, res) {  
  
  var imagePost = '';
  req.on('data', function(chunk) { 
    imagePost += chunk;
  });
  req.on('end', function() {
    // parse format. right now it's only { "dataUri": "{String}"}
    // but we may add more fields.
    var imagePostObj = JSON.parse(imagePost);
    database.addImage(imagePostObj.dataUri, function(err, image) {
      if (err) {
        res.json(400, {error: err.message});
      } else {
        res.json(image);
      }
    });
  });
});

// get one photo
app.get('/photos/:id', function(req, res) {
  database.getImage(req.params.id, function(err, image) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(image);
    }
  });
});

// delete a photo
app.delete('/photos/:id', function(req, res) {
  database.deleteImage(req.params.id, function(err, data) {
    if (err) {
      res.json(400, {error: err.message});
    } else {
      res.json(data);
    }
  });
});

var port = process.env.PORT || 8001;
var host = process.env.HOST || '0.0.0.0';
console.log('Starting dev REST server on http://%s:%d/', host, port);
app.listen(port, host);
