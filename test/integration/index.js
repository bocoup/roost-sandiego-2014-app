var fs = require('fs');

var webdriver = require('selenium-webdriver');
var assert = require('assert');
var path = require('path');
var chromeDriver = require('selenium-chromedriver');
var chrome = require('selenium-webdriver/chrome');
var chromeService = new chrome.ServiceBuilder(chromeDriver.path);
var db = {
  dir: path.join(__dirname, '..', '..', 'server')
};
db.file = path.join(db.dir, 'images.db');
db.backup = path.join(db.dir, 'images-backup.db');

suite('Roostagram', function() {
  var driver;
  this.timeout(15000);

  // Save the current state of the photos database to a temporary file
  suiteSetup(function() {
    fs.renameSync(db.file, db.backup);
  });
  // Restore the original photos database when the tests are complete.
  // Windows sometimes maintains a lingering reference to the database file
  // after the tests complete, preventing backup restoration. Retry for a
  // limited amount of time.
  suiteTeardown(function(done) {
    var start = Date.now();
    function tryCleanup() {
      if (Date.now() - start > 5000) {
        done(new Error('Unable to restore backup database file.'));
        return;
      }
      try {
        fs.renameSync(db.backup, db.file);
        done();
      } catch(err) {
        setTimeout(tryCleanup, 200);
      }
    }

    tryCleanup();
  });

  setup(function(done) {
    // Initialize the state of the photos database before every test.
    var origDb = fs.createReadStream(db.backup);
    var tempDb = fs.createWriteStream(db.file);
    origDb.pipe(tempDb);
    origDb.on('end', function() {

      driver = chrome.createDriver(null, chromeService.build());
      driver.get('http://localhost:8000');
      driver.manage().timeouts().implicitlyWait(3000);
      driver.wait(function() {
        return driver.isElementPresent(webdriver.By.css('.container'));
      }, 3000).then(function() {
        return driver.findElements(webdriver.By.css('.thumbnail'));
      }).then(function(thumbnails) {
        this.initThumbCount = thumbnails.length;
        done();
      }.bind(this));
    }.bind(this));
  });

  teardown(function() {
    driver.quit();
  });

  test('home page contains is initialized with thumbnails', function() {
    assert.ok(this.initThumbCount > 0);
  });

  test('upload file', function(done) {
    driver.findElement(webdriver.By.css('[href="#upload"]')).click();
    driver.findElement(webdriver.By.css('input[type="file"]'))
      .sendKeys(path.join(__dirname, 'fixture', 'matilda.png'))
      .then(function() {
        return driver.findElements(webdriver.By.css('.thumbnail'));
      }).then(function(elems) {
        assert.equal(
          elems.length,
          this.initThumbCount + 1,
          'A thumbnail for the new image is present'
        );
        done();
      }.bind(this));
  });

  // TODO: Implement this test when Selenium implements an API for interacting
  // with the getUserMedia permissions dialog. Note that this will also require
  // a fair amount of infrastructure so the test environment has the proper
  // hardware.
  test('upload from webcam');

  suite('photo interation', function() {
    setup(function(done) {
      driver.findElement(webdriver.By.css('[href="#upload"]')).click();
      driver.findElement(webdriver.By.css('input[type="file"]'))
        .sendKeys(path.join(__dirname, 'fixture', 'matilda.png'))
        .then(function() {
          return driver.findElements(webdriver.By.css('.thumbnail'));
        }).then(function() {
          done();
        });
    });

    test('view photo', function(done) {
      driver.findElement(webdriver.By.css('.thumbnail')).click();
      driver.findElements(webdriver.By.css('.photo img'))
        .then(function(elems) {
          assert.equal(elems.length, 1);
          driver.findElement(webdriver.By.css('.logo a')).click();
          return driver.findElements(webdriver.By.css('.thumbnail'));
        }).then(function(thumbnails) {
          assert.equal(
            thumbnails.length,
            this.initThumbCount + 1,
            'Thumbnails for previously-created images persist.'
          );
          done();
        }.bind(this));
    });

    test('delete photo', function(done) {
      driver.findElement(webdriver.By.css('.thumbnail')).click();
      driver.findElement(webdriver.By.css('.delete button')).click()
        .then(function() {
          return driver.findElements(webdriver.By.css('.thumbnail'));
        }).then(function(elems) {
          assert.equal(
            elems.length,
            this.initThumbCount,
            'Thumnails for deleted images are removed.'
          );
          done();
        }.bind(this));
    });
  });
});
