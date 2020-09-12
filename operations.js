var express = require('express');
var fs = require('fs');

var readme = fs.readFileSync('input.txt');

var pos = 0;

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});


router.post('/write', (req, res) => {
  var ans = "";
  var space_count = 0;
  for (var i = pos; i <= readme.length; i++) {

    if ((readme[i] == 88 || readme[i] == 32) && space_count >= 0 && space_count < 8) {
      if(readme[i] == 32) {
        space_count++;
      }
      if (readme[i] == 88 && space_count == 1) {
        ans += ".png ";
      }
      continue;
    }
    ans += String.fromCharCode(readme[i]);

    if (!readme[i]) {
      pos = readme.length + 1;
      break;
    }
    if (readme[i] == 10) {
      pos = i + 1;
      break;
    }
  }
  fs.appendFile('output.txt', ans, (err) => {
    if (err) throw err;
  });
  res.redirect('/');
});


router.post('/skip', (req, res) => {
  for (var i = pos; i <= readme.length; i++) {
    if (!readme[i]) {
      pos = readme.length + 1;
      break;
    }
    if (readme[i] == 10) {
      pos = i + 1;
      break;
    }
  }
  res.redirect('/');
});


module.exports = router;