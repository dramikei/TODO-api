// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB Server.');

  // db.collection('Todos').find({conpleted: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch TODOs', err);
  // });

  db.collection('Todos').find({_id: new ObjectID('5aa165fb25785745cb223eab')}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log('Unable to fetch TODOs', err);
  });

db.collection('Users').find({name: 'Raghav Vashisht'}).toArray().then((docs) => {
  console.log('Users');
  console.log(JSON.stringify(docs,undefined,2));
}, (err) => {
  console.log('Unable to fetch Users');
})
  // db.close();
});
