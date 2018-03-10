const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var {saveToDb} = require('./db/mongoose');
//
var app = express();
const port = process.env.PORT || 3000;
//
app.use(bodyParser.json());
app.post('/todos',authenticate, (req,res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  saveToDb(todo, res);
});
//

app.get('/todos',authenticate, (req, res) => {
  Todo.find({_creator: req.user._id}).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({error: 'ID is not Valid.'});
  }
  Todo.fineOnd({_id: id,_creator: req,user,_id}).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.send(todo);
  });
});

app.delete('/todos/:id',authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({error: 'ID is not Valid.'});
  }
  Todo.findOneAndRemove({_id: id, _creator:req.user._id}).then((todo) => {
    if(todo){
      res.status(200).send(todo);
    } else {
      res.status(404).send({});
    }
  });
});

app.patch('/todos/:id',authenticate, (req,res) => {
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
  Todo.findOneAndUpdate({_id: id,_creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
//Post /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me',authenticate, (req,res) => {
  res.send(req.user);
})

app.post('/users/login', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.fineByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
module.exports = {app};
