const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {saveToDb} = require('./db/mongoose');
//
var app = express();
const port = process.env.PORT || 3000;
//
app.use(bodyParser.json());
app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  saveToDb(todo, res);
});
//

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({error: 'ID is not Valid.'});
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.send(todo);
  });
});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({error: 'ID is not Valid.'});
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(todo){
      res.status(200).send(todo);
    } else {
      res.status(404).send({});
    }
  });
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)){
    return res.status(400).send({error: 'ID is not Valid.'});
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
    console.log(body);
  } else {
    body.completed = false;
    body.compeltedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
//
app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
module.exports = {app};
