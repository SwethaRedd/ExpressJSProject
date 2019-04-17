const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

//Init express
const app = express();

//Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json()); //allow us to handle raw json
app.use(express.urlencoded({ extended: false })); //allow us to handle form submissions / will handle urlencoded data

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//set a static folder
//use method to use it in middleware - 
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
//Listen on Project
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
