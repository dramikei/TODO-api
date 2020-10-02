const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const id = '5aa25bb8df2e1e1d08bdfd20';


// Todo.remove({}).then((result) => {
//   console.log(result);
// });


//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.deleteOne({_id: id}).then((todo) => {
  console.log(todo);
});
