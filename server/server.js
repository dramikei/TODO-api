

var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var saveToDb = (todo) => {
  todo.save().then((doc) => {
    console.log('Saved', doc)
  }, (e) => {
    console.log('err while saving', e)
  });
}

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
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


var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  }
});


var newUser = new User({
  email: 'raghav2011rv@gmail.com'
});
saveToDb(newUser);
