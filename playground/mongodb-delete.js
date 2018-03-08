// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB Server.');
  //delete many
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=> {
  //   console.log(result);
  // });

  //delete one
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //FInd one and delete

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });
  //5aa17f5a25785745cb2244be
  db.collection('Users').deleteMany({name: 'Raghav Vashisht'}).then((result)=> {
    console.log(result);
  });
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5aa17f5a25785745cb2244be')}).then((result) => {
    console.log(result);
  });



  // db.close();
});
