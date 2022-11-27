const fs = require('fs');
const sha1 = require('sha1');

// serialize top 100000 passwords into k-anonymity format
const passwords = (fs.readFileSync('./data/top-100000-passwords.txt')).toString().split('\n');

// k-anonymity dictionary
let dictionary = {}

// iterate through passwords, hash with SHA-1 and store first 3 chars as dict key
for (let password of passwords) {
  password = sha1(password);
  let prefix = password.slice(0, 4);

  if (!dictionary[prefix]) {
    dictionary[prefix] = [password];
  } else {
    dictionary[prefix].push(password);
  }
}

// save dictionary to json file
const data = JSON.stringify(dictionary);
fs.writeFileSync('./data/dict.json', data);
