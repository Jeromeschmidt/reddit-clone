// require('dotenv/config');
const port=3000
const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

require('./controllers/posts.js')(app);
require('./controllers/posts.js')(app);
// Set db
require('./data/reddit-db');

const Post = require('./models/post');

app.get('/', (req, res) => {
  Post.find({}).lean()
    .then(posts => {
      res.render('layouts/posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

app.get("/posts/new", function(req,res){
    return res.render("layouts/posts-new")
})


// Start Server
app.listen(3000, () => {
    console.log(`Example app listening on port ${port}!`)
})

module.exports = app;
