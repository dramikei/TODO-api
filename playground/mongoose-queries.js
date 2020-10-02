const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const id = '5aa25bb8df2e1e1d08bdfd2011';


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });
//
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
}
Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log('ID Not found');
  }
  console.log('Todo by ID', todo);
});
