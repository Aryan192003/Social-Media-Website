const express = require('express');
const app = express();
const port = 8000;
const layout = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/inedx'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
    //console.log('Error:', err );
    console.log(`Error: ${err}`);
    }

    console.log(`Server is running at port: ${port}`);
});