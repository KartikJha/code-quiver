var express = require('express');
var router = express.Router();
var db = require('../init-db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log(db.getDb());
  const users = db.getDb().users;
  console.log(users);
  users.push({ id: users.length + 1, email, password });
  console.log(users);
  db.setDb('users', users);
})

module.exports = router;
