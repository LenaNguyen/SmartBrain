const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const express = require('express');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smartbrain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    db.select('*').from('users')
    .then(users => res.send(users));
});

app.post('/signin', (req, res) => {
    if(req.body.email === db.users[0].email &&
        req.body.password === db.users[0].password){
            res.json(db.users[0]);
        } else {
            res.status(400).json('error loggin in');
        }
})

app.post('/register', (req, res) =>{
    const {email, name} = req.body;
    // bcrypt.hash(password, null, null, (err, hash) => {
        
    // });
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(user => {
        res.json(user);
    }).catch(err => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    db.select('*').where({
        id: id
    }).from('users')
    .then(user => {
        if(user.length){
            res.json(user);
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('error getting user'))
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry => {
        console.log(entry);
        res.json(entry);
    })
    .catch(err => res.status(400).json('unable to get entries'));
});
/*
endpoints:
    / --> res this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT = user
*/