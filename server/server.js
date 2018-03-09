

var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var saveToDb = (todo) => {
  todo.save().then((doc) => {
    console.log('Saved Document', doc)
  }, (e) => {
    console.log('err while saving', e)
  });
}

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});
var newTodo = new Todo({
  text: 'Cook Dinner'
});

saveToDb(newTodo);

var todo2 = new Todo({
  text: 'Eat Dinner',
  completed: true,
  completedAt: 123
});

saveToDb(todo2);
