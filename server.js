const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image/image');
const {port} = require('./config');


const db = knex({
    client: 'pg',
    connection: {
        // heroku postgresql
        connectionString: process.env.DATABASE_URL,
        ssl: true
        // host: '127.0.0.1',
        // user: '',
        // password: '',
        // database: 'smart-brain'
    }
});


const app = express();

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {res.json('working')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)})
 
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db, saltRounds)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=>{image.handleImagePut(req, res, db)})
app.post('/imageUrl', (req, res)=>{image.handleApiCall(req, res)})



app.listen(port, () => {
    console.log(`app is running on ${port}`)
})


/*

/Planing

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image -->  PUT --> user

*/