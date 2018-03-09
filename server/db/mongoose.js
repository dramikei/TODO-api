var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
module.exports = {mongoose};
var saveToDb = (model, res) => {
  model.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};
module.exports = {saveToDb};
