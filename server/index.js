const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const cookieSession= require("cookie-session");
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const cors= require('cors');
const bodyParser = require('body-parser');



// Create a new Express application
const app = express();


//helped with cors issue
app.enable('trust proxy');

const MONGO_URI = 'mongodb+srv://tony:asshole69@cluster0.bxoy3.mongodb.net/graphqlBooks';




app.use(cors({
  origin: "https://inspiring-newton-5fe36b.netlify.app/",
  credentials:true
}));

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => {
      console.log('Connected to MongoLab instance.')})
    .on('error', error => console.log('Error connecting to MongoLab:', error));



app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));
class BasicLogging {
  requestDidStart({queryString, parsedQuery, variables}) {
    const query = queryString || print(parsedQuery);
    console.log(query);
    console.log(variables);
  }
}

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());


// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.use('/', (req, res) => res.send("WelcomeAsshole"));
app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
