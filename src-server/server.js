const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const express = require('express');
const image = require('./controllers/image')
const knex = require('knex');
const profile = require('./controllers/profile')
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    db.select('*')
    .from('users')
    .then(users => res.send(users));
});

app.post('/signin', signIn.handleSignIn(db, bcrypt)); //alternative syntax for functions

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
