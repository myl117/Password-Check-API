const router = require('express').Router();
const sha1 = require('sha1');
const dict = require('./data/dict.json');

// compare full hash to dict
router.get('/check/:password', function (req, res) {
  try {
    const { password } = req.params;
    const hash = sha1(password);
    const prefix = hash.slice(0, 4);

    if (dict.hasOwnProperty(prefix)) {
      if (dict[prefix].includes(hash)) {
        return res.send('Password is IN the top 100,000 leaked passwords DB.');
      }
    }

    res.status(404).send('Password is NOT in the top 100,000 leaked passwords DB.');
  } catch (e) {
    res.sendStatus(500);
  }
});

// return list of hashes (k-anonymity route)
router.get('/prefix-check/:prefix', function (req, res) {
  const { prefix } = req.params;

  if (dict.hasOwnProperty(prefix)) {
    res.send(dict[prefix].join('<br/>'));
  } else {
    res.status(404).send('No hashes found for the requested prefix.')
  }
});

module.exports = router;
