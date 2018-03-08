// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB Server.');
  // db.collection('Todos').findOneAndUpdate(
  //   {
  //     _id: new ObjectID('5aa17bdf25785745cb2243f6')
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOrignal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5aa17f6325785745cb2244c4')
  }, {
    $set: {
      name: 'Raghav Vashisht'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOrignal: false
  }).then((res) => {
    console.log(res);
  });

  // db.close();
});
