const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const password = '123abc!';

// bcrypt.genSalt(10, (err,salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = '$2a$10$KkTL89MKA4eSj1TvAxOSj.1o0.XjK/WEdkQPx5fMlTt0fQt5agxMm';

bcrypt.compare(password,hashedPassword, (err, result) => {
  console.log(result);
});

// const data = {
//   id: 10
// };
//
// const token = jwt.sign(data, 'abc123')
// console.log(token);
//
// const decoded = jwt.verify(token, 'abc123');
// console.log('decoded', decoded);
// jwt.sign
// jwt.verify


// const message = 'I am user number 3';
//
//
// const hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash ${hash}`);
// const data = {
//   id: 4
// };
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
//
// // token.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed, dont trust!');
// }
