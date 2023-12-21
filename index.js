const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const env = require('./config/environment');
const port = 8000;
const layout = require('express-ejs-layouts');

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//chat server setup
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log('chat box server is running at port:5000')


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'social',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/social_development',
        autoRemove: 'disable'

    },
    function(err){
        console.log(err || 'connect-mongoose setup ok');
    }
    
    )

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/inedx'));

app.listen(port, function(err){
    if(err){
    //console.log('Error:', err );
    console.log(`Error: ${err}`);
    }

    console.log(`Server is running at port: ${port}`);
});