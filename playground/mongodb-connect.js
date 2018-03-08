// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB Server.');

  // db.collection('Todos').insertOne({
  //   text: 'todo something',
  //   completed: false
  // }, (err,result) => {
  //   if(err) {
  //     return console.log('unable to insert todo.', err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Raghav Vashisht',
  //   age: 18,
  //   location: 'India'
  // }, (err,result) => {
  //   if (err) {
  //     return console.log('Error inserting user.', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
