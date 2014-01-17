var path = require('path');
var dbfile = path.join(__dirname, 'images.db');

var sqlite3 = require('sqlite3').verbose();

function safeId(id) {
  return String(Number(id));
}

exports.queryDb = function(callback) {
  var db = new sqlite3.Database(dbfile);
  db.serialize(function() {
    callback(db);
  });
};

exports.queryRows = function(sql, callback) {
  exports.queryDb(function(db) {
    db.all(sql, function(err, rows) {
      callback(err, rows);
      db.close();
    });
  });
};

exports.addImage = function(dataUri, callback) {
  exports.queryDb(function(db) {
    var stmt = db.prepare('INSERT INTO Images VALUES (?)');
    stmt.run(JSON.stringify({
      dataUri: dataUri,
    }));
    stmt.finalize();
    db.each('SELECT last_insert_rowid() as id', function(err, row) {
      if (err) {
        callback(err);
      } else {
        exports.getImage(row['id'], callback);
      }
    });
  });
};

exports.deleteImage = function(id, callback) {
  id = safeId(id);
  exports.getImage(id, function(err, image) {
    if (err) {
      callback(err);
    } else {
      exports.queryDb(function(db) {
        db.exec('DELETE FROM Images where rowid = ' + id, function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, {id: id});
          }
        });
      });
    }
  });
};

function rowToImage(row) {
  var image = JSON.parse(row.image);
  image.id = String(row.id);
  return image;
}

exports.getImage = function(id, callback) {
  id = safeId(id);
  exports.queryRows('SELECT rowid AS id, image FROM Images WHERE id = ' + id, function(err, rows) {
    var row = rows[0];
    if (err) {
      callback(err);
    } else if (!row) {
      callback(new Error('Photo not found'));
    } else {
      callback(null, rowToImage(row));
    }
  });
};

exports.getImages = function(callback) {
  exports.queryRows('SELECT rowid AS id, image FROM Images', function(err, rows) {
    if (err) {
      callback(err);
    } else {
      callback(null, rows.map(rowToImage));
    }
  });
};
